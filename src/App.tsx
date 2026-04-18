// Brutalist portfolio — Luís Martins
import { useState, useEffect, useRef, ReactNode, ComponentType } from "react";
import { Github, Linkedin, Mail, FileText } from "lucide-react";

// ----- Types -----
interface ProjectItem {
  n: string;
  title: string;
  year: string;
  kind: string;
  desc: string;
  stack: string[];
  github: string;
}

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  place: string;
}

interface SocialItem {
  label: string;
  handle: string;
  href: string;
}

interface SocialIcon {
  k: string;
  label: string;
  href: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number }>;
}

interface Shortcut {
  id: string;
  label: string;
  num: string;
  count: string | null;
  note: string;
}

interface TweakState {
  layout: "a" | "b" | "c";
  accent: "blue" | "red" | "green" | "black";
  inverted: boolean;
  cursor: boolean;
}

// ----- Data -----
const DATA = {
  name: "Luís Martins",
  role: "Software Engineer",
  location: "Porto, Portugal",
  bio: [
    "Estudante finalista de Engenharia Informática e Computação (L.EIC) na FEUP.",
    "Atualmente em estágio na Capgemini. A planear o Mestrado em Engenharia Informática (M.EIC) na FEUP.",
    "Apaixonado por criar soluções — desde sistemas de baixo nível a aplicações web e mobile.",
  ],
  socials: [
    { label: "GitHub",   handle: "Litone11",             href: "https://github.com/Litone11" },
    { label: "LinkedIn", handle: "in/luis-martins",       href: "https://www.linkedin.com/in/luis-martins-874819238/" },
    { label: "Email",    handle: "luis@luismartins.website", href: "mailto:luis@luismartins.website" },
    { label: "CV",       handle: "curriculo.pdf",          href: "/curriculo.pdf" },
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
    { role: "L.EIC — Lic. Eng. Informática e Computação", company: "FEUP", period: "2022 — Presente", place: "Porto" },
    { role: "Software Engineering Intern", company: "Capgemini",   period: "2025 — Presente", place: "Portugal" },
    { role: "M.EIC — Mest. Eng. Informática", company: "FEUP",    period: "2025 — Previsto", place: "Porto" },
  ] as ExperienceItem[],
};

const SHORTCUTS: Shortcut[] = [
  { id: "intro",      label: "Intro",      num: "I",   count: null,           note: "Who" },
  { id: "projects",   label: "Work",       num: "II",  count: "09 projetos",  note: "Selected" },
  { id: "experience", label: "Educação",   num: "III", count: "FEUP",         note: "2022 — now" },
  { id: "contact",    label: "Contact",    num: "IV",  count: "@luis",        note: "Say hi" },
];

const SOCIAL_ICONS: SocialIcon[] = [
  { k: "gh", label: "GitHub",   href: "https://github.com/Litone11",                         icon: Github },
  { k: "li", label: "LinkedIn", href: "https://www.linkedin.com/in/luis-martins-874819238/", icon: Linkedin },
  { k: "em", label: "Email",    href: "mailto:luis@luismartins.website",                      icon: Mail },
  { k: "cv", label: "CV",       href: "/curriculo.pdf",                                       icon: FileText },
];

// ----- Photo placeholder -----
function PhotoPlaceholder({ className = "", label = "PORTRAIT" }: { className?: string; label?: string }) {
  return (
    <div className={`photo-ph ${className}`}>
      <svg width="100%" height="100%" viewBox="0 0 200 260" preserveAspectRatio="none">
        <defs>
          <pattern id="stripes" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="8" height="8" fill="#fff"/>
            <rect width="4" height="8" fill="#000"/>
          </pattern>
        </defs>
        <rect width="200" height="260" fill="url(#stripes)"/>
        <circle cx="100" cy="105" r="42" fill="var(--bg)" stroke="var(--fg)" strokeWidth="2"/>
        <path d="M 40 260 Q 40 180 100 180 Q 160 180 160 260 Z" fill="var(--bg)" stroke="var(--fg)" strokeWidth="2"/>
      </svg>
      <div className="photo-corners">
        <span/><span/><span/><span/>
      </div>
    </div>
  );
}

