document.addEventListener('DOMContentLoaded', function () {

  // 1. SMOOTH SCROLLING
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if(targetId && targetElement) {
        targetElement.scrollIntoView({behavior:'smooth'});
    }
      const navLinks = document.querySelector('.nav-links');
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }
    });
  });

  // 2. CONTACT FORM SUBMISSION
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      const formMessage = document.getElementById("formMessage");
      if(formMessage){
        formMessage.innerText = "Thank you! Your message has been received.";
        formMessage.style.color = "#273153";
      }
      contactForm.reset();
    });
  }

  // 3. MODAL LOGIC
document.querySelectorAll('.about-image-card').forEach(card => {
  card.addEventListener('click', () => {
    const modalId = card.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'flex';
      setTimeout(() => modal.classList.add('active'), 10);
    }
  });
});

// CLOSE BUTTON
document.querySelectorAll('.modal .close').forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    const modal = closeBtn.closest('.modal');
    modal.classList.remove('active');
    setTimeout(() => modal.style.display = 'none', 300);
  });
});

// CLICK OUTSIDE TO CLOSE
window.addEventListener('click', e => {
    if (e.target.classList.contains('modal')) {
      e.target.classList.remove('active');
      setTimeout(() => e.target.style.display = 'none', 300);
    }
  });

// ESC KEY TO CLOSE
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.active').forEach(modal => {
        modal.classList.remove('active');
        setTimeout(() => modal.style.display = 'none', 300);
      });
    }
  });

  // 4. SERVICES DROPDOWN (MOBILE TAP)
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        toggle.parentElement.classList.toggle('open');
      }
    });
  });

  // 5. HAMBURGER MENU
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if(hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }

  // 6. DYNAMIC FOOTER YEAR
  const currentYear = document.getElementById('current-year');
  if(currentYear) currentYear.textContent = new Date().getFullYear();
});
