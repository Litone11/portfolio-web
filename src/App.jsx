import { useEffect, useMemo, useState } from "react";
import "./App.css";
import heroPortrait from "./assets/pp.jpeg";

const API = import.meta.env.VITE_API_URL;

export default function App() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");

        const [pRes, prRes] = await Promise.all([
          fetch(`${API}/profile`),
          fetch(`${API}/projects`),
        ]);

        if (!pRes.ok) throw new Error(`Erro /profile: ${pRes.status}`);
        if (!prRes.ok) throw new Error(`Erro /projects: ${prRes.status}`);

        const p = await pRes.json();
        const pr = await prRes.json();

        setProfile(Array.isArray(p) ? (p[0] ?? null) : p);
        setProjects(Array.isArray(pr) ? pr : []);
      } catch (e) {
        setError(e?.message || "Erro ao carregar dados.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const name = profile?.name || "O teu nome";
  const headline = profile?.headline || "Transformo ideias em produtos digitais memoráveis.";
  const bio =
    profile?.bio ||
    "Adiciona aqui uma bio curta que conte quem és, o impacto que geras e o tipo de desafios em que brilhas.";
  const skills = profile?.skills || [];
  const portrait = profile?.photo || heroPortrait;

  const initials = useMemo(() => {
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase())
      .join("");
  }, [name]);

  const techTags = useMemo(() => {
    const fromProjects = projects.flatMap((p) => p.tech || []);
    const all = [...skills, ...fromProjects];
    return Array.from(new Set(all)).slice(0, 18);
  }, [skills, projects]);

  const featuredProject = projects[0];

  if (loading) {
    return (
      <div className="page">
        <div className="halo halo-one" />
        <div className="halo halo-two" />

        <div className="card loading">
          <div className="loader" />
          <div>
            <p className="eyebrow">A preparar o portfolio</p>
            <p className="muted">A sincronizar dados da API.</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <div className="halo halo-one" />
        <div className="halo halo-two" />

        <div className="card error">
          <p className="eyebrow">Algo correu mal</p>
          <h2>Não foi possível carregar os dados.</h2>
          <p className="muted">{error}</p>
          <p className="muted">
            Garante que a API está acessível em{" "}
            <a href={API} target="_blank" rel="noreferrer">
              {API}
            </a>
            .
          </p>
          <div className="hero__actions">
            <a className="btn ghost" href={API} target="_blank" rel="noreferrer">
              Abrir API
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="halo halo-one" />
      <div className="halo halo-two" />
      <div className="halo halo-three" />

      <nav className="topbar">
        <div className="logo-mark">
          <span>{initials || "UX"}</span>
        </div>
        <div className="topbar__links">
          <a href="#skills" className="subtle-link">
            Skills
          </a>
          <a href="#projects" className="subtle-link">
            Projetos
          </a>
          <a href="#contact" className="subtle-link">
            Contacto
          </a>
        </div>
        {profile?.email && (
          <a className="btn ghost small" href={`mailto:${profile.email}`}>
            Conversar
          </a>
        )}
      </nav>

      <header className="card hero">
        <div className="hero__meta">
          <span className="pill">Portfolio vivo</span>
          <div className="hero__meta-links">
            {profile?.links?.github && (
              <a className="subtle-link" href={profile.links.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            )}
            {profile?.links?.linkedin && (
              <a className="subtle-link" href={profile.links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            )}
          </div>
        </div>

        <div className="hero__layout">
          <div className="hero__copy">
            <p className="eyebrow">Produtos digitais com intenção</p>
            <h1>{name}</h1>
            <p className="headline">{headline}</p>
            <p className="bio">{bio}</p>

            <div className="hero__actions">
              {profile?.email && (
                <a className="btn primary" href={`mailto:${profile.email}`}>
                  Falar comigo
                </a>
              )}
              {profile?.links?.github && (
                <a className="btn ghost" href={profile.links.github} target="_blank" rel="noreferrer">
                  Ver GitHub
                </a>
              )}
              {profile?.links?.linkedin && (
                <a className="btn ghost" href={profile.links.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              )}
            </div>

            <div className="hero__chips">
              {skills.length > 0 && <span className="chip accent">{skills[0]}</span>}
              <span className="chip subtle">{projects.length} projetos em destaque</span>
            </div>
          </div>

          <div className="hero__aside">
            <div className="avatar">
              <img src={portrait} alt={`Foto de ${name}`} />
            </div>

            <ul className="stats">
              <li>
                <p className="label">Stack</p>
                <p className="value">{skills.length || "—"} skills</p>
                <p className="muted">Foco em soluções robustas e escaláveis.</p>
              </li>
              <li>
                <p className="label">Projetos</p>
                <p className="value">{projects.length}</p>
                <p className="muted">Do conceito ao lançamento.</p>
              </li>
              <li>
                <p className="label">Disponibilidade</p>
                <p className="value">{profile?.email ? "Aberto a convites" : "Vamos falar"}</p>
                <p className="muted">Respondo rapidamente.</p>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {techTags.length > 0 && (
        <div className="marquee">
          <div className="marquee__track">
            {techTags.concat(techTags).map((tag, idx) => (
              <span key={tag + idx} className="marquee__item">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <section className="section" id="skills">
        <div className="section__header">
          <p className="eyebrow">Stack & processos</p>
          <h2>Ferramentas que dão vida às ideias</h2>
          <p className="muted">Tecnologias preferidas e a forma como as combino para entregar impacto.</p>
        </div>

        {skills.length > 0 ? (
          <div className="skills-grid">
            {skills.map((skill) => (
              <div key={skill} className="skill-card">
                <div className="pulse-dot" />
                <div>
                  <p className="skill-name">{skill}</p>
                  <p className="muted">Experiência aplicada em produtos reais.</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card muted-card">
            <p className="eyebrow">Sem skills ainda</p>
            <p className="muted">Adiciona skills no documento <code>profile</code> para as mostrares aqui.</p>
          </div>
        )}
      </section>

      <section className="section">
        <div className="section__header">
          <p className="eyebrow">Processo</p>
          <h2>Ritmo claro do primeiro call ao ship</h2>
          <p className="muted">Pequenas fases que reduzem risco e aceleram entregas.</p>
        </div>

        <div className="process-grid">
          {[
            {
              title: "Descoberta & alinhamento",
              text: "Mapeio objetivos, público e métricas. Juntos escolhemos o norte.",
            },
            {
              title: "Prototipagem & iteração",
              text: "Testo cedo com protótipos navegáveis para validar direção.",
            },
            {
              title: "Entrega & evolução",
              text: "Códigos e design systems prontos para escalar, com acompanhamento após o launch.",
            },
          ].map((item) => (
            <div key={item.title} className="process-card">
              <div className="process-dot" />
              <div>
                <p className="label">{item.title}</p>
                <p className="muted">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {featuredProject && (
        <section className="card featured" id="featured">
          <div className="featured__meta">
            <p className="eyebrow">Destaque</p>
            <h2>{featuredProject.title}</h2>
            <p className="muted">{featuredProject.description}</p>
            <div className="tags">
              {(featuredProject.tech || []).map((t) => (
                <span key={t} className="tag bright">
                  {t}
                </span>
              ))}
            </div>
            <div className="hero__actions">
              {featuredProject.github && (
                <a className="btn ghost" href={featuredProject.github} target="_blank" rel="noreferrer">
                  Código
                </a>
              )}
              {featuredProject.demo && (
                <a className="btn primary" href={featuredProject.demo} target="_blank" rel="noreferrer">
                  Ver live
                </a>
              )}
            </div>
          </div>
          <div className="featured__meta secondary">
            <div className="gradient-box">
              <p className="eyebrow small">{featuredProject.type || "Projeto"}</p>
              <p className="value">{(featuredProject.tech || []).length || 3} techs</p>
              <p className="muted">Stack afinada para performance e impacto.</p>
            </div>
          </div>
        </section>
      )}

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

      <section className="card cta" id="contact">
        <div>
          <p className="eyebrow">Vamos construir</p>
          <h2>Pronto para lançar algo inesquecível?</h2>
          <p className="muted">Entra em contacto e desenhamos juntos a próxima versão do teu produto.</p>
        </div>
        <div className="hero__actions">
          {profile?.email ? (
            <a className="btn primary" href={`mailto:${profile.email}?subject=Vamos%20trabalhar%20juntos`}>
              Marcar conversa
            </a>
          ) : (
            <a
              className="btn ghost"
              href={profile?.links?.linkedin || profile?.links?.github || "#"}
              target={profile?.links?.linkedin || profile?.links?.github ? "_blank" : undefined}
              rel="noreferrer"
            >
              Vamos falar
            </a>
          )}
        </div>
      </section>

      <footer className="footer">
        <span>
          API:{" "}
          <a href={API} target="_blank" rel="noreferrer">
            {API}
          </a>
        </span>
      </footer>
    </div>
  );
}
