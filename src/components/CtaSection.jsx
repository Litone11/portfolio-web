export default function CtaSection({ email, linkedin, github }) {
  const fallbackLink = linkedin || github || "#";
  const hasExternal = Boolean(linkedin || github);

  return (
    <section className="card cta" id="contact">
      <div>
        <p className="eyebrow">Vamos construir</p>
        <h2>Pronto para lançar algo inesquecível?</h2>
        <p className="muted">Entra em contacto e desenhamos juntos a próxima versão do teu produto.</p>
      </div>
      <div className="hero__actions">
        {email ? (
          <a className="btn primary" href={`mailto:${email}?subject=Vamos%20trabalhar%20juntos`}>
            Marcar conversa
          </a>
        ) : (
          <a className="btn ghost" href={fallbackLink} target={hasExternal ? "_blank" : undefined} rel="noreferrer">
            Vamos falar
          </a>
        )}
      </div>
    </section>
  );
}
