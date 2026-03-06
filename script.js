document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     1) Mobile Navigation + Dropdown (Accessible)
  ============================================================ */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdown = dropdownToggle ? dropdownToggle.closest('.dropdown') : null;

  function closeMenu() {
    if (!navLinks || !navToggle) return;
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
    if (dropdown) {
      dropdown.classList.remove('open');
      dropdownToggle.setAttribute('aria-expanded', 'false');
    }
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');

      // Close dropdown when toggling
      if (!open && dropdown) {
        dropdown.classList.remove('open');
        dropdownToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Dropdown on mobile
  if (dropdownToggle && dropdown) {
    dropdownToggle.addEventListener('click', (e) => {
      // Mobile behavior
      if (window.innerWidth <= 899) {
        e.preventDefault();
		e.stopPropagation();
        const open = dropdown.classList.toggle('open');
        dropdownToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      }
    });
  }

  // Close menus when clicking outside
  document.addEventListener('click', (e) => {
    const clickedInsideNav = e.target.closest('.site-header');
    if (!clickedInsideNav) closeMenu();
  });

  // Close on nav link click (mobile)
  document.querySelectorAll('.nav-links a:not(.dropdown-toggle)').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 899) closeMenu();
    });
  });

  // Escape closes menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  /* ============================================================
     2) Scroll Reveal
  ============================================================ */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => io.observe(el));
  
const textElement = document.getElementById("typing-text");
const phrases = [
  "Empowering businesses with a unified foundation for governance and operational success.",
  "Partnering with businesses to build resilient and accountable operational systems.",
  "Helping businesses achieve clarity, control, and performance through modern governance and management frameworks."
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 60;
let hasStarted = false; // Prevents re-triggering

function type() {
  const currentPhrase = phrases[phraseIndex];
  
  if (isDeleting) {
    textElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 30; 
  } else {
    textElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 60;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    typeSpeed = 2000; 
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeSpeed = 500; 
  }

  setTimeout(type, typeSpeed);
}

// Only start typing when the "reveal" div is visible
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !hasStarted) {
      hasStarted = true;
      type(); // Start the typing function
    }
  });
}, { threshold: 0.5 }); // Trigger when 50% of the element is visible

const typingContainer = document.querySelector(".typing-container");

if (textElement && typingContainer) {
  observer.observe(typingContainer);
}

  /* ============================================================
     3) Counters (Hero metrics)
  ============================================================ */
  const counterEls = document.querySelectorAll('[data-counter]');
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-counter') || '0', 10);
      let current = 0;
      const duration = 800; // ms
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        current = Math.floor(progress * target);
        el.textContent = String(current);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = String(target);
      }

      requestAnimationFrame(tick);
      counterIO.unobserve(el);
    });
  }, { threshold: 0.6 });

  counterEls.forEach(el => counterIO.observe(el));

  /* ============================================================
     4) Modals (Accessible-ish focus management)
  ============================================================ */
  let lastFocus = null;

  function openModal(modal) {
    if (!modal) return;
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';

    const closeBtn = modal.querySelector('.close');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = '';

    if (lastFocus && typeof lastFocus.focus === 'function') {
      lastFocus.focus();
    }
    lastFocus = null;
  }

  // Open triggers (buttons/tiles)
  document.querySelectorAll('[data-modal]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const id = trigger.getAttribute('data-modal');
      const modal = document.getElementById(id);
      openModal(modal);
    });
  });

  // Close buttons
  document.querySelectorAll('.modal .close').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      closeModal(modal);
    });
  });

  // Click on backdrop closes
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  // Escape closes active modal
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const open = document.querySelector('.modal:not([hidden])');
    if (open) closeModal(open);
  });

  /* ============================================================
     5) FAQ Accordion
  ============================================================ */
  document.querySelectorAll('[data-accordion]').forEach(acc => {
    acc.querySelectorAll('.faq-q').forEach(btn => {
      btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        // Close all
        acc.querySelectorAll('.faq-q').forEach(b => b.setAttribute('aria-expanded', 'false'));
        acc.querySelectorAll('.faq-a').forEach(a => a.hidden = true);

        // Open this one if it was closed
        const next = btn.nextElementSibling;
        if (!expanded && next && next.classList.contains('faq-a')) {
          btn.setAttribute('aria-expanded', 'true');
          next.hidden = false;
        }
      });
    });
  });

  /* ============================================================
     6) Contact Form (Static Validation)
  ============================================================ */
  const form = document.getElementById('contactForm');
  if (form) {
    const message = document.getElementById('formMessage');

    function setError(fieldId, text) {
      const el = document.querySelector(`[data-error-for="${fieldId}"]`);
      if (el) el.textContent = text || '';
    }

    function validate() {
      let ok = true;

      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const msg = form.querySelector('#message');

      setError('name', '');
      setError('email', '');
      setError('message', '');

      if (!name.value.trim() || name.value.trim().length < 2) {
        setError('name', 'Please enter your full name.');
        ok = false;
      }

      const emailVal = email.value.trim();
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
      if (!emailOk) {
        setError('email', 'Please enter a valid email address.');
        ok = false;
      }

      if (!msg.value.trim() || msg.value.trim().length < 10) {
        setError('message', 'Please provide a brief message (at least 10 characters).');
        ok = false;
      }

      return ok;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate()) {
        if (message) {
          message.textContent = 'Please correct the highlighted fields and try again.';
          message.style.color = '#b42318';
        }
        return;
      }

      if (message) {
        message.textContent = 'Thank you! Your message has been received (template mode).';
        message.style.color = '#273153';
      }
      form.reset();
    });
  }

  /* ============================================================
     7) Footer Year
  ============================================================ */
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
