export default function Hero({ name, headline, bio, github, linkedin, email, primaryHref, contactHref }) {
  const accentName = name;

  const icons = [
    github
      ? {
          label: "GitHub",
          href: github,
          svg: (
            <path
              d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.93c.58.1.78-.25.78-.55v-2c-3.2.7-3.87-1.39-3.87-1.39-.53-1.35-1.3-1.7-1.3-1.7-1.07-.73.08-.72.08-.72 1.18.08 1.8 1.22 1.8 1.22 1.05 1.8 2.76 1.28 3.44.98.1-.76.41-1.28.74-1.57-2.56-.29-5.26-1.28-5.26-5.67 0-1.25.44-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.06 0 0 .97-.31 3.18 1.17a11 11 0 0 1 5.78 0c2.2-1.48 3.17-1.17 3.17-1.17.62 1.6.23 2.77.11 3.06a4.5 4.5 0 0 1 1.17 3.07c0 4.4-2.7 5.37-5.28 5.66.42.36.8 1.09.8 2.2v3.25c0 .3.2.65.79.54A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
              fill="currentColor"
            />
          ),
        }
      : null,
    linkedin
      ? {
          label: "LinkedIn",
          href: linkedin,
          svg: (
            <path
              d="M20.45 3H3.54A1.54 1.54 0 0 0 2 4.54v15.9A1.54 1.54 0 0 0 3.54 22h16.9A1.54 1.54 0 0 0 22 20.46V4.54A1.54 1.54 0 0 0 20.46 3ZM8.1 19.18H5.34V9.75H8.1Zm-1.38-11a1.58 1.58 0 1 1 0-3.17 1.58 1.58 0 0 1 0 3.17Zm12.48 11H16.4v-4.58c0-1.1-.02-2.52-1.53-2.52-1.53 0-1.77 1.2-1.77 2.44v4.66H10.3V9.75h2.64v1.29h.04a2.9 2.9 0 0 1 2.6-1.43c2.78 0 3.3 1.83 3.3 4.2Z"
              fill="currentColor"
            />
          ),
        }
      : null,
    email
      ? {
          label: "Email",
          href: `mailto:${email}`,
          svg: (
            <>
              <path
                d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="m4 7 7.34 4.4a1.5 1.5 0 0 0 1.32 0L20 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          ),
        }
      : null,
  ].filter(Boolean);

  return (
    <header className="hero" id="top">
      <h1>
        <span className="light">Olá, sou</span> <span className="accent">{accentName}</span>
      </h1>
      <p className="headline">{headline}</p>
      <p className="lead">{bio}</p>

      {icons.length > 0 && (
        <div className="hero__icons">
          {icons.map((icon) => (
            <a key={icon.label} className="icon-btn" href={icon.href} target="_blank" rel="noreferrer" aria-label={icon.label}>
              <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
                {icon.svg}
              </svg>
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
