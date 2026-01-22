import { useState, useEffect, useRef } from "react";

const TRAIL_LENGTH = 8;
const GLOW_COUNT = 4;

const createTrail = (x, y) =>
  Array.from({ length: GLOW_COUNT }, () =>
    Array.from({ length: TRAIL_LENGTH }, () => ({ x, y }))
  );

const createVelocities = () =>
  Array.from({ length: GLOW_COUNT }, () =>
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: 0, y: 0 }))
  );

export default function Hero({ name }) {
  const heroRef = useRef(null);
  const [glowTrails, setGlowTrails] = useState(() => createTrail(0, 0));
  const [isHovering, setIsHovering] = useState(false);
  const positionsRef = useRef(glowTrails);
  const velocitiesRef = useRef(createVelocities());
  const targetsRef = useRef(
    Array.from({ length: GLOW_COUNT }, () => ({ x: 0, y: 0 }))
  );
  const frameRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const rect = hero.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    positionsRef.current = createTrail(centerX, centerY);
    targetsRef.current = Array.from({ length: GLOW_COUNT }, () => ({
      x: centerX,
      y: centerY
    }));
    setGlowTrails(
      positionsRef.current.map((trail) => trail.map((pos) => ({ ...pos })))
    );

    const handleMouseMove = (e) => {
      const bounds = hero.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;
      const cx = bounds.width / 2;
      const cy = bounds.height / 2;
      const dx = x - cx;
      const dy = y - cy;

      targetsRef.current = [
        { x, y },
        { x: cx - dx, y: cy + dy },
        { x: cx + dx, y: cy - dy },
        { x: cx - dx, y: cy - dy }
      ];
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    hero.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseenter", handleMouseEnter);
    hero.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      const positions = positionsRef.current;
      const velocities = velocitiesRef.current;
      const targets = targetsRef.current;
      const stiffness = 0.12;
      const damping = 0.78;

      for (let t = 0; t < positions.length; t += 1) {
        for (let i = 0; i < positions[t].length; i += 1) {
          const goal = i === 0 ? targets[t] : positions[t][i - 1];
          const pos = positions[t][i];
          const vel = velocities[t][i];

          vel.x = (vel.x + (goal.x - pos.x) * stiffness) * damping;
          vel.y = (vel.y + (goal.y - pos.y) * stiffness) * damping;
          pos.x += vel.x;
          pos.y += vel.y;
        }
      }

      setGlowTrails(
        positions.map((trail) => trail.map((pos) => ({ ...pos })))
      );
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseenter", handleMouseEnter);
      hero.removeEventListener("mouseleave", handleMouseLeave);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="hero-fullscreen" ref={heroRef}>
      <div className="hero-noise"></div>
      <div className="hero-gradient"></div>

      {glowTrails.map((trail, trailIndex) =>
        trail.map((pos, index) => {
          const depth = 1 - index / (trail.length + 1);
          const opacity =
            (trailIndex === 0 ? 0.7 : 0.42) * depth * (isHovering ? 1 : 0);
          const scale = 0.7 + depth * 0.6;
          const className =
            trailIndex === 0
              ? "hero-mouse-glow"
              : trailIndex === 1 || trailIndex === 2
                ? "hero-mouse-glow hero-mouse-glow--alt hero-mouse-glow--ghost"
                : "hero-mouse-glow hero-mouse-glow--ghost";

          return (
            <div
              key={`glow-${trailIndex}-${index}`}
              className={className}
              style={{
                left: pos.x,
                top: pos.y,
                opacity,
                transform: `translate(-50%, -50%) scale(${scale})`
              }}
            />
          );
        })
      )}

      <div className="hero-content">
        <p className="hero-greeting">Olá, eu sou</p>
        <h1 className="hero-name">{name}</h1>
      </div>

      <button className="hero-scroll" onClick={scrollToContent} aria-label="Rolar para baixo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6"/>
        </svg>
        <span>Rolar</span>
      </button>
    </section>
  );
}
