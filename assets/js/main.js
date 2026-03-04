// UMRI — Main JavaScript

document.addEventListener('DOMContentLoaded', () => {

  // --- Sticky Navigation Shadow ---
  const nav = document.querySelector('.nav-container');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  // --- Mobile Menu ---
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  function toggleMobileMenu() {
    hamburger?.classList.toggle('active');
    mobileMenu?.classList.toggle('open');
    mobileOverlay?.classList.toggle('open');
    document.body.style.overflow = mobileMenu?.classList.contains('open') ? 'hidden' : '';
  }

  hamburger?.addEventListener('click', toggleMobileMenu);
  mobileOverlay?.addEventListener('click', toggleMobileMenu);

  document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
    link.addEventListener('click', toggleMobileMenu);
  });

  // --- Accordion ---
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const content = item.querySelector('.accordion-content');
      const isActive = item.classList.contains('active');

      // Close all others in the same group
      const group = item.closest('.accordion-group');
      if (group) {
        group.querySelectorAll('.accordion-item.active').forEach(active => {
          active.classList.remove('active');
          active.querySelector('.accordion-content').style.maxHeight = '0';
        });
      }

      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // --- Tabs ---
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.tab-group');
      const target = btn.dataset.tab;

      group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      group.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      group.querySelector(`[data-tab-content="${target}"]`)?.classList.add('active');
    });
  });

  // --- Scroll Reveal ---
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in-up, .animate-draw-line, .animate-title, .animate-subtitle, .animate-indicator-left, .animate-divider, .animate-indicator-right, .slide-in-left, .slide-in-right, .masjid-card').forEach(el => observer.observe(el));

  // --- Active Nav Link ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // --- WhatsApp Form ---
  const waForm = document.querySelector('.wa-form');
  if (waForm) {
    waForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(waForm);
      let message = 'Assalamualaikum, saya ingin merencanakan umrah mandiri.\n\n';

      for (const [key, value] of formData.entries()) {
        if (value.trim()) {
          message += `*${key}:* ${value}\n`;
        }
      }

      const waNumber = '6281234567890'; // Replace with actual number
      const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');
    });
  }

});
