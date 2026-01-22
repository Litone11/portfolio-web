import "./App.css";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import SkillsSection from "./components/SkillsSection";
import Topbar from "./components/Topbar";
import AdminPanel from "./components/AdminPanel";
import CurriculoPage from "./components/CurriculoPage";
import { profile } from "./data/profile";
import { projects } from "./data/projects";

export default function App() {
  const pathname = typeof window !== "undefined" ? window.location.pathname.toLowerCase() : "";
  const isCurriculoPage = pathname.includes("curriculo");
  const isAdminPage = pathname.includes("admin");
  const isProjectsPage = pathname.includes("projeto");

  const name = profile.name;
  const headline = profile.headline;
  const bio = profile.bio;
  const skills = profile.skills || [];
  const contactHref = profile.email ? `mailto:${profile.email}` : "#contact";

  if (isCurriculoPage) {
    return (
      <>
        <div className="topbar-shell">
          <Topbar
            email={profile.email}
            github={profile.links?.github}
            linkedin={profile.links?.linkedin}
            contactHref={contactHref}
          />
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
            email={profile.email}
            github={profile.links?.github}
            linkedin={profile.links?.linkedin}
            contactHref={contactHref}
            isAdminPage
          />
        </div>
        <div className="page admin-page" id="admin">
          <AdminPanel profile={profile} projects={projects} />
        </div>
      </>
    );
  }

  if (isProjectsPage) {
    return (
      <>
        <div className="topbar-shell">
          <Topbar
            email={profile.email}
            github={profile.links?.github}
            linkedin={profile.links?.linkedin}
            contactHref={contactHref}
          />
        </div>
        <div className="page" id="projects">
          <ProjectsSection projects={projects} />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="topbar-shell">
        <Topbar
          email={profile.email}
          github={profile.links?.github}
          linkedin={profile.links?.linkedin}
          contactHref={contactHref}
        />
      </div>

      <Hero name={name} />

      <div className="page" id="about">
        <AboutSection bio={bio} headline={headline} />
        <SkillsSection skills={skills} />
      </div>
    </>
  );
}
