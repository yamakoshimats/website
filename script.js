const projects = [
  {
    title: "Portfolio Website",
    description: "A responsive portfolio site with dynamic filtering and dark mode support.",
    tags: ["Web", "JavaScript", "CSS"],
    github: "https://github.com/your-github/portfolio",
    live: "https://yourname.dev"
  },
  {
    title: "Task Tracker App",
    description: "A productivity app for organizing tasks with status and deadline tracking.",
    tags: ["Web", "JavaScript"],
    github: "https://github.com/your-github/task-tracker",
    live: ""
  },
  {
    title: "Data Analysis Notebook",
    description: "A Python-based project exploring and visualizing real-world data.",
    tags: ["Python", "Data"],
    github: "https://github.com/your-github/data-analysis-notebook",
    live: ""
  },
  {
    title: "ML Classification Project",
    description: "A machine learning workflow for training and evaluating classification models.",
    tags: ["Python", "ML"],
    github: "https://github.com/your-github/ml-classifier",
    live: ""
  }
];

const projectsGrid = document.querySelector("#projects-grid");
const projectFilters = document.querySelector("#project-filters");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#site-nav");
const themeToggle = document.querySelector("#theme-toggle");
const cvToggle = document.querySelector("#cv-toggle");
const cvDetails = document.querySelector("#cv-details");
const year = document.querySelector("#year");

function renderProjects(filter = "All") {
  const filtered = filter === "All"
    ? projects
    : projects.filter((project) => project.tags.includes(filter));

  projectsGrid.innerHTML = filtered.map((project) => {
    const tags = project.tags.map((tag) => `<span>${tag}</span>`).join("");
    const liveLink = project.live
      ? `<a class="btn btn-secondary" href="${project.live}" target="_blank" rel="noopener noreferrer">Live Demo</a>`
      : "";

    return `
      <article class="project-card reveal visible">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tags">${tags}</div>
        <div class="project-links">
          <a class="btn btn-secondary" href="${project.github}" target="_blank" rel="noopener noreferrer">GitHub</a>
          ${liveLink}
        </div>
      </article>
    `;
  }).join("");
}

function renderFilters() {
  const tags = ["All", ...new Set(projects.flatMap((project) => project.tags))];
  projectFilters.innerHTML = tags.map((tag, index) => `
    <button class="btn filter-btn ${index === 0 ? "active" : ""}" type="button" data-filter="${tag}">
      ${tag}
    </button>
  `).join("");

  projectFilters.addEventListener("click", (event) => {
    const target = event.target.closest(".filter-btn");
    if (!target) {
      return;
    }
    const filter = target.dataset.filter;
    document.querySelectorAll(".filter-btn").forEach((button) => {
      button.classList.toggle("active", button === target);
    });
    renderProjects(filter);
  });
}

function setupThemeToggle() {
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }
  themeToggle.textContent = document.body.classList.contains("dark") ? "Light mode" : "Dark mode";

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
    themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
  });
}

function setupMobileNav() {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") {
        return;
      }

      // Ensure "Back to top" always reaches the real document top.
      if (targetId === "#top") {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const targetElement = document.querySelector(targetId);
      if (!targetElement) {
        return;
      }
      event.preventDefault();
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function setupCvToggle() {
  cvToggle.addEventListener("click", () => {
    const isExpanded = cvToggle.getAttribute("aria-expanded") === "true";
    cvToggle.setAttribute("aria-expanded", String(!isExpanded));
    cvDetails.hidden = isExpanded;
    cvToggle.textContent = isExpanded ? "Show more" : "Show less";
  });
}

function setupRevealOnScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".reveal").forEach((section) => observer.observe(section));
}

function setCurrentYear() {
  year.textContent = String(new Date().getFullYear());
}

function init() {
  renderFilters();
  renderProjects();
  setupThemeToggle();
  setupMobileNav();
  setupSmoothScroll();
  setupCvToggle();
  setupRevealOnScroll();
  setCurrentYear();
}

init();
