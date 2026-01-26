document.addEventListener('DOMContentLoaded', function () {

  /* ------------------------------------------------------------
     1. SMOOTH SCROLLING (SAFE)
  ------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');

      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }

      // Close mobile menu after click
      const navLinks = document.querySelector('.nav-links');
      if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }
    });
  });

  /* ------------------------------------------------------------
     2. CONTACT FORM (UNCHANGED)
  ------------------------------------------------------------ */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const formMessage = document.getElementById("formMessage");
      if (formMessage) {
        formMessage.innerText = "Thank you! Your message has been received.";
        formMessage.style.color = "#273153";
      }
      contactForm.reset();
    });
  }

  /* ------------------------------------------------------------
     3. MODALS (UNCHANGED)
  ------------------------------------------------------------ */
  document.querySelectorAll('.about-image-card').forEach(card => {
    card.addEventListener('click', () => {
      const modal = document.getElementById(card.dataset.modal);
      if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('active'), 10);
      }
    });
  });

  document.querySelectorAll('.modal .close').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      modal.classList.remove('active');
      setTimeout(() => modal.style.display = 'none', 300);
    });
  });

  window.addEventListener('click', e => {
    if (e.target.classList.contains('modal')) {
      e.target.classList.remove('active');
      setTimeout(() => e.target.style.display = 'none', 300);
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.active').forEach(modal => {
        modal.classList.remove('active');
        setTimeout(() => modal.style.display = 'none', 300);
      });
    }
  });

  /* ------------------------------------------------------------
     4. SERVICES DROPDOWN (FIXED FOR MOBILE)
  ------------------------------------------------------------ */
  document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();

        const parent = this.parentElement;

        // Close other open dropdowns
        document.querySelectorAll('.dropdown.open').forEach(drop => {
          if (drop !== parent) drop.classList.remove('open');
        });

        parent.classList.toggle('open');
      }
    });
  });

  /* Close dropdown when clicking outside */
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown.open').forEach(drop => {
        drop.classList.remove('open');
      });
    }
  });

  /* ------------------------------------------------------------
     5. HAMBURGER MENU (MOBILE ONLY)
  ------------------------------------------------------------ */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      navLinks.classList.toggle('active');

      // Close any open dropdowns when menu toggles
      document.querySelectorAll('.dropdown.open').forEach(drop => {
        drop.classList.remove('open');
      });
    });
  }

  /* ------------------------------------------------------------
     6. FOOTER YEAR
  ------------------------------------------------------------ */
  const currentYear = document.getElementById('current-year');
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

});
