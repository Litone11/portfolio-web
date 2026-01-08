export default function SkillsSection({ skills }) {
  const marqueeSkills = skills.length > 0 ? [...skills, ...skills] : [];

  return (
    <section className="section" id="skills">
      <div className="section__header">
        <p className="eyebrow">Competências</p>
        <h2>Ferramentas e linguagens que domino</h2>
        <p className="muted">Tecnologias que uso para entregar soluções robustas.</p>
      </div>

      {skills.length > 0 ? (
        <div className="skills-marquee-bleed">
          <div className="skills-marquee">
            <div className="skills-marquee__track">
              {marqueeSkills.map((skill, index) => (
                <div key={`${skill}-${index}`} className="skill-card">
                  <div className="pulse-dot" />
                  <div>
                    <p className="skill-name">{skill}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="card muted-card">
          <p className="eyebrow">Sem skills ainda</p>
          <p className="muted">Adiciona skills no documento <code>profile</code> para as mostrares aqui.</p>
        </div>
      )}
    </section>
  );
}
