const links = [
  { href: "/", key: "nav.home", label: "Início", page: "home" },
  { href: "/projects", key: "nav.projects", label: "Projetos", page: "projects" },
  { href: "/about", key: "nav.about", label: "Sobre", page: "about" },
  { href: "/contact", key: "nav.contact", label: "Contacto", page: "contact" },
];

function navLinkClass(currentPage, targetPage) {
  if (currentPage === targetPage) {
    return "site-nav__link is-active";
  }

  return "site-nav__link";
}

export function injectFavicon() {
  if (!document.querySelector("link[rel='icon']")) {
    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/svg+xml";
    link.href = "/favicon.svg";
    document.head.appendChild(link);
  }
}

export function renderSiteNav(currentPage = "") {
  const navLinks = links
    .map(
      (link) =>
        `<a href="${link.href}" class="${navLinkClass(currentPage, link.page)}" data-i18n="${link.key}">${link.label}</a>`,
    )
    .join("");

  return `
    <nav class="site-nav">
      <div class="site-nav__inner">
        <a href="/" class="site-nav__brand">
          Luis Martins
        </a>
        <div class="lang-toggle site-nav__lang" data-language-toggle data-current-lang="pt" aria-label="Language switch">
          <button type="button" class="lang-toggle__option" data-lang-option="pt" aria-pressed="true">PT</button>
          <button type="button" class="lang-toggle__option" data-lang-option="en" aria-pressed="false">EN</button>
          <span class="lang-toggle__thumb" aria-hidden="true"></span>
        </div>
        <button
          type="button"
          class="site-nav__hamburger"
          aria-label="Toggle navigation"
          aria-expanded="false"
          data-hamburger
        >
          <span class="site-nav__hamburger-bar"></span>
          <span class="site-nav__hamburger-bar"></span>
          <span class="site-nav__hamburger-bar"></span>
        </button>
        <a
          href="/curriculo.pdf"
          target="_blank"
          rel="noreferrer"
          class="site-nav__cv"
          data-i18n="nav.cv"
        >
          CV
        </a>
      </div>
      <div class="site-nav__links">
        ${navLinks}
      </div>
    </nav>
  `;
}

export function mountSiteNav() {
  const currentPage = document.body?.dataset.page || "";

  injectFavicon();

  document.querySelectorAll("[data-site-nav]").forEach((placeholder) => {
    placeholder.outerHTML = renderSiteNav(currentPage);
  });

  if (typeof window !== "undefined" && typeof window.__portfolioLanguageRefresh === "function") {
    window.__portfolioLanguageRefresh();
  }

  const hamburger = document.querySelector("[data-hamburger]");
  const nav = hamburger?.closest(".site-nav");

  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      hamburger.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    document.addEventListener("click", (e) => {
      if (nav.classList.contains("is-open") && !nav.contains(e.target)) {
        nav.classList.remove("is-open");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }
}
