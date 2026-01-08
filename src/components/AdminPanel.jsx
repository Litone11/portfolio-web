import { useEffect, useState } from "react";
import { ADMIN_CODE } from "../adminSecret";

const STORAGE_KEY = "admin_access";

export default function AdminPanel({ profile, projects, apiBase }) {
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

  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    type: "",
    tech: "",
    github: "",
    demo: "",
    image: "",
    imageName: "",
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

  async function saveProfile() {
    try {
      setMessage("A guardar perfil...");
      const body = {
        name: profileForm.name,
        headline: profileForm.headline,
        bio: profileForm.bio,
        email: profileForm.email,
        links: { github: profileForm.github, linkedin: profileForm.linkedin },
        skills: profileForm.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      const res = await fetch(`${apiBase}/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`Erro ${res.status}`);
      setMessage("Perfil atualizado.");
    } catch (err) {
      setMessage(`Erro ao atualizar perfil: ${err.message}`);
    }
  }

  async function addProject() {
    try {
      setMessage("A criar projeto...");
      const body = {
        title: projectForm.title,
        description: projectForm.description,
        type: projectForm.type,
        tech: projectForm.tech
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        github: projectForm.github,
        demo: projectForm.demo,
        image: projectForm.image,
        imageName: projectForm.imageName,
      };

      const res = await fetch(`${apiBase}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`Erro ${res.status}`);
      setMessage("Projeto criado.");
      setProjectForm({
        title: "",
        description: "",
        type: "",
        tech: "",
        github: "",
        demo: "",
        image: "",
        imageName: "",
      });
    } catch (err) {
      setMessage(`Erro ao criar projeto: ${err.message}`);
    }
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setMessage("Seleciona um ficheiro de imagem.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setProjectForm((prev) => ({ ...prev, image: reader.result, imageName: file.name }));
      setMessage("Imagem anexada e pronta a enviar.");
    };
    reader.readAsDataURL(file);
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
      {message && <p className="muted">{message}</p>}

      <div className="admin-grid">
        <div className="admin-section">
          <h4>Perfil</h4>
          <label>
            Nome
            <input value={profileForm.name} onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })} />
          </label>
          <label>
            Headline
            <input
              value={profileForm.headline}
              onChange={(e) => setProfileForm({ ...profileForm, headline: e.target.value })}
            />
          </label>
          <label>
            Bio
            <textarea
              rows="4"
              value={profileForm.bio}
              onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
            />
          </label>
          <label>
            Email
            <input value={profileForm.email} onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })} />
          </label>
          <div className="split">
            <label>
              GitHub
              <input
                value={profileForm.github}
                onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
              />
            </label>
            <label>
              LinkedIn
              <input
                value={profileForm.linkedin}
                onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
              />
            </label>
          </div>
          <label>
            Skills (separadas por vírgulas)
            <input
              value={profileForm.skills}
              onChange={(e) => setProfileForm({ ...profileForm, skills: e.target.value })}
            />
          </label>
          <button className="btn primary full" type="button" onClick={saveProfile}>
            Guardar perfil
          </button>
        </div>

        <div className="admin-section">
          <h4>Novo projeto</h4>
          <label>
            Título
            <input
              value={projectForm.title}
              onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
            />
          </label>
          <label>
            Descrição
            <textarea
              rows="4"
              value={projectForm.description}
              onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
            />
          </label>
          <div className="split">
            <label>
              Tipo
              <input value={projectForm.type} onChange={(e) => setProjectForm({ ...projectForm, type: e.target.value })} />
            </label>
            <label>
              Tech (vírgulas)
              <input value={projectForm.tech} onChange={(e) => setProjectForm({ ...projectForm, tech: e.target.value })} />
            </label>
          </div>
          <div className="split">
            <label>
              GitHub
              <input
                value={projectForm.github}
                onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
              />
            </label>
            <label>
              Demo
              <input
                value={projectForm.demo}
                onChange={(e) => setProjectForm({ ...projectForm, demo: e.target.value })}
              />
            </label>
          </div>
          <label>
            Imagem do projeto (upload)
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {projectForm.image && (
              <div className="muted small">
                Anexado: {projectForm.imageName || "imagem"}
                <button
                  type="button"
                  className="btn text"
                  onClick={() => setProjectForm({ ...projectForm, image: "", imageName: "" })}
                >
                  remover
                </button>
              </div>
            )}
          </label>
          <button className="btn ghost full" type="button" onClick={addProject}>
            Adicionar projeto
          </button>
        </div>
      </div>

    </section>
  );
}
