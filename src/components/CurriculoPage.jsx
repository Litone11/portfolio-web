import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

const CV_URL = import.meta.env.VITE_CURRICULO_URL || "/curriculo.pdf";

export default function CurriculoPage() {
  const viewerRef = useRef(null);
  const [frameHeight, setFrameHeight] = useState("100vh");

  useEffect(() => {
    let isMounted = true;
    let resizeObserver;
    let pdfTask;

    const ensureWorker = () => {
      if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
      }
    };

    const updateHeight = (pageRatio) => {
      const container = viewerRef.current;
      if (!container || !pageRatio) return;
      const width = container.clientWidth;
      setFrameHeight(`${Math.round(width * pageRatio)}px`);
    };

    const loadPdf = async () => {
      try {
        ensureWorker();
        pdfTask = pdfjsLib.getDocument(CV_URL);
        const pdf = await pdfTask.promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1 });
        const ratio = viewport.height / viewport.width;
        if (!isMounted) return;
        updateHeight(ratio);

        if (typeof ResizeObserver !== "undefined") {
          resizeObserver = new ResizeObserver(() => updateHeight(ratio));
          if (viewerRef.current) {
            resizeObserver.observe(viewerRef.current);
          }
        } else {
          const handleResize = () => updateHeight(ratio);
          window.addEventListener("resize", handleResize);
          resizeObserver = { disconnect: () => window.removeEventListener("resize", handleResize) };
        }
      } catch (error) {
        if (isMounted) {
          setFrameHeight("100vh");
        }
      }
    };

    loadPdf();

    return () => {
      isMounted = false;
      if (resizeObserver) resizeObserver.disconnect();
      if (pdfTask?.destroy) pdfTask.destroy();
    };
  }, []);

  return (
    <div className="page cv-page">
      <div className="cv-header">
        <p className="eyebrow">Currículo</p>
        <h1>Explora o meu percurso</h1>
        <p className="muted">Visualiza ou descarrega o PDF sem sair do site.</p>
        <div className="hero__actions">
          <a className="btn primary" href={CV_URL} target="_blank" rel="noreferrer">
            Abrir em nova aba
          </a>
          <a className="btn ghost" href={CV_URL} download>
            Download
          </a>
        </div>
      </div>

      <div className="cv-viewer" id="cv-viewer" ref={viewerRef}>
        <object
          data={`${CV_URL}#view=FitH`}
          type="application/pdf"
          className="cv-frame"
          style={{ height: frameHeight }}
        >
          <div className="cv-fallback">
            <p className="eyebrow">PDF não carregou</p>
            <p className="muted">
              Garante que existe um PDF acessível em <code>{CV_URL}</code> (por exemplo, coloca <code>curriculo.pdf</code> na pasta
              <code>public</code> ou define <code>VITE_CURRICULO_URL</code>).
            </p>
            <div className="hero__actions">
              <a className="btn primary" href={CV_URL} target="_blank" rel="noreferrer">
                Abrir PDF
              </a>
              <a className="btn ghost" href={CV_URL} download>
                Download
              </a>
            </div>
          </div>
        </object>
      </div>
    </div>
  );
}
