import { Github, Linkedin, Mail, FileText } from "lucide-react";
import type { ProjectItem, ExperienceItem, SocialItem, SocialIcon, Shortcut, TweakState } from "./types";

export const DATA = {
  name: "Luís Martins",
  role: "Software Engineer",
  location: "Porto, Portugal",
  bio: [
    "Estudante finalista de Engenharia Informática e Computação (L.EIC) na FEUP.",
    "Atualmente em estágio na Capgemini. A planear o Mestrado em Engenharia Informática (M.EIC) na FEUP.",
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
      title: "TaskMate",
      year: "2024",
      kind: "Académico",
      desc: "Aplicação de gestão de tarefas e colaboração com notificações push, integração de calendário e funcionalidades de colaboração em grupo.",
      stack: ["Flutter", "Dart", "Firebase"],
      github: "https://github.com/Litone11/FEUP-ESOF",
    },
    {
      n: "02",
      title: "Freelancing Platform",
      year: "2024",
      kind: "Académico",
      desc: "Plataforma web em PHP com autenticação, controlo de sessões, sistema de perfis e base de dados relacional.",
      stack: ["PHP", "MySQL", "HTML/CSS", "JavaScript"],
      github: "https://github.com/Litone11/FEUP-LTW",
    },
    {
      n: "03",
      title: "Graph Routing",
      year: "2024",
      kind: "Académico",
      desc: "Grafo para resolver problemas de rotas e localizações com leitura de CSV e processamento de algoritmos de caminho.",
      stack: ["C++", "Algorithms", "Data Structures"],
      github: "https://github.com/Litone11/FEUP-DA-1",
    },
    {
      n: "04",
      title: "Knapsack Problem",
      year: "2024",
      kind: "Académico",
      desc: "Implementação do Problema da Mochila com força bruta, programação dinâmica, algoritmos gulosos e ILP.",
      stack: ["C++", "Dynamic Programming", "ILP"],
      github: "https://github.com/Litone11/FEUP-DA-2",
    },
    {
      n: "05",
      title: "The Invaders",
      year: "2023",
      kind: "Académico",
      desc: "Jogo de arcade retro em Java com temas variáveis, padrões de design, menu, sistema de pontuação e mecânicas clássicas.",
      stack: ["Java", "Design Patterns", "Lanterna"],
      github: "https://github.com/Litone11/FEUP-LDTS",
    },
    {
      n: "06",
      title: "Minix Game",
      year: "2023",
      kind: "Académico",
      desc: "Jogo implementado em C sobre Minix com drivers de dispositivos, entidades, lógica de jogo e gestão de eventos.",
      stack: ["C", "Minix", "Low-level"],
      github: "https://github.com/Litone11/FEUP-LCOM",
    },
    {
      n: "07",
      title: "Virtual Cable",
      year: "2023",
      kind: "Académico",
      desc: "Programa de cabo virtual para testar portos seriais, criando pares TX/RX virtuais usando sockets.",
      stack: ["C", "Sockets", "Serial Comms"],
      github: "https://github.com/Litone11/FEUP-RCOM",
    },
    {
      n: "08",
      title: "SVG to PNG",
      year: "2022",
      kind: "Académico",
      desc: "Conversor de SVG para PNG com suporte para transformações geométricas, grupos e duplicação de elementos.",
      stack: ["C++", "SVG", "PNG"],
      github: "https://github.com/Litone11/FEUP-PROG-1",
    },
    {
      n: "09",
      title: "Image Processing",
      year: "2022",
      kind: "Académico",
      desc: "Processamento de imagens em C++ com leitura de ficheiros de configuração, parser de operações e geração de resultados.",
      stack: ["C++", "Image Processing"],
      github: "https://github.com/Litone11/FEUP-PROG-2",
    },
  ] as ProjectItem[],
  experience: [
    { role: "L.EIC — Lic. Eng. Informática e Computação", company: "FEUP",      period: "2022 — Presente", place: "Porto" },
    { role: "Software Engineering Intern",                 company: "Capgemini", period: "2025 — Presente", place: "Portugal" },
    { role: "M.EIC — Mest. Eng. Informática",             company: "FEUP",      period: "2025 — Previsto", place: "Porto" },
  ] as ExperienceItem[],
};

export const SHORTCUTS: Shortcut[] = [
  { id: "intro",      label: "Intro",    num: "I",   count: null,          note: "Who" },
  { id: "projects",   label: "Work",     num: "II",  count: "09 projetos", note: "Selected" },
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
  { k: "ANOS",        v: 3,  suffix: "+" },
  { k: "PROJETOS",    v: 9,  suffix: "" },
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
  "L.EIC @ FEUP",
  "Intern @ Capgemini",
  "Full-Stack Dev",
  "Mobile Developer",
  "M.EIC em breve",
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
