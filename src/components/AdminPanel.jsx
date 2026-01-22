import { useEffect, useState } from "react";

const ADMIN_CODE = import.meta.env.VITE_ADMIN_CODE || "definir-codigo";
const STORAGE_KEY = "admin_access";

export default function AdminPanel({ profile, projects }) {
  const [codeInput, setCodeInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [message, setMessage] = useState("");

  const [profileForm, setProfileForm] = useState({
    name: "",
    headline: "",
    bio: "",
    email: "",
    github: "",
    linkedin: "",
    skills: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "true") setUnlocked(true);
  }, []);

  useEffect(() => {
    if (!profile) return;
    setProfileForm({
      name: profile.name || "",
      headline: profile.headline || "",
      bio: profile.bio || "",
      email: profile.email || "",
      github: profile.links?.github || "",
      linkedin: profile.links?.linkedin || "",
      skills: (profile.skills || []).join(", "),
    });
  }, [profile]);

  function handleUnlock(e) {
    e.preventDefault();
    if (codeInput.trim() === ADMIN_CODE) {
      setUnlocked(true);
      localStorage.setItem(STORAGE_KEY, "true");
      setMessage("Acesso concedido.");
    } else {
      setMessage("Código incorreto.");
    }
  }

  function handleSignOut() {
    setUnlocked(false);
    localStorage.removeItem(STORAGE_KEY);
    setCodeInput("");
    setMessage("");
  }

  function showDisabledMessage() {
    setMessage("Modo estático ativo. Edita os ficheiros src/data/profile.js e src/data/projects.js diretamente.");
  }

  if (!unlocked) {
    return (
      <section className="card admin-card" id="admin">
        <div className="admin-header">
          <h3>Admin</h3>
          <p className="muted">Acede com o teu código secreto.</p>
        </div>
        <form className="admin-unlock" onSubmit={handleUnlock}>
          <input
            type="password"
            placeholder="Código"
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
          />
          <button type="submit" className="btn primary">
            Entrar
          </button>
        </form>
        {message && <p className="muted">{message}</p>}
      </section>
    );
  }

  return (
    <section className="card admin-card" id="admin">
      <div className="admin-header">
        <h3>Painel admin</h3>
        <button className="btn ghost small" onClick={handleSignOut}>
          Sair
        </button>
      </div>

      <div className="admin-notice" style={{
        background: "var(--surface-2, #1a1a2e)",
        padding: "1rem",
        borderRadius: "8px",
        marginBottom: "1.5rem",
        border: "1px solid var(--border, #333)"
      }}>
        <p style={{ margin: 0, color: "var(--text-muted, #888)" }}>
          <strong>Modo estático:</strong> Este painel está desativado. Para editar os dados, modifica diretamente os ficheiros:
        </p>
        <ul style={{ margin: "0.5rem 0 0 1rem", color: "var(--text-muted, #888)" }}>
          <li><code>src/data/profile.js</code> - dados do perfil</li>
          <li><code>src/data/projects.js</code> - lista de projetos</li>
        </ul>
      </div>

      {message && <p className="muted">{message}</p>}

      <div className="admin-grid">
        <div className="admin-section">
          <h4>Perfil (visualização)</h4>
          <label>
            Nome
            <input value={profileForm.name} readOnly style={{ opacity: 0.6 }} />
          </label>
          <label>
            Headline
            <input value={profileForm.headline} readOnly style={{ opacity: 0.6 }} />
          </label>
          <label>
            Bio
            <textarea rows="4" value={profileForm.bio} readOnly style={{ opacity: 0.6 }} />
          </label>
          <label>
            Email
            <input value={profileForm.email} readOnly style={{ opacity: 0.6 }} />
          </label>
          <div className="split">
            <label>
              GitHub
              <input value={profileForm.github} readOnly style={{ opacity: 0.6 }} />
            </label>
            <label>
              LinkedIn
              <input value={profileForm.linkedin} readOnly style={{ opacity: 0.6 }} />
            </label>
          </div>
          <label>
            Skills
            <input value={profileForm.skills} readOnly style={{ opacity: 0.6 }} />
          </label>
          <button className="btn primary full" type="button" onClick={showDisabledMessage} style={{ opacity: 0.6 }}>
            Guardar perfil (desativado)
          </button>
        </div>

        <div className="admin-section">
          <h4>Projetos ({projects?.length || 0})</h4>
          {projects && projects.length > 0 ? (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {projects.map((p, i) => (
                <li key={i} style={{
                  padding: "0.75rem",
                  marginBottom: "0.5rem",
                  background: "var(--surface-2, #1a1a2e)",
                  borderRadius: "6px"
                }}>
                  <strong>{p.title}</strong>
                  <span className="muted" style={{ marginLeft: "0.5rem" }}>({p.type})</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted">Nenhum projeto. Adiciona em src/data/projects.js</p>
          )}
        </div>
      </div>
    </section>
  );
}