// ----- Name block with scramble -----
function NameBlock({ size = "xl", animate = true }: { size?: string; animate?: boolean }) {
  const [letters, setLetters] = useState(["Luís", "Martins"]);
  const [scrambling, setScrambling] = useState(false);

  const scramble = () => {
    if (scrambling) return;
    setScrambling(true);
    const chars = "█▓▒░◆◇▲△●○■□#*+=<>";
    const target = ["Luís", "Martins"];
    let step = 0;
    const iv = setInterval(() => {
      setLetters(target.map(word =>
        word.split("").map((c, i) => {
          if (i < step) return c;
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      ));
      step += 0.5;
      if (step > 7) {
        clearInterval(iv);
        setLetters(target);
        setScrambling(false);
      }
    }, 40);
  };

  return (
    <h1
      className={`name name-${size} ${animate ? "name-animate" : ""}`}
      onMouseEnter={scramble}
      data-cursor="scramble"
    >
      <span className="name-line"><span>{letters[0]}</span></span>
      <span className="name-line"><span>{letters[1]}</span></span>
    </h1>
  );
}

function MetaLine() {
  return (
    <div className="meta-line">
      <span className="dot"/> <TypewriterRole />
      <span className="sep">/</span>
      <span>Porto, PT</span>
      <span className="sep">/</span>
      <span className="live"><span className="live-dot"/> disponível · 2025</span>
    </div>
  );
}

function StatStrip() {
  const stats = [
    { k: "ANOS",        v: 3,      suffix: "+" },
    { k: "PROJETOS",    v: 9,      suffix: "" },
    { k: "TECNOLOGIAS", v: 20,     suffix: "+" },
    { k: "CAPGEMINI",   v: "2025", isText: true },
  ];
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="stat-strip" ref={ref}>
      {stats.map((s) => (
        <div key={s.k} className="stat">
          <span className="stat-v">
            {s.isText ? s.v : <CountUp to={s.v as number} run={visible} />}
            {s.suffix || ""}
          </span>
          <span className="stat-k">{s.k}</span>
        </div>
      ))}
    </div>
  );
}

function CountUp({ to, run, decimals = 0 }: { to: number; run: boolean; decimals?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    const start = performance.now();
    const dur = 1400;
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return <>{val.toFixed(decimals)}</>;
}

function MagneticButton({ children, className = "", strength = 0.3, ...props }: {
  children: ReactNode;
  className?: string;
  strength?: number;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const onLeave = () => { el.style.transform = ""; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);
  return <span ref={ref} className={`magnetic ${className}`} {...props}>{children}</span>;
}

function ActivityTicker() {
  const activities = [
    { t: "Agora",   a: "a estudar",            s: "Engenharia Informática · FEUP" },
    { t: "2024",    a: "entregou",              s: "TaskMate — projeto ESOF" },
    { t: "2024",    a: "lançou",                s: "Freelancing Platform" },
    { t: "2023",    a: "construiu",             s: "The Invaders — jogo Java" },
    { t: "2022",    a: "iniciou",               s: "B.Sc. na FEUP" },
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setIdx(i => (i + 1) % activities.length), 3200);
    return () => clearInterval(iv);
  }, []);
  const cur = activities[idx];
  return (
    <div className="activity-ticker" aria-live="polite">
      <span className="at-dot" />
      <span className="at-label">LIVE</span>
      <span className="at-time">{cur.t}</span>
      <span className="at-action">{cur.a}</span>
      <span className="at-subject">{cur.s}</span>
    </div>
  );
}

function LiveClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const iv = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(iv);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");
  const hh = pad(now.getHours());
  const mm = pad(now.getMinutes());
  const ss = pad(now.getSeconds());
  return (
    <div className="live-clock">
      <div className="lc-label">PORTO · LIVE</div>
      <div className="lc-digits">
        <span>{hh}</span>
        <span className="lc-sep">:</span>
        <span>{mm}</span>
        <span className="lc-sep">:</span>
        <span className="lc-ss">{ss}</span>
      </div>
      <div className="lc-meta">
        <span>UTC+0 · WET</span>
        <span>{now.toLocaleDateString("pt-PT", { weekday: "short", day: "2-digit", month: "short" })}</span>
      </div>
    </div>
  );
}

function TypewriterRole() {
  const roles = [
    "L.EIC @ FEUP",
    "Intern @ Capgemini",
    "Full-Stack Dev",
    "Mobile Developer",
    "M.EIC em breve",
  ];
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "deleting">("typing");
  useEffect(() => {
    const target = roles[idx];
    let t: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (text.length < target.length) {
        t = setTimeout(() => setText(target.slice(0, text.length + 1)), 60);
      } else {
        t = setTimeout(() => setPhase("deleting"), 2200);
      }
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(target.slice(0, text.length - 1)), 30);
      } else {
        setIdx((idx + 1) % roles.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(t);
  }, [text, phase, idx]);
  return (
    <span className="typewriter">
      {text}
      <span className="tw-caret">▊</span>
    </span>
  );
}

