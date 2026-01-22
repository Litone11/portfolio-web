export default function AboutSection({ bio, headline }) {
  return (
    <section className="section about" id="about-section">
      <div className="section__header">
        <p className="eyebrow">Sobre mim</p>
        <h2>{headline || "Quem sou e como posso ajudar"}</h2>
        <p className="muted">{bio}</p>
      </div>
    </section>
  );
}
