import { useState } from "react";
import logoIcon from "../assets/icon.svg";

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m4 7 7.34 4.4a1.5 1.5 0 0 0 1.32 0L20 7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.93c.58.1.78-.25.78-.55v-2c-3.2.7-3.87-1.39-3.87-1.39-.53-1.35-1.3-1.7-1.3-1.7-1.07-.73.08-.72.08-.72 1.18.08 1.8 1.22 1.8 1.22 1.05 1.8 2.76 1.28 3.44.98.1-.76.41-1.28.74-1.57-2.56-.29-5.26-1.28-5.26-5.67 0-1.25.44-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.06 0 0 .97-.31 3.18 1.17a11 11 0 0 1 5.78 0c2.2-1.48 3.17-1.17 3.17-1.17.62 1.6.23 2.77.11 3.06a4.5 4.5 0 0 1 1.17 3.07c0 4.4-2.7 5.37-5.28 5.66.42.36.8 1.09.8 2.2v3.25c0 .3.2.65.79.54A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
      fill="currentColor"
    />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M20.45 3H3.54A1.54 1.54 0 0 0 2 4.54v15.9A1.54 1.54 0 0 0 3.54 22h16.9A1.54 1.54 0 0 0 22 20.46V4.54A1.54 1.54 0 0 0 20.46 3ZM8.1 19.18H5.34V9.75H8.1Zm-1.38-11a1.58 1.58 0 1 1 0-3.17 1.58 1.58 0 0 1 0 3.17Zm12.48 11H16.4v-4.58c0-1.1-.02-2.52-1.53-2.52-1.53 0-1.77 1.2-1.77 2.44v4.66H10.3V9.75h2.64v1.29h.04a2.9 2.9 0 0 1 2.6-1.43c2.78 0 3.3 1.83 3.3 4.2Z"
      fill="currentColor"
    />
  </svg>
);

const BurgerIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M4 7.5h16M4 12h16M4 16.5h16"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export default function Topbar({ email, github, linkedin, contactHref, isAdminPage = false }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const path = typeof window !== "undefined" ? window.location.pathname.toLowerCase() : "";
  const navLinks = isAdminPage
    ? [{ href: "/", label: "Voltar à página principal" }]
    : [
        { href: "/", label: "Início" },
        { href: "/projetos", label: "Projetos" },
        { href: "/curriculo", label: "Currículo" },
      ];

  const showContact = Boolean(email && !isAdminPage);

  const NavItems = ({ className = "" }) => (
    <div className={className}>
      {navLinks.map((link) => {
        const isActive =
          !isAdminPage && (link.href === "/" ? path === "/" || path === "" : path.startsWith(link.href));
        return (
          <a
            key={link.href}
            href={link.href}
            className={`subtle-link${isActive ? " active" : ""}`}
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </a>
        );
      })}
    </div>
  );

  const ActionItems = ({ compact = false }) => (
    <div className="topbar__actions">
      {github && (
        <a className={`icon-btn small${compact ? " only" : ""}`} href={github} target="_blank" rel="noreferrer" aria-label="GitHub">
          <GithubIcon />
        </a>
      )}
      {linkedin && (
        <a className={`icon-btn small${compact ? " only" : ""}`} href={linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <LinkedinIcon />
        </a>
      )}
      {showContact && (
        <a className={`btn ghost small${compact ? " icon-only" : ""}`} href={contactHref || `mailto:${email}`} aria-label="Conversar">
          <MailIcon />
          {!compact && "Conversar"}
        </a>
      )}
    </div>
  );

  return (
    <nav className="topbar">
      <div className="logo-mark">
        <a href="/" aria-label="Início">
          <img src={logoIcon} alt="Logo" />
        </a>
      </div>

      {!isAdminPage && <NavItems className="topbar__links" />}

      {!isAdminPage && <ActionItems />}

      {!isAdminPage && (
        <>
          <div
            className={`mobile-overlay ${mobileOpen ? "open" : ""}`}
            role="presentation"
            onClick={() => setMobileOpen(false)}
          />
          <button
            className={`burger ${mobileOpen ? "open" : ""}`}
            type="button"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <CloseIcon /> : <BurgerIcon />}
          </button>

          <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
            <NavItems className="mobile-links" />
          </div>
        </>
      )}

      {isAdminPage && <NavItems className="topbar__links" />}
    </nav>
  );
}