const DRAKE_SONGS = [
  { title: "God's Plan",     query: "drake gods plan",       href: "https://music.apple.com/us/album/scorpion/1418213110?i=1418213269" },
  { title: "Hotline Bling",  query: "drake hotline bling",   href: "https://music.apple.com/us/album/views/1440841363?i=1440841730" },
  { title: "One Dance",      query: "drake one dance wizkid", href: "https://music.apple.com/us/album/views/1440841363?i=1440841384" },
  { title: "In My Feelings", query: "drake in my feelings",  href: "https://music.apple.com/us/album/scorpion/1418213110?i=1418213402" },
  { title: "Passionfruit",   query: "drake passionfruit",    href: "https://music.apple.com/us/album/more-life/1440890708?i=1440891494" },
];

const initialIdx = Math.floor(Math.random() * DRAKE_SONGS.length);
const PREVIEW_DURATION = 30;

function NowStatus() {
  const [idx, setIdx] = useState(initialIdx);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const song = DRAKE_SONGS[idx];
  const progress = (elapsed / PREVIEW_DURATION) * 100;
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s) % 60).padStart(2, "0")}`;

  // Fetch iTunes preview URL when song changes
  useEffect(() => {
    setPreviewUrl(null);
    setPlaying(false);
    setElapsed(0);
    setLoading(true);

    fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(song.query)}&entity=song&limit=1&media=music`)
      .then(r => r.json())
      .then(data => {
        const url = data.results?.[0]?.previewUrl ?? null;
        setPreviewUrl(url);
      })
      .catch(() => setPreviewUrl(null))
      .finally(() => setLoading(false));
  }, [idx]);

  // Create / destroy audio element when previewUrl changes
  useEffect(() => {
    if (!previewUrl) return;
    // Pause any previous audio before creating a new one
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    const audio = new Audio(previewUrl);
    audioRef.current = audio;

    const onTime = () => setElapsed(audio.currentTime);
    const onEnd = () => {
      setPlaying(false);
      setElapsed(0);
      setIdx(i => (i + 1) % DRAKE_SONGS.length);
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnd);
      audioRef.current = null;
    };
  }, [previewUrl]);

  // Sync play / pause state to audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) audio.play().catch(() => setPlaying(false));
    else audio.pause();
  }, [playing]);

  const prev = () => { setIdx(i => (i - 1 + DRAKE_SONGS.length) % DRAKE_SONGS.length); };
  const next = () => { setIdx(i => (i + 1) % DRAKE_SONGS.length); };

  const playLabel = loading ? "···" : playing ? "⏸" : "▶";

  return (
    <div className="now-status">
      <div className="ns-top">
        <span className="ns-label">ON REPEAT · PREVIEW</span>
        <a href={song.href} target="_blank" rel="noreferrer" className="ns-ext" title="Abrir no Apple Music">↗</a>
      </div>

      <div className="ns-info">
        <div className="ns-title">{song.title}</div>
        <div className="ns-artist">Drake</div>
      </div>

      <div className="ns-wave" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className={`ns-bar ${playing ? "ns-bar-active" : ""}`}
            style={{ animationDelay: `${(i * 80) % 700}ms` }}
          />
        ))}
      </div>

      <div className="ns-progress-wrap">
        <div className="ns-progress-track">
          <div className="ns-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="ns-times">
          <span>{fmt(elapsed)}</span>
          <span>{fmt(PREVIEW_DURATION)}</span>
        </div>
      </div>

      <div className="ns-controls">
        <button className="ns-btn" onClick={prev} aria-label="Anterior">⏮</button>
        <button
          className="ns-btn ns-btn-play"
          onClick={() => !loading && setPlaying(p => !p)}
          aria-label={playing ? "Pausa" : "Play"}
          disabled={loading || !previewUrl}
        >
          {playLabel}
        </button>
        <button className="ns-btn" onClick={next} aria-label="Próxima">⏭</button>
      </div>
    </div>
  );
}

