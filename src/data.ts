import { Github, Linkedin, Mail, FileText } from "lucide-react";
import type { ProjectItem, ExperienceItem, SocialItem, SocialIcon, Shortcut, TweakState } from "./types";

export const DATA = {
  name: "Luís Martins",
  role: "Software Engineer",
  location: "Porto, Portugal",
  bio: [
    "Licenciado em Engenharia Informática e Computação (L.EIC) pela FEUP.",
    "Atualmente a frequentar o Mestrado em Engenharia Informática e Computação (M.EIC) na FEUP, depois de um estágio na Capgemini.",
    "Apaixonado por criar soluções — desde sistemas de baixo nível a aplicações web e mobile.",
  ],
  socials: [
    { label: "GitHub",   handle: "Litone11",                href: "https://github.com/Litone11" },
    { label: "LinkedIn", handle: "in/luis-martins",          href: "https://www.linkedin.com/in/luis-martins-874819238/" },
    { label: "Email",    handle: "luis@luismartins.website",  href: "mailto:luis@luismartins.website" },
    { label: "CV",       handle: "curriculo.pdf",             href: "/curriculo.pdf" },
  ] as SocialItem[],
  projects: [
    {
      n: "01",
      title: "MAGOL",
      year: "2026",
      kind: "Web",
      desc: "Website institucional da MAGOL (carroçarias e drogaria, Aveiro) com painel de gestão próprio — a empresa edita catálogos, contactos e horários e recebe pedidos de orçamento sem tocar no código.",
      stack: ["React", "Vite", "Supabase", "PostgreSQL", "Vercel"],
      url: "https://magol.pt",
      repo: "https://github.com/Litone11/magol-web-app",
    },
    {
      n: "02",
      title: "Portfolio",
      year: "2026",
      kind: "Web",
      desc: "Este site — SPA neo-brutalista com três layouts alternáveis em tempo real, tema claro/escuro e um player de pré-visualizações ligado à iTunes API.",
      stack: ["React", "TypeScript", "Vite", "CSS", "Vercel"],
      url: "https://luismartins.website",
      repo: "https://github.com/Litone11/portfolio-web",
    },
    {
      n: "03",
      title: "LEIC-FEUP",
      year: "2022—2025",
      kind: "Académico",
      desc: "Os 16 projetos da Licenciatura em Engenharia Informática e Computação, do 1.º ao 3.º ano — compiladores, inteligência artificial, computação gráfica, redes, sistemas de baixo nível e desenvolvimento web.",
      stack: ["C", "C++", "Java", "Python", "PHP", "JavaScript"],
      repo: "https://github.com/Litone11/LEIC-FEUP",
    },
  ] as ProjectItem[],
  experience: [
    { role: "M.EIC — Mest. Eng. Informática e Computação", company: "FEUP",      period: "2025 — Presente", place: "Porto" },
    { role: "Software Engineering Intern",                  company: "Capgemini", period: "2025",            place: "Portugal" },
    { role: "L.EIC — Lic. Eng. Informática e Computação",  company: "FEUP",      period: "2022 — 2025",     place: "Porto" },
  ] as ExperienceItem[],
};

export const SHORTCUTS: Shortcut[] = [
  { id: "intro",      label: "Intro",    num: "I",   count: null,          note: "Who" },
  { id: "projects",   label: "Work",     num: "II",  count: "03 projetos", note: "Selected" },
  { id: "experience", label: "Educação", num: "III", count: "FEUP",        note: "2022 — now" },
  { id: "contact",    label: "Contact",  num: "IV",  count: "@luis",       note: "Say hi" },
];

export const SOCIAL_ICONS: SocialIcon[] = [
  { k: "gh", label: "GitHub",   href: "https://github.com/Litone11",                         icon: Github },
  { k: "li", label: "LinkedIn", href: "https://www.linkedin.com/in/luis-martins-874819238/", icon: Linkedin },
  { k: "em", label: "Email",    href: "mailto:luis@luismartins.website",                      icon: Mail },
  { k: "cv", label: "CV",       href: "/curriculo.pdf",                                       icon: FileText },
];

export const ACCENT_SWATCHES: { k: TweakState["accent"]; c: string }[] = [
  { k: "blue",  c: "#0000ee" },
  { k: "red",   c: "#ee0000" },
  { k: "green", c: "#00994d" },
  { k: "black", c: "#000000" },
];

export const LAYOUT_OPTIONS: { k: TweakState["layout"]; label: string; sub: string }[] = [
  { k: "a", label: "A · Three-column (sketch)", sub: "Timeline left · name center · photo right" },
  { k: "b", label: "B · Editorial",             sub: "Big photo + asymmetric hero" },
  { k: "c", label: "C · Terminal",              sub: "Monospace stacked, dev-heavy" },
];

export const STATS = [
  { k: "ANOS",        v: 4,  suffix: "+" },
  { k: "PROJETOS",    v: 18, suffix: "" },
  { k: "TECNOLOGIAS", v: 20, suffix: "+" },
];

export const ACTIVITIES = [
  { t: "Agora", a: "a estudar",  s: "Engenharia Informática · FEUP" },
  { t: "2024",  a: "entregou",   s: "TaskMate — projeto ESOF" },
  { t: "2024",  a: "lançou",     s: "Freelancing Platform" },
  { t: "2023",  a: "construiu",  s: "The Invaders — jogo Java" },
  { t: "2022",  a: "iniciou",    s: "B.Sc. na FEUP" },
];

export const ROLES = [
  "M.EIC @ FEUP",
  "Full-Stack Dev",
  "Web Developer",
  "Mobile Developer",
];

export const DRAKE_SONGS = [
  { title: "God's Plan",     query: "drake gods plan",        href: "https://music.apple.com/us/album/scorpion/1418213110?i=1418213269" },
  { title: "Hotline Bling",  query: "drake hotline bling",    href: "https://music.apple.com/us/album/views/1440841363?i=1440841730" },
  { title: "One Dance",      query: "drake one dance wizkid", href: "https://music.apple.com/us/album/views/1440841363?i=1440841384" },
  { title: "In My Feelings", query: "drake in my feelings",   href: "https://music.apple.com/us/album/scorpion/1418213110?i=1418213402" },
  { title: "Passionfruit",   query: "drake passionfruit",     href: "https://music.apple.com/us/album/more-life/1440890708?i=1440891494" },
];

export const initialIdx = Math.floor(Math.random() * DRAKE_SONGS.length);
export const PREVIEW_DURATION = 30;
