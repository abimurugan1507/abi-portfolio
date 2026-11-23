const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

const themeButton = document.querySelector(".theme-toggle");

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeButton.textContent = document.body.classList.contains("dark") ? "☾" : "☼";
});

document.getElementById("year").textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav-links a")];

const activeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link =>
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        )
      );
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach(section => activeObserver.observe(section));

// Custom arrow cursor — visible in screen recordings on desktop.
// Sparkle + Glow Cursor

const sparkleCursor = document.querySelector(".sparkle-cursor");

if (
  sparkleCursor &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches
) {
  document.body.classList.add("sparkle-active");

  window.addEventListener("pointermove", (event) => {
    sparkleCursor.style.left = `${event.clientX}px`;
    sparkleCursor.style.top = `${event.clientY}px`;
  });

  document.querySelectorAll("a, button").forEach((element) => {
    element.addEventListener("pointerenter", () => {
      document.body.classList.add("sparkle-hover");
    });

    element.addEventListener("pointerleave", () => {
      document.body.classList.remove("sparkle-hover");
    });
  });
}