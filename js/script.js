const header = document.querySelector(".site-header");
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const revealElements = document.querySelectorAll(".reveal");
const yearEl = document.getElementById("year");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

function onScroll() {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 20);
}

onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 },
);

revealElements.forEach((el) => observer.observe(el));

// Timeline Accordion
const timelineTriggers = document.querySelectorAll(".timeline-trigger");

if (timelineTriggers.length > 0) {
  timelineTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const step = trigger.closest(".timeline-step");
      const isActive = step.classList.contains("active");

      // Close all other steps for accordion behavior
      document.querySelectorAll(".timeline-step").forEach((s) => {
        s.classList.remove("active");
        const btn = s.querySelector(".timeline-trigger");
        if (btn) btn.setAttribute("aria-expanded", "false");
      });

      // Toggle current step
      if (!isActive) {
        step.classList.add("active");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });
}
