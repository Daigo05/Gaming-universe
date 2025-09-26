// Year in footer
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Explore button scroll
  const btn = document.getElementById('exploreBtn');
  if (btn) {
    btn.addEventListener('click', () => {
      const target = document.getElementById('games');
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // Auto-fill game cover images: try local first, then fallback
  const coverImgs = Array.from(document.querySelectorAll('img[data-local][data-fallback]'));
  coverImgs.forEach(img => {
    const local = img.getAttribute('data-local');
    const fallback = img.getAttribute('data-fallback');

    // If current src isn't local, set it
    if (local && img.getAttribute('src') !== local) {
      img.setAttribute('src', local);
    }

    // On error, switch to fallback once
    const onErr = () => {
      if (fallback && img.getAttribute('src') !== fallback) {
        img.setAttribute('src', fallback);
      }
      img.removeEventListener('error', onErr);
    };
    img.addEventListener('error', onErr, { once: true });
  });

  // Active link highlight on scroll
  const sections = Array.from(document.querySelectorAll('section, header.hero'));
  const links = Array.from(document.querySelectorAll('nav ul li a'));

  const setActive = (id) => {
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        if (id) setActive(id);
      }
    });
  }, { root: null, rootMargin: '0px', threshold: 0.6 });

  sections.forEach(sec => observer.observe(sec));

  // Navbar style on scroll
  const navbar = document.getElementById('navbar');
  const toggleNav = () => {
    if (!navbar) return;
    const scrolled = window.scrollY > 10;
    navbar.classList.toggle('scrolled', scrolled);
  };
  toggleNav();
  window.addEventListener('scroll', toggleNav, { passive: true });
});
