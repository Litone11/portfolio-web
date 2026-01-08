export default function AboutSection({ bio }) {
  return (
    <section className="section about" id="about">
      <div className="section__header">
        <p className="eyebrow">Sobre</p>
        <h2>Quem sou e como posso ajudar</h2>
        <p className="muted">{bio}</p>
      </div>
    </section>
  );
}
