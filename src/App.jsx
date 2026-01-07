import { useEffect, useState } from "react";

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

        // Some backends return a single profile object, others return a 1-item array
        setProfile(Array.isArray(p) ? (p[0] ?? null) : p);

        // Ensure projects is always an array
        setProjects(Array.isArray(pr) ? pr : []);
      } catch (e) {
        setError(e?.message || "Erro ao carregar dados.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>A carregar…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h2 style={{ marginTop: 0 }}>Algo correu mal</h2>
          <p style={{ marginBottom: 0 }}>{error}</p>
          <p style={{ opacity: 0.8 }}>
            Confirma que a API está online e que tens dados no Atlas (profile e projects).
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={{ ...styles.card, ...styles.header }}>
        <div>
          <h1 style={styles.h1}>{profile?.name || "O teu nome"}</h1>
          <p style={styles.subtitle}>{profile?.headline || "Headline"}</p>
          <p style={styles.bio}>{profile?.bio || ""}</p>

          <div style={styles.row}>
            {profile?.email && (
              <a style={styles.btn} href={`mailto:${profile.email}`}>
                Email
              </a>
            )}
            {profile?.links?.github && (
              <a style={styles.btnOutline} href={profile.links.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            )}
            {profile?.links?.linkedin && (
              <a style={styles.btnOutline} href={profile.links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            )}
          </div>
        </div>

        <div style={styles.skillsBox}>
          <h3 style={{ marginTop: 0 }}>Skills</h3>
          <div style={styles.chips}>
            {(profile?.skills || []).map((s) => (
              <span key={s} style={styles.chip}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2}>Projetos</h2>

        <div style={styles.grid}>
          {projects.map((proj, idx) => (
            <div key={proj.title + idx} style={styles.projectCard}>
              <h3 style={{ marginTop: 0 }}>{proj.title}</h3>
              <p style={{ opacity: 0.9 }}>{proj.description}</p>

              <div style={styles.chips}>
                {(proj.tech || []).map((t) => (
                  <span key={t} style={styles.chipSmall}>
                    {t}
                  </span>
                ))}
              </div>

              <div style={styles.row}>
                {proj.github && (
                  <a style={styles.link} href={proj.github} target="_blank" rel="noreferrer">
                    Código
                  </a>
                )}
                {proj.demo && (
                  <a style={styles.link} href={proj.demo} target="_blank" rel="noreferrer">
                    Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div style={styles.card}>
            Ainda não há projetos na DB. Adiciona documentos na collection <b>projects</b>.
          </div>
        )}
      </div>

      <footer style={styles.footer}>
        <span style={{ opacity: 0.8 }}>
          API: <a href={API} target="_blank" rel="noreferrer">{API}</a>
        </span>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
    maxWidth: 980,
    margin: "0 auto",
    padding: "32px 16px",
    background: "#0f0f0f",
    color: "#000000",
  },
  card: {
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: 16,
    padding: 20,
    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
    background: "white",
  },
  header: {
    display: "grid",
    gridTemplateColumns: "1.5fr 1fr",
    gap: 16,
    alignItems: "start",
  },
  h1: { margin: 0, fontSize: 36, lineHeight: 1.1 },
  subtitle: { margin: "8px 0 0", fontSize: 18, opacity: 0.8 },
  bio: { margin: "12px 0 0", fontSize: 16, opacity: 0.9 },
  section: { marginTop: 28 },
  h2: { margin: "0 0 12px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 16,
  },
  projectCard: {
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: 16,
    padding: 16,
    background: "white",
    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
  },
  row: { display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" },
  btn: {
    display: "inline-block",
    padding: "10px 14px",
    borderRadius: 12,
    background: "black",
    color: "white",
    textDecoration: "none",
    fontWeight: 600,
  },
  btnOutline: {
    display: "inline-block",
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.15)",
    color: "#0f0f0f",
    textDecoration: "none",
    fontWeight: 600,
    background: "white",
  },
  link: {
    color: "#000000",
    textDecoration: "underline",
    fontWeight: 600,
  },
  skillsBox: {
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: 16,
    padding: 16,
    background: "rgba(0,0,0,0.02)",
  },
  chips: { display: "flex", flexWrap: "wrap", gap: 8 },
  chip: {
    padding: "8px 10px",
    borderRadius: 999,
    background: "rgba(0,0,0,0.06)",
    fontSize: 14,
    color: "#0f0f0f",
  },
  chipSmall: {
    padding: "6px 8px",
    borderRadius: 999,
    background: "rgba(0,0,0,0.06)",
    fontSize: 13,
    color: "#0f0f0f",
  },
  footer: { marginTop: 24, fontSize: 14 },
};