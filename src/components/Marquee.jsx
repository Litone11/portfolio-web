export default function Marquee({ techTags }) {
  if (!techTags || techTags.length === 0) return null;

  const doubled = techTags.concat(techTags);

  return (
    <div className="marquee">
      <div className="marquee__track">
        {doubled.map((tag, idx) => (
          <span key={tag + idx} className="marquee__item">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
