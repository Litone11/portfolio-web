import logoIcon from "../assets/icon.svg";

export default function Topbar({ initials, email }) {
  return (
    <nav className="topbar">
      <div className="logo-mark">
        <img src={logoIcon} alt="Logo" />
      </div>
      <div className="topbar__links">
        <a href="#top" className="subtle-link">
          Início
        </a>
        <a href="#about" className="subtle-link">
          Sobre
        </a>
        <a href="#projects" className="subtle-link">
          Projetos
        </a>
        <a href="#skills" className="subtle-link">
          Competências
        </a>
        <a href="#contact" className="subtle-link">
          Contacto
        </a>
      </div>
      {email && (
        <a className="btn ghost small" href={`mailto:${email}`}>
          Conversar
        </a>
      )}
    </nav>
  );
}
