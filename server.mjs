import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderSiteNav } from "./static/site-shell.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = path.join(__dirname, "static");
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "::";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".pdf": "application/pdf",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
};

function send(res, status, body, type = "text/plain; charset=utf-8") {
  res.writeHead(status, { "Content-Type": type });
  res.end(body);
}

function injectSharedShell(html) {
  const pageMatch = html.match(/<body[^>]*data-page="([^"]+)"/i);
  const currentPage = pageMatch?.[1] || "";

  return html.replace('<div data-site-nav></div>', renderSiteNav(currentPage));
}

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  const safePath = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, "");
  let filePath = path.join(root, safePath === "/" ? "index.html" : safePath);

  if (!filePath.startsWith(root)) {
    send(res, 403, "Forbidden");
    return;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  if (!fs.existsSync(filePath)) {
    const notFound = path.join(root, "404.html");
    if (fs.existsSync(notFound)) {
      fs.readFile(notFound, "utf8", (error, html) => {
        if (error) { send(res, 404, "Not found"); return; }
        send(res, 404, injectSharedShell(html), "text/html; charset=utf-8");
      });
    } else {
      send(res, 404, "Not found");
    }
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const type = mimeTypes[ext] || "application/octet-stream";

  if (ext === ".html") {
    fs.readFile(filePath, "utf8", (error, html) => {
      if (error) {
        send(res, 500, "Internal server error");
        return;
      }

      send(res, 200, injectSharedShell(html), type);
    });
    return;
  }

  const stream = fs.createReadStream(filePath);

  stream.on("open", () => {
    res.writeHead(200, { "Content-Type": type });
  });

  stream.on("error", () => {
    send(res, 500, "Internal server error");
  });

  stream.pipe(res);
});

server.listen(port, host, () => {
  console.log(`Static portfolio running at http://localhost:${port}/`);
});