function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;
    let raf: number;
    let x = 0, y = 0, tx = 0, ty = 0;
    const onMove = (e: MouseEvent) => {
      const r = parent.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      el.style.opacity = "1";
    };
    const onLeave = () => { el.style.opacity = "0"; };
    const loop = () => {
      x += (tx - x) * 0.15;
      y += (ty - y) * 0.15;
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    loop();
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Bio() {
  return (
    <div className="bio">
      {DATA.bio.map((p, i) => <p key={i}>{p}</p>)}
    </div>
  );
}

const ACCENT_SWATCHES: { k: TweakState["accent"]; c: string }[] = [
  { k: "blue",  c: "#0000ee" },
  { k: "red",   c: "#ee0000" },
  { k: "green", c: "#00994d" },
  { k: "black", c: "#2a2a2a" },
];

function TimelineRail({ inverted, onToggleInverted, accent, onSetAccent }: {
  inverted: boolean;
  onToggleInverted: () => void;
  accent: TweakState["accent"];
  onSetAccent: (a: TweakState["accent"]) => void;
}) {
  const [active, setActive] = useState("intro");
  const [progress, setProgress] = useState(0);
  const lastY = useRef(0);

  useEffect(() => {
    const els = SHORTCUTS
      .map(s => ({ id: s.id, el: document.getElementById(s.id) }))
      .filter((x): x is { id: string; el: HTMLElement } => x.el !== null);

    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      setProgress(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0);
      lastY.current = y;

      const mid = window.innerHeight * 0.35;
      let current = els[0]?.id || "intro";
      for (const { id, el } of els) {
        const top = el.getBoundingClientRect().top;
        if (top - mid <= 0) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const activeIdx = Math.max(0, SHORTCUTS.findIndex(s => s.id === active));

  return (
    <div className="rail">
      <div className="rail-head" />

      <nav className="timeline" aria-label="Page timeline">
        <div className="tl-section-label">
          <span>§ INDEX</span>
          <span className="tl-section-count">{activeIdx + 1} / {SHORTCUTS.length}</span>
        </div>

        <div className="tl-track-wrap">
          <div className="tl-track">
            <div className="tl-fill" style={{ height: `${progress * 100}%` }} />
          </div>
          <ul>
            {SHORTCUTS.map((s, i) => {
              const isActive = s.id === active;
              const isPast = i < activeIdx;
              return (
                <li
                  key={s.id}
                  className={`tl-item ${isActive ? "on" : ""} ${isPast ? "past" : ""}`}
                >
                  <a href={`#${s.id}`} onClick={(e) => go(e, s.id)} data-cursor={s.label}>
                    <span className="tl-node" aria-hidden="true">
                      <span className="tl-dot" />
                      <span className="tl-ring" />
                    </span>
                    <span className="tl-body">
                      <span className="tl-row">
                        <span className="tl-num">{s.num}</span>
                        <span className="tl-label">{s.label}</span>
                        <span className="tl-bar" />
                      </span>
                      <span className="tl-meta">
                        <span className="tl-note">{s.note}</span>
                        {s.count && <span className="tl-count">{s.count}</span>}
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <div className="rail-socials">
        <div className="rail-label">
          <span>§ ELSEWHERE</span>
          <span className="rail-label-dots">·····</span>
        </div>
        <SocialIcons orientation="grid" />
      </div>

      <div className="rail-foot">
        <button
          className="theme-toggle"
          onClick={onToggleInverted}
          aria-label="Toggle dark mode"
          data-cursor={inverted ? "light mode" : "dark mode"}
        >
          <span className="tt-icon" aria-hidden="true">
            {inverted ? "☀" : "☾"}
          </span>
          <span className="tt-label">{inverted ? "LIGHT" : "DARK"}</span>
        </button>
        <div className="rail-swatches">
          {ACCENT_SWATCHES.map(s => (
            <button
              key={s.k}
              className={`rail-sw${accent === s.k ? " on" : ""}`}
              style={{ background: s.c }}
              onClick={() => onSetAccent(s.k)}
              aria-label={`Accent ${s.k}`}
              data-cursor={s.k}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SocialIcons({ orientation = "grid" }: { orientation?: string }) {
  return (
    <nav className={`socials socials-${orientation}`} aria-label="Social links">
      <div className="side-label">SOCIALS ↓</div>
      <ul>
        {SOCIAL_ICONS.map((s) => (
          <li key={s.k}>
            <a href={s.href} data-cursor={s.label} title={s.label} target={s.href.startsWith("http") ? "_blank" : undefined} rel={s.href.startsWith("http") ? "noreferrer" : undefined}>
              <span className="si-glyph"><s.icon size={14} strokeWidth={2} /></span>
              <span className="si-label">{s.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Socials({ orientation = "vertical" }: { orientation?: string }) {
  return (
    <nav className={`socials-row socials-row-${orientation}`} aria-label="Social links">
      <div className="side-label">SOCIALS ↓</div>
      <ul>
        {DATA.socials.map((s) => (
          <li key={s.label}>
            <a href={s.href} data-cursor={s.label} target={s.href.startsWith("http") ? "_blank" : undefined} rel={s.href.startsWith("http") ? "noreferrer" : undefined}>
              <span className="s-label">{s.label}</span>
              <span className="s-handle">{s.handle}</span>
              <span className="s-arrow">→</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Projects({ variant = "list" }: { variant?: string }) {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <Reveal>
      <section className={`projects projects-${variant}`} id="projects">
        <header className="section-head">
          <h2>Selected Work</h2>
          <span className="section-count">[ {DATA.projects.length} ]</span>
        </header>
        <ul className="projects-list" onMouseLeave={() => setHovered(null)}>
          {DATA.projects.map((p, i) => (
            <li
              key={p.n}
              className={`project-row ${hovered !== null && hovered !== i ? "dim" : ""} ${hovered === i ? "hot" : ""}`}
              onMouseEnter={() => setHovered(i)}
            >
              <a href={p.github} target="_blank" rel="noreferrer">
                <span className="p-n">{p.n}</span>
                <span className="p-title">{p.title}</span>
                <span className="p-kind">{p.kind}</span>
                <span className="p-year">{p.year}</span>
                <span className="p-arrow">↗</span>
                <div className="p-hover">
                  <p className="p-desc">{p.desc}</p>
                  <div className="p-stack">
                    {p.stack.map(s => <span key={s} className="tag">{s}</span>)}
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </Reveal>
  );
}

function Experience() {
  return (
    <Reveal>
      <section className="experience" id="experience">
        <header className="section-head">
          <h2>Educação</h2>
        </header>
        <ul className="exp-list">
          {DATA.experience.map((e, i) => (
            <li key={i}>
              <span className="e-period">{e.period}</span>
              <div className="e-main">
                <span className="e-role">{e.role}</span>
                <span className="e-company">{e.company}</span>
              </div>
              <span className="e-place">{e.place}</span>
            </li>
          ))}
        </ul>
      </section>
    </Reveal>
  );
}

function Footer() {
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = fields;
    const body = encodeURIComponent(`Nome: ${name}\n\n${message}`);
    const subject = encodeURIComponent(`Contacto de ${name}`);
    window.location.href = `mailto:luis@luismartins.website?subject=${subject}&body=${body}&from=${encodeURIComponent(email)}`;
    setSent(true);
  };

  return (
    <footer className="footer">
      {/* Heading */}
      <div className="footer-cta">
        <div className="fc-label">§ CONTACT</div>
        <a href="mailto:luis@luismartins.website" className="fc-email" data-cursor="email">
          <MagneticButton strength={0.25}>luis@luismartins.website</MagneticButton>
        </a>
        <p className="fc-sub">Aberto a oportunidades, colaborações e conversas.</p>
      </div>

      {/* Form + links side by side */}
      <div className="contact-grid">
        {/* Form */}
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          {sent ? (
            <div className="cf-sent">
              <span className="cf-sent-icon">✓</span>
              <span>A abrir o teu cliente de email…</span>
            </div>
          ) : (
            <>
              <div className="cf-row">
                <label className="cf-label" htmlFor="cf-name">Nome</label>
                <input
                  id="cf-name"
                  className="cf-input"
                  type="text"
                  placeholder="Luís Silva"
                  required
                  value={fields.name}
                  onChange={e => setFields(f => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div className="cf-row">
                <label className="cf-label" htmlFor="cf-email">Email</label>
                <input
                  id="cf-email"
                  className="cf-input"
                  type="email"
                  placeholder="luis@exemplo.pt"
                  required
                  value={fields.email}
                  onChange={e => setFields(f => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div className="cf-row">
                <label className="cf-label" htmlFor="cf-msg">Mensagem</label>
                <textarea
                  id="cf-msg"
                  className="cf-input cf-textarea"
                  placeholder="Olá Luís, queria falar sobre…"
                  required
                  rows={5}
                  value={fields.message}
                  onChange={e => setFields(f => ({ ...f, message: e.target.value }))}
                />
              </div>
              <button className="cf-submit" type="submit" data-cursor="enviar">
                <span>ENVIAR →</span>
              </button>
            </>
          )}
        </form>

        {/* Direct links */}
        <div className="contact-links">
          <div className="cl-label">DIRECTO</div>
          <ul>
            {DATA.socials.map(s => (
              <li key={s.label}>
                <a
                  href={s.href}
                  data-cursor={s.label}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  <span className="cl-name">{s.label}</span>
                  <span className="cl-handle">{s.handle}</span>
                  <span className="cl-arrow">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-colophon">
        <span>© {new Date().getFullYear()} Luís Martins</span>
        <span>Porto, Portugal</span>
      </div>
    </footer>
  );
}

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf: number;
    let x = 0, y = 0, tx = 0, ty = 0;
    const move = (e: MouseEvent) => {
      tx = e.clientX; ty = e.clientY;
      setVisible(true);
      const t = (e.target as Element).closest("[data-cursor]") as HTMLElement | null;
      setLabel(t ? t.dataset.cursor || "" : "");
    };
    const leave = () => setVisible(false);
    const loop = () => {
      x += (tx - x) * 0.35;
      y += (ty - y) * 0.35;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    loop();
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`cursor ${visible ? "on" : ""} ${label ? "has-label" : ""}`}
      aria-hidden="true"
    >
      <span className="cursor-cross">+</span>
      {label && <span className="cursor-label">{label}</span>}
    </div>
  );
}

// ----- Layout A: Three-column (close to sketch) -----
function LayoutA({ inverted, onToggleInverted, accent, onSetAccent }: {
  inverted: boolean;
  onToggleInverted: () => void;
  accent: TweakState["accent"];
  onSetAccent: (a: TweakState["accent"]) => void;
}) {
  return (
    <div className="layout layout-a">
      <aside className="rail-col">
        <TimelineRail
          inverted={inverted}
          onToggleInverted={onToggleInverted}
          accent={accent}
          onSetAccent={onSetAccent}
        />
      </aside>

      <div className="main-col">
        <section id="intro" className="hero">
          <CursorGlow />
          <main className="col-center">
            <NameBlock size="xl" />
            <MetaLine />
            <Bio />
            <StatStrip />
          </main>
          <aside className="col-right">
            <div className="photo-ph">
              <img src="/foto.jpg" alt="Luís Martins" className="photo-real" />
              <div className="photo-corners"><span/><span/><span/><span/></div>
            </div>
            <LiveClock />
            <NowStatus />
          </aside>
        </section>

        <div className="divider"><span>§</span></div>
        <Projects variant="list" />
        <div className="divider"><span>§</span></div>
        <Experience />
        <section id="contact">
          <Footer />
        </section>
      </div>
    </div>
  );
}

// ----- Layout B: Editorial, photo big + asymmetric -----
function LayoutB({ inverted, onToggleInverted }: { inverted: boolean; onToggleInverted: () => void }) {
  return (
    <div className="layout layout-b">
      <header className="top-bar">
        <span>LUÍS MARTINS</span>
        <span className="top-dots">· · · · · · · · · · · · · · · · · · · · · · · · · · ·</span>
        <span>PORTFOLIO — MMXXV</span>
      </header>

      <div className="hero">
        <div className="hero-photo">
          <PhotoPlaceholder />
        </div>
        <div className="hero-text">
          <span className="pre">Software engineer, Porto —</span>
          <NameBlock size="huge" />
          <Bio />
          <MetaLine />
        </div>
      </div>

      <div className="band">
        <div className="band-row">
          <Socials orientation="horizontal" />
        </div>
      </div>

      <Projects variant="list" />
      <div className="divider"><span>§</span></div>
      <Experience />
      <Footer />
    </div>
  );
}

// ----- Layout C: Terminal / mono stacked -----
function LayoutC({ inverted, onToggleInverted }: { inverted: boolean; onToggleInverted: () => void }) {
  return (
    <div className="layout layout-c">
      <div className="term-head">
        <span>~/luis-martins</span>
        <span className="term-dots">● ● ●</span>
        <span>ver 2025</span>
      </div>

      <div className="hero">
        <div className="term-line">$ whoami</div>
        <NameBlock size="mega" />
        <div className="term-line">$ cat bio.txt</div>
        <Bio />
        <div className="hero-grid">
          <div className="hero-meta">
            <MetaLine />
          </div>
          <div className="hero-photo-sm">
            <PhotoPlaceholder label="/portrait.jpg" />
          </div>
        </div>
        <div className="term-line">$ ls ~/links</div>
        <Socials orientation="horizontal" />
      </div>

      <div className="divider"><span>§</span></div>
      <Projects variant="list" />
      <div className="divider"><span>§</span></div>
      <Experience />
      <Footer />
    </div>
  );
}

// ----- Tweaks panel -----
function TweaksPanel({ open, state, setState }: {
  open: boolean;
  state: TweakState;
  setState: (s: TweakState) => void;
}) {
  if (!open) return null;
  const layouts: { k: TweakState["layout"]; label: string; sub: string }[] = [
    { k: "a", label: "A · Three-column (sketch)", sub: "Timeline left · name center · photo right" },
    { k: "b", label: "B · Editorial", sub: "Big photo + asymmetric hero" },
    { k: "c", label: "C · Terminal", sub: "Monospace stacked, dev-heavy" },
  ];
  return (
    <div className="tweaks">
      <div className="tweaks-head">
        <span>TWEAKS</span>
        <span className="tweaks-hint">press T to toggle</span>
      </div>
      <div className="tweaks-body">
        <div className="tw-group">
          <div className="tw-label">Layout</div>
          {layouts.map(l => (
            <button
              key={l.k}
              className={`tw-opt ${state.layout === l.k ? "on" : ""}`}
              onClick={() => setState({ ...state, layout: l.k })}
            >
              <div className="tw-opt-main">{l.label}</div>
              <div className="tw-opt-sub">{l.sub}</div>
            </button>
          ))}
        </div>
        <div className="tw-group">
          <div className="tw-label">Accent</div>
          <div className="tw-swatches">
            {([
              { k: "blue",  c: "#0000ee" },
              { k: "red",   c: "#ee0000" },
              { k: "green", c: "#00994d" },
              { k: "black", c: "#000000" },
            ] as { k: TweakState["accent"]; c: string }[]).map(s => (
              <button
                key={s.k}
                className={`tw-sw ${state.accent === s.k ? "on" : ""}`}
                style={{ background: s.c }}
                onClick={() => setState({ ...state, accent: s.k })}
                aria-label={s.k}
              />
            ))}
          </div>
        </div>
        <div className="tw-group">
          <div className="tw-label">Inverted</div>
          <button
            className={`tw-toggle ${state.inverted ? "on" : ""}`}
            onClick={() => setState({ ...state, inverted: !state.inverted })}
          >
            <span>{state.inverted ? "ON" : "OFF"}</span>
          </button>
        </div>
        <div className="tw-group">
          <div className="tw-label">Custom cursor</div>
          <button
            className={`tw-toggle ${state.cursor ? "on" : ""}`}
            onClick={() => setState({ ...state, cursor: !state.cursor })}
          >
            <span>{state.cursor ? "ON" : "OFF"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ----- Intro loader -----
function IntroLoader({ onExitStart, onDone }: { onExitStart: () => void; onDone: () => void }) {
  const [t, setT] = useState(0);
  const [stage, setStage] = useState(0); // 0=loading, 1=ready, 2=exit
  const [pct, setPct] = useState(0);
  const [exitP, setExitP] = useState(0);
  const [scrambled, setScrambled] = useState(["", ""]);
  const exitStartFired = useRef(false);
  // Stable refs so the effect never re-runs due to prop identity changes
  const onExitStartRef = useRef(onExitStart);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    const start = Date.now();
    const loadDur = 1800;
    const dwell = 450;
    const exitDur = 900;
    const totalIn = loadDur + dwell;
    const target = ["LUIS", "MARTINS"];
    const chars = "▓▒░█▌▐■□●◉◆△▲◇◊#*+=<>?/\\";

    const tick = () => {
      const el = Date.now() - start;
      if (el <= totalIn) {
        const p = Math.min(1, el / totalIn);
        setT(p);
        if (el < loadDur) {
          const pp = Math.min(1, el / loadDur);
          const eased = 1 - Math.pow(1 - pp, 2.2);
          setPct(Math.floor(eased * 100));
          setStage(0);
        } else {
          setPct(100);
          setStage(1);
        }
        const nameProgress = Math.max(0, Math.min(1, (p - 0.25) / 0.55));
        const totalChars = target[0].length + target[1].length;
        const locked = Math.floor(nameProgress * totalChars);
        let counter = 0;
        const next = target.map(word =>
          word.split("").map(c => {
            counter++;
            if (counter <= locked) return c;
            if (c === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          }).join("")
        );
        setScrambled(next);
      } else if (el <= totalIn + exitDur) {
        // Fire onExitStart once so layout can begin fading in underneath
        if (!exitStartFired.current) {
          exitStartFired.current = true;
          onExitStartRef.current();
        }
        setStage(2);
        const ep = Math.min(1, (el - totalIn) / exitDur);
        const eased = ep < 0.5
          ? 2 * ep * ep
          : 1 - Math.pow(-2 * ep + 2, 3) / 2;
        setExitP(eased);
        setScrambled(target);
      } else {
        clearInterval(iv);
        onDoneRef.current();
      }
    };

    const iv = setInterval(tick, 16);
    tick();
    return () => clearInterval(iv);
  }, []); // empty — runs once on mount only

  const lerp = (from: number, to: number, start: number, end: number) => {
    const p = Math.max(0, Math.min(1, (t - start) / (end - start)));
    const eased = 1 - Math.pow(1 - p, 3);
    return from + (to - from) * eased;
  };

  const nameOp = lerp(0, 1, 0.18, 0.35);
  const progOp = lerp(0, 1, 0.05, 0.20);
  const containerOp = stage === 2 ? 1 - exitP : 1;

  return (
    <div
      className="intro-loader"
      aria-hidden="true"
      style={{ opacity: containerOp, pointerEvents: stage === 2 ? "none" : "auto" }}
    >
      <div className="il-stage">
        <div className="il-name" style={{ opacity: nameOp }}>
          <span className="il-name-row">{scrambled[0] || "\u00A0"}</span>
          <span className="il-name-row">{scrambled[1] || "\u00A0"}</span>
        </div>
      </div>

      <div className="il-bottom" style={{ opacity: progOp }}>
        <div className="il-prog-row">
          <span className="il-prog-label">
            {stage === 0 ? "INITIALIZING" : "READY"}
          </span>
          <div className="il-prog-ticks">
            {Array.from({ length: 40 }).map((_, i) => (
              <span key={i} className={i < Math.floor(pct / 2.5) ? "on" : ""} />
            ))}
          </div>
          <span className="il-prog-pct">
            {String(pct).padStart(3, "0")}
            <span className="il-prog-sym">%</span>
          </span>
        </div>
      </div>
    </div>
  );
}

// ----- App -----
export default function App() {
  const [state, setState] = useState<TweakState>({
    layout: "a",
    accent: "blue",
    inverted: false,
    cursor: false,
  });
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const [booted, setBooted] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "t" || e.key === "T") setTweaksOpen(v => !v);
      if (e.key === "1") setState(s => ({ ...s, layout: "a" }));
      if (e.key === "2") setState(s => ({ ...s, layout: "b" }));
      if (e.key === "3") setState(s => ({ ...s, layout: "c" }));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Called when intro begins its exit fade — start revealing the layout underneath
  const handleExitStart = () => setBooted(true);
  // Called when intro fully gone — unmount the overlay
  const handleIntroDone = () => setIntroDone(true);

  const rootClass = [
    "root",
    `accent-${state.accent}`,
    state.inverted ? "inverted" : "",
    booted ? "booted" : "",
  ].filter(Boolean).join(" ");

  return (
    <div className={rootClass}>
      {!introDone && <IntroLoader onExitStart={handleExitStart} onDone={handleIntroDone} />}
      {state.cursor && <CustomCursor />}
      {state.layout === "a" && (
        <LayoutA
          inverted={state.inverted}
          onToggleInverted={() => setState(s => ({ ...s, inverted: !s.inverted }))}
          accent={state.accent}
          onSetAccent={a => setState(s => ({ ...s, accent: a }))}
        />
      )}
      {state.layout === "b" && <LayoutB inverted={state.inverted} onToggleInverted={() => setState(s => ({ ...s, inverted: !s.inverted }))} />}
      {state.layout === "c" && <LayoutC inverted={state.inverted} onToggleInverted={() => setState(s => ({ ...s, inverted: !s.inverted }))} />}
      <TweaksPanel open={tweaksOpen} state={state} setState={setState} />
    </div>
  );
}
