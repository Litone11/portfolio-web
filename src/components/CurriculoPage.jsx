const CV_URL = import.meta.env.VITE_CURRICULO_URL || "/curriculo.pdf";

export default function CurriculoPage() {
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

      <div className="cv-viewer" id="cv-viewer">
        <object data={`${CV_URL}#view=FitH`} type="application/pdf" className="cv-frame">
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
