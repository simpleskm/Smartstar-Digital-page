// script.js

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     1. Smooth Scroll
  ========================= */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const targetId = link.getAttribute("href");
      if (targetId.length > 1) {
        e.preventDefault();
        document.querySelector(targetId)?.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });

  /* =========================
     2. Fade-in Animations
  ========================= */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll("section, article, aside").forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
  });

  /* =========================
     3. Active Nav Highlight
  ========================= */
  const sections = document.querySelectorAll("main section");
  const navLinks = document.querySelectorAll("nav ul li a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (scrollY >= top) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  /* =========================
     4. Live Search Filter
  ========================= */
  const searchInput = document.querySelector("#q");
  const searchable = document.querySelectorAll("main section, article, aside");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    searchable.forEach(el => {
      const text = el.innerText.toLowerCase();
      el.style.display = text.includes(query) ? "block" : "none";
    });
  });

  /* =========================
     5. Form Validation
  ========================= */
  const searchForm = document.querySelector('form[role="search"]');

  searchForm.addEventListener("submit", e => {
    const input = searchInput.value.trim();

    if (input === "") {
      e.preventDefault();
      alert("Please enter a search term.");
      searchInput.focus();
    } else if (input.length < 2) {
      e.preventDefault();
      alert("Search term must be at least 2 characters.");
    }
  });

  /* =========================
     6. Back-to-Top Button
  ========================= */
  const btn = document.createElement("button");
  btn.textContent = "↑ Top";
  btn.classList.add("back-to-top");
  document.body.appendChild(btn);

  window.addEventListener("scroll", () => {
    btn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

});
