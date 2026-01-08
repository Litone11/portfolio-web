import { useEffect, useState } from "react";
import "./App.css";
import ErrorState from "./components/ErrorState";
import Hero from "./components/Hero";
import LoadingState from "./components/LoadingState";
import ProjectsSection from "./components/ProjectsSection";
import SkillsSection from "./components/SkillsSection";
import Topbar from "./components/Topbar";
import AdminPanel from "./components/AdminPanel";
import CurriculoPage from "./components/CurriculoPage";

const API = import.meta.env.VITE_API_URL || "";

async function fetchWithTimeout(url, options = {}, timeout = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

export default function App() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);
  const pathname = typeof window !== "undefined" ? window.location.pathname.toLowerCase() : "";
  const isCurriculoPage = pathname.includes("curriculo");
  const isAdminPage = pathname.includes("admin");
  const isProjectsPage = pathname.includes("projeto");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError("");

        if (!API) {
          if (!isCurriculoPage) throw new Error("Variável VITE_API_URL em falta. Configura o endpoint da API.");
          return;
        }

        const [pRes, prRes] = await Promise.all([
          fetchWithTimeout(`${API}/profile`),
          fetchWithTimeout(`${API}/projects`),
        ]);

        if (!pRes.ok) throw new Error(`Erro /profile: ${pRes.status}`);
        if (!prRes.ok) throw new Error(`Erro /projects: ${prRes.status}`);

        const p = await pRes.json();
        const pr = await prRes.json();

        if (cancelled) return;

        setProfile(Array.isArray(p) ? (p[0] ?? null) : p);
        setProjects(Array.isArray(pr) ? pr : []);
        setHasLoaded(true);
      } catch (e) {
        if (cancelled) return;
        const message =
          e?.name === "AbortError"
            ? "Timeout ao contactar a API. Verifica se está a responder."
            : e?.message || "Erro ao carregar dados.";
        if (!isCurriculoPage) {
          setError(message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const name = profile?.name || "O teu nome";
  const headline = profile?.headline || "Transformo ideias em produtos digitais memoráveis.";
  const bio =
    profile?.bio ||
    "Adiciona aqui uma bio curta que conte quem és, o impacto que geras e o tipo de desafios em que brilhas.";
  const skills = profile?.skills || [];

  const contactHref = profile?.email ? `mailto:${profile.email}` : "#contact";

  if (loading && !hasLoaded) return <LoadingState />;
  if (error && !hasLoaded) return <ErrorState api={API} error={error} />;

  if (isCurriculoPage) {
    return (
      <>
        <div className="topbar-shell">
          <Topbar email={profile?.email} github={profile?.links?.github} linkedin={profile?.links?.linkedin} contactHref={contactHref} />
        </div>
        <CurriculoPage />
      </>
    );
  }

  if (isAdminPage) {
    return (
      <>
        <div className="topbar-shell">
          <Topbar
            email={profile?.email}
            github={profile?.links?.github}
            linkedin={profile?.links?.linkedin}
            contactHref={contactHref}
            isAdminPage
          />
        </div>
        <div className="page admin-page" id="admin">
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState api={API} error={error} />
          ) : (
            <AdminPanel profile={profile} projects={projects} apiBase={API} />
          )}
        </div>
      </>
    );
  }

  if (isProjectsPage) {
    return (
      <>
        <div className="topbar-shell">
          <Topbar email={profile?.email} github={profile?.links?.github} linkedin={profile?.links?.linkedin} contactHref={contactHref} />
        </div>
        <div className="page" id="projects">
          {error ? <ErrorState api={API} error={error} /> : <ProjectsSection projects={projects} />}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="topbar-shell">
        <Topbar
          email={profile?.email}
          github={profile?.links?.github}
          linkedin={profile?.links?.linkedin}
          contactHref={contactHref}
        />
      </div>

      <div className="page" id="top">
        <section className="hero-grid">
          <Hero
            name={name}
            headline={headline}
            bio={bio}
            email={profile?.email}
            github={profile?.links?.github}
            linkedin={profile?.links?.linkedin}
            primaryHref="#projects"
            contactHref={contactHref}
          />
        </section>

        <SkillsSection skills={skills} />

      </div>
    </>
  );
}
