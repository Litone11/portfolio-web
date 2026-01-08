export default function ProcessSection() {
  const steps = [
    {
      title: "Descoberta & alinhamento",
      text: "Mapeio objetivos, público e métricas. Juntos escolhemos o norte.",
    },
    {
      title: "Prototipagem & iteração",
      text: "Testo cedo com protótipos navegáveis para validar direção.",
    },
    {
      title: "Entrega & evolução",
      text: "Códigos e design systems prontos para escalar, com acompanhamento após o launch.",
    },
  ];

  return (
    <section className="section">
      <div className="section__header">
        <p className="eyebrow">Processo</p>
        <h2>Ritmo claro do primeiro call ao ship</h2>
        <p className="muted">Pequenas fases que reduzem risco e aceleram entregas.</p>
      </div>

      <div className="process-grid">
        {steps.map((item) => (
          <div key={item.title} className="process-card">
            <div className="process-dot" />
            <div>
              <p className="label">{item.title}</p>
              <p className="muted">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
