export default function ProjectsSection({ projects }) {
  return (
    <section className="section" id="projects">
      <div className="section__header">
        <p className="eyebrow">Portfólio</p>
        <h2>Projetos em destaque</h2>
        <p className="muted">Seleção curada do que construí e dos resultados alcançados.</p>
      </div>

      {projects.length > 0 ? (
        <div className="projects-grid">
          {projects.map((proj, idx) => (
            <article key={proj.title + idx} className="project-card">
              {proj.image && (
                <div className="project-thumb">
                  <img src={proj.image} alt={proj.title || "Projeto"} loading="lazy" />
                </div>
              )}
              <div className="project-card__head">
                <div>
                  <p className="eyebrow small">{proj.type || "Projeto"}</p>
                  <h3>{proj.title}</h3>
                </div>
                {proj.demo && <span className="pill ghost">Live</span>}
              </div>

              <p className="project-desc">{proj.description}</p>

              <div className="tags">
                {(proj.tech || []).map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>

              <div className="project__links">
                {proj.github && (
                  <a className="btn text" href={proj.github} target="_blank" rel="noreferrer">
                    Código
                  </a>
                )}
                {proj.demo && (
                  <a className="btn text" href={proj.demo} target="_blank" rel="noreferrer">
                    Demo
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="card muted-card">
          <p className="eyebrow">Sem projetos ainda</p>
          <p className="muted">
            Adiciona documentos na collection <strong>projects</strong> para ver tudo renderizado aqui.
          </p>
        </div>
      )}
    </section>
  );
}
