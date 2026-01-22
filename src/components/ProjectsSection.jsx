import { useEffect, useMemo, useState } from "react";

const CATEGORY_DEFS = {
  language: "Linguagem",
  framework: "Framework",
  web: "Web",
  database: "Base de Dados",
  platform: "Plataforma",
  format: "Formato",
  concept: "Conceito",
  other: "Outros"
};

const CATEGORY_ORDER = [
  "language",
  "framework",
  "web",
  "database",
  "platform",
  "format",
  "concept",
  "other"
];

const TAG_CATEGORY_MAP = {
  "C": "language",
  "C++": "language",
  "Java": "language",
  "Dart": "language",
  "PHP": "language",
  "JavaScript": "language",
  "HTML/CSS": "web",
  "Flutter": "framework",
  "Lanterna": "framework",
  "MySQL": "database",
  "Firebase": "platform",
  "Minix": "platform",
  "SVG": "format",
  "PNG": "format",
  "Image Processing": "concept",
  "Algorithms": "concept",
  "Data Structures": "concept",
  "Dynamic Programming": "concept",
  "ILP": "concept",
  "Low-level Programming": "concept",
  "Sockets": "concept",
  "Serial Communication": "concept",
  "Design Patterns": "concept"
};

const getTagCategory = (tag) => TAG_CATEGORY_MAP[tag] || "other";

export default function ProjectsSection({ projects }) {
  const categories = useMemo(() => {
    const found = new Set();
    projects.forEach((proj) => {
      (proj.tech || []).forEach((tag) => {
        found.add(getTagCategory(tag));
      });
    });
    return CATEGORY_ORDER.filter((key) => found.has(key));
  }, [projects]);

  const optionsByCategory = useMemo(() => {
    const options = {};
    categories.forEach((category) => {
      options[category] = new Set();
    });
    projects.forEach((proj) => {
      (proj.tech || []).forEach((tag) => {
        const category = getTagCategory(tag);
        if (!options[category]) options[category] = new Set();
        options[category].add(tag);
      });
    });
    return Object.fromEntries(
      Object.entries(options).map(([key, set]) => [key, Array.from(set).sort()])
    );
  }, [projects, categories]);

  const [filters, setFilters] = useState({});
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setFilters((prev) => {
      const next = {};
      categories.forEach((category) => {
        next[category] = prev[category] || "all";
      });
      return next;
    });
  }, [categories]);

  const filteredProjects = useMemo(() => {
    if (!projects.length) return [];
    return projects.filter((proj) =>
      categories.every((category) => {
        const selection = filters[category];
        if (!selection || selection === "all") return true;
        return (proj.tech || []).includes(selection);
      })
    );
  }, [projects, categories, filters]);

  const resetFilters = () => {
    const next = {};
    categories.forEach((category) => {
      next[category] = "all";
    });
    setFilters(next);
  };

  return (
    <section className="section" id="projects">
      <div className="section__header">
        <p className="eyebrow">Portfólio</p>
        <h2>Projetos em destaque</h2>
        <p className="muted">Seleção curada do que construí e dos resultados alcançados.</p>
      </div>

      {categories.length > 0 && (
        <div className="project-filters-shell">
          <button
            className="btn ghost project-filters__toggle"
            type="button"
            onClick={() => setFiltersOpen((open) => !open)}
            aria-expanded={filtersOpen}
            aria-controls="project-filters-panel"
          >
            Filtros
          </button>
          <div
            id="project-filters-panel"
            className={`project-filters${filtersOpen ? " is-open" : ""}`}
          >
            {categories.map((category) => (
              <label key={category} className="project-filter">
                <span className="project-filter__label">{CATEGORY_DEFS[category]}</span>
                <select
                  value={filters[category] || "all"}
                  onChange={(event) =>
                    setFilters((prev) => ({ ...prev, [category]: event.target.value }))
                  }
                >
                  <option value="all">Todos</option>
                  {(optionsByCategory[category] || []).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            ))}
            <button className="btn ghost project-filters__clear" type="button" onClick={resetFilters}>
              Limpar filtros
            </button>
          </div>
        </div>
      )}

      {filteredProjects.length > 0 ? (
        <div className="projects-grid">
          {filteredProjects.map((proj, idx) => (
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
                  <span key={t} className={`tag tag--${getTagCategory(t)}`}>
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
