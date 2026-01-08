import { useEffect, useMemo, useState } from "react";
import "./App.css";
import CtaSection from "./components/CtaSection";
import ErrorState from "./components/ErrorState";
import Hero from "./components/Hero";
import LoadingState from "./components/LoadingState";
import ProjectsSection from "./components/ProjectsSection";
import SkillsSection from "./components/SkillsSection";
import Topbar from "./components/Topbar";
import AboutSection from "./components/AboutSection";

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

  const initials = useMemo(() => {
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase())
      .join("");
  }, [name]);

  const contactHref = profile?.email ? `mailto:${profile.email}` : "#contact";

  if (loading) return <LoadingState />;
  if (error) return <ErrorState api={API} error={error} />;

  return (
    <>
      <div className="topbar-shell">
        <Topbar initials={initials} email={profile?.email} />
      </div>

      <div className="page">
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

        <AboutSection bio={bio} />

        <SkillsSection skills={skills} />

        <ProjectsSection projects={projects} />

        <CtaSection email={profile?.email} linkedin={profile?.links?.linkedin} github={profile?.links?.github} />

      </div>
    </>
  );
}
