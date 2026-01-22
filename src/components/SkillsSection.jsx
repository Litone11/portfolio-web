const ClockIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </svg>
);

const FolderIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
);

const CodeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16,18 22,12 16,6"/>
    <polyline points="8,6 2,12 8,18"/>
  </svg>
);

const StarIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
  </svg>
);

const iconMap = {
  clock: ClockIcon,
  folder: FolderIcon,
  code: CodeIcon,
  star: StarIcon,
};

export default function SkillsSection({ skills, stats = [] }) {
  const marqueeSkills = skills.length > 0 ? [...skills, ...skills] : [];

  return (
    <section className="skills-section" id="skills">
      {stats.length > 0 && (
        <div className="stats-bar">
          <div className="stats-bar__inner">
            {stats.map((stat, index) => {
              const IconComponent = iconMap[stat.icon] || CodeIcon;
              return (
                <div key={index} className="stat-item">
                  <IconComponent />
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {skills.length > 0 && (
        <div className="skills-marquee-wrapper skills-marquee-bleed">
          <div className="skills-marquee">
            <div className="skills-marquee__track">
              {marqueeSkills.map((skill, index) => (
                <span key={`${skill}-${index}`} className="skill-item">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
