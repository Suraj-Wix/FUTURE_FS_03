// ===============================
// DOM READY
// ===============================
document.addEventListener("DOMContentLoaded", function () {

  const header = document.querySelector(".header");
  const navLinks = document.querySelector("#navLinks");
  const hamburger = document.querySelector("#hamburger");
  const navItems = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section");

  // ===============================
  // STICKY NAVBAR
  // ===============================
  window.addEventListener("scroll", function () {
    if (window.scrollY > 80) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }

    highlightActiveLink();
  });

  // ===============================
  // MOBILE MENU TOGGLE
  // ===============================
  hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    hamburger.querySelector("i").classList.toggle("fa-bars");
    hamburger.querySelector("i").classList.toggle("fa-times");
  });

  // Close menu when link clicked
  navItems.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.querySelector("i").classList.add("fa-bars");
      hamburger.querySelector("i").classList.remove("fa-times");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      navLinks.classList.remove("active");
      hamburger.querySelector("i").classList.add("fa-bars");
      hamburger.querySelector("i").classList.remove("fa-times");
    }
  });

  // ===============================
  // SMOOTH SCROLL
  // ===============================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute("href"));
      if (!target) return;

      const headerOffset = header.offsetHeight;
      const elementPosition = target.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    });
  });

  // ===============================
  // ACTIVE LINK HIGHLIGHT ON SCROLL
  // ===============================
  function highlightActiveLink() {
    let scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
      if (
        scrollPosition >= section.offsetTop &&
        scrollPosition < section.offsetTop + section.offsetHeight
      ) {
        navItems.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + section.getAttribute("id")) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  // ===============================
  // SCROLL REVEAL ANIMATION
  // ===============================
  const revealElements = document.querySelectorAll(
    ".reveal-left, .reveal-right, .reveal-up, .menu-item, .feature-item, .testimonial-card, .gallery-item, .contact-form-wrapper, .contact-info"
  );

  const observer = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  revealElements.forEach(el => {
    observer.observe(el);
  });

});