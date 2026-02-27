// Handle mobile navigation toggle
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav__link");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("nav--open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("nav--open");
    });
  });
}

// Highlight active nav link based on scroll position
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY + 120;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    const isInView = scrollPosition >= top && scrollPosition < top + height;

    navLinks.forEach((link) => {
      if (link.getAttribute("href") === `#${id}`) {
        link.classList.toggle("active", isInView);
      }
    });
  });
});

// Simple scroll reveal effect using IntersectionObserver
const revealElements = document.querySelectorAll(
  ".section__header, .about__card, .skills__group, .project-card, .contact__info, .contact__form, .hero__content, .hero__card, .stat"
);

revealElements.forEach((el) => el.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal--visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealElements.forEach((el) => observer.observe(el));

// Typewriter effect for hero subtitle
const typedTextSpan = document.getElementById("typedText");
const typePhrases = [
  "Building innovative solutions with code.",
  "Hackathon-ready problem solver.",
  "Turning ideas into real products.",
  "Always learning. Always shipping."
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  if (!typedTextSpan) return;

  const current = typePhrases[phraseIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typedTextSpan.textContent = current.substring(0, charIndex);

  let delay = 80;

  if (!isDeleting && charIndex === current.length) {
    delay = 1500;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % typePhrases.length;
    delay = 300;
  }

  setTimeout(typeLoop, delay);
}

if (typedTextSpan) {
  typeLoop();
}

// Stats counter animation when stats come into view
const statNumbers = document.querySelectorAll(".stat__number");

if (statNumbers.length) {
  const statsObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute("data-target") || "0", 10);
          let current = 0;
          const increment = Math.max(1, Math.floor(target / 80));

          const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
              el.textContent = target;
              clearInterval(counter);
            } else {
              el.textContent = current;
            }
          }, 20);

          obs.unobserve(el);
        }
      });
    },
    { threshold: 0.4 }
  );

  statNumbers.forEach((el) => statsObserver.observe(el));
}

// Theme toggle (light / dark) with localStorage
const themeToggle = document.getElementById("themeToggle");
const prefersDark = window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const storedTheme = localStorage.getItem("theme");
if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
  document.body.dataset.theme = "dark";
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = document.body.dataset.theme === "dark";
    if (isDark) {
      document.body.dataset.theme = "light";
      localStorage.setItem("theme", "light");
    } else {
      document.body.dataset.theme = "dark";
      localStorage.setItem("theme", "dark");
    }
  });
}

// Scroll-to-top button behavior
const scrollTopBtn = document.getElementById("scrollTopBtn");

if (scrollTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add("scroll-top--visible");
    } else {
      scrollTopBtn.classList.remove("scroll-top--visible");
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Contact form front-end handler
const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");

if (contactForm && formFeedback) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formFeedback.textContent =
      "Thank you for reaching out! I will get back to you soon.";
    formFeedback.style.color = "#16a34a";
    contactForm.reset();
    setTimeout(() => {
      formFeedback.textContent = "";
    }, 5000);
  });
}

// Set current year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

