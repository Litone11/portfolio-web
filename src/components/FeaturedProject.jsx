export default function FeaturedProject({ project }) {
  if (!project) return null;

  return (
    <section className="card featured" id="featured">
      <div className="featured__meta">
        <p className="eyebrow">Destaque</p>
        <h2>{project.title}</h2>
        <p className="muted">{project.description}</p>
        <div className="tags">
          {(project.tech || []).map((t) => (
            <span key={t} className="tag bright">
              {t}
            </span>
          ))}
        </div>
        <div className="hero__actions">
          {project.github && (
            <a className="btn ghost" href={project.github} target="_blank" rel="noreferrer">
              Código
            </a>
          )}
          {project.demo && (
            <a className="btn primary" href={project.demo} target="_blank" rel="noreferrer">
              Ver live
            </a>
          )}
        </div>
      </div>
      <div className="featured__meta secondary">
        <div className="gradient-box">
          <p className="eyebrow small">{project.type || "Projeto"}</p>
          <p className="value">{(project.tech || []).length || 3} techs</p>
          <p className="muted">Stack afinada para performance e impacto.</p>
        </div>
      </div>
    </section>
  );
}
