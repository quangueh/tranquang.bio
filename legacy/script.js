// Năm hiện tại ở footer
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Theme toggle (nhớ lựa chọn qua localStorage) ----------
const root = document.documentElement;
const toggle = document.getElementById("themeToggle");

const saved = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
root.setAttribute("data-theme", saved || (prefersDark ? "dark" : "light"));

toggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

// ---------- Reveal on scroll ----------
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
