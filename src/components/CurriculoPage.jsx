export default function CurriculoPage() {
  return (
    <div className="page cv-page">
      <div className="cv-header">
        <p className="eyebrow">Currículo</p>
        <h1>Explora o meu percurso</h1>
        <p className="muted">Visualiza ou descarrega o PDF sem sair do site.</p>
        <div className="hero__actions">
          <a className="btn primary" href="/curriculo.pdf" target="_blank" rel="noreferrer">
            Abrir em nova aba
          </a>
          <a className="btn ghost" href="/curriculo.pdf" download>
            Download
          </a>
        </div>
      </div>

      <div className="cv-viewer" id="cv-viewer">
        <object data="/curriculo.pdf#view=FitH" type="application/pdf" className="cv-frame">
          <div className="cv-fallback">
            <p className="eyebrow">PDF não carregou</p>
            <p className="muted">Coloca o ficheiro curriculo.pdf na pasta public ou abre com os botões.</p>
            <div className="hero__actions">
              <a className="btn primary" href="/curriculo.pdf" target="_blank" rel="noreferrer">
                Abrir PDF
              </a>
              <a className="btn ghost" href="/curriculo.pdf" download>
                Download
              </a>
            </div>
          </div>
        </object>
      </div>
    </div>
  );
}
