(() => {
  const SELECTOR = "[data-reveal]";
  const READY_CLASS = "is-revealed";

  const CSS = `
[data-reveal] {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.55s ease, transform 0.55s ease;
}
[data-reveal].is-revealed {
  opacity: 1;
  transform: none;
}
[data-reveal][data-reveal-delay="1"] { transition-delay: 80ms; }
[data-reveal][data-reveal-delay="2"] { transition-delay: 160ms; }
[data-reveal][data-reveal-delay="3"] { transition-delay: 240ms; }
[data-reveal][data-reveal-delay="4"] { transition-delay: 320ms; }
`;

  const style = document.createElement("style");
  style.textContent = CSS;
  document.head.appendChild(style);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(READY_CLASS);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  function observe() {
    document.querySelectorAll(`${SELECTOR}:not(.${READY_CLASS})`).forEach((el) => {
      observer.observe(el);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", observe);
  } else {
    observe();
  }
})();
