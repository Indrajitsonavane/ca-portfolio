/* ============================================================
   CA PORTFOLIO SITE — MAIN JAVASCRIPT
   Features:
   - Sticky navbar on scroll
   - Mobile hamburger/drawer
   - Scroll reveal animations
   - Scroll-to-top button
   - Contact form handler (configure endpoint below)
   - Active nav link highlighting
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Navbar scroll effect ---- */
  const navbar = document.getElementById('navbar');
  function handleScroll() {
    if (window.scrollY > 60) {
      navbar && navbar.classList.add('scrolled');
    } else {
      navbar && navbar.classList.remove('scrolled');
    }
    // Scroll-to-top button visibility
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run once on load


  /* ---- Mobile Hamburger / Drawer ---- */
  const hamburger    = document.getElementById('hamburger');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerClose  = document.getElementById('drawer-close');

  function openDrawer() {
    mobileDrawer && mobileDrawer.classList.add('open');
    hamburger    && hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    mobileDrawer && mobileDrawer.classList.remove('open');
    hamburger    && hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger   && hamburger.addEventListener('click', openDrawer);
  drawerClose && drawerClose.addEventListener('click', closeDrawer);

  // Close drawer when a link inside is clicked
  document.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });


  /* ---- Scroll to Top ---- */
  const scrollTopBtn = document.getElementById('scroll-top');
  scrollTopBtn && scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ---- Scroll Reveal Animation ---- */
  const revealEls = document.querySelectorAll('.reveal');
  const observer  = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => observer.observe(el));


  /* ---- Active Nav Link (single-page) ---- */
  // Highlights the correct nav link based on scroll position
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a[href^="#"]');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => sectionObserver.observe(s));


  /* ---- Contact Form Handler ----
     CHANGE: Replace the fetch URL with your actual endpoint.
     Options:
       1. Formspree:   https://formspree.io/f/YOUR_FORM_ID
       2. Web3Forms:   https://api.web3forms.com/submit
       3. Your own API endpoint
  ---- */
  const contactForm = document.getElementById('contact-form');
  const formStatus  = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.disabled    = true;
      btn.textContent = 'Sending…';

      const data = Object.fromEntries(new FormData(contactForm));

      try {
        /* CHANGE: Replace URL with your form endpoint */
        /* Example with Formspree:
           const res = await fetch('https://formspree.io/f/YOUR_ID', {
             method: 'POST',
             headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
             body: JSON.stringify(data)
           });
        */

        // ---- Simulated success for demo ----
        await new Promise(r => setTimeout(r, 1200));
        const res = { ok: true };
        // ---- End simulation ----

        if (res.ok) {
          formStatus.textContent = '✓ Message sent! We will get back to you shortly.';
          formStatus.className   = 'form-status success';
          contactForm.reset();
        } else {
          throw new Error('Server error');
        }
      } catch (err) {
        formStatus.textContent = '✗ Something went wrong. Please call us directly.';
        formStatus.className   = 'form-status error';
      } finally {
        btn.disabled    = false;
        btn.innerHTML   = 'Send Message <i class="fas fa-paper-plane"></i>';
      }
    });
  }


  /* ---- Animated Number Counters ---- */
  // Runs once when the stats section scrolls into view
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    let current  = 0;
    const step   = Math.ceil(target / 50);
    const timer  = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current + suffix;
    }, 30);
  }

  const counterEls = document.querySelectorAll('[data-target]');
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = '1';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counterEls.forEach(el => counterObs.observe(el));

});
