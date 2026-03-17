
Copy

/**
 * CityByteHub — script.js
 * UI Logic, Animations, Form Validation, FAQ Accordion
 * Sikar's Premium Gaming Zone & Cyber Cafe
 *
 * WARNING: No API keys, secrets, or credentials stored here.
 * All sensitive values must be set as environment variables.
 */
 
'use strict';
 
/* ========== PARTICLE BACKGROUND ========== */
(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
 
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animFrame;
  let W, H;
 
  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
 
  function randomBetween(a, b) {
    return a + Math.random() * (b - a);
  }
 
  function createParticle() {
    return {
      x: randomBetween(0, W),
      y: randomBetween(0, H),
      vx: randomBetween(-0.3, 0.3),
      vy: randomBetween(-0.4, -0.1),
      size: randomBetween(1, 2.5),
      opacity: randomBetween(0.2, 0.7),
      color: Math.random() > 0.5 ? '0, 240, 255' : '108, 0, 255',
      life: 0,
      maxLife: randomBetween(200, 500),
    };
  }
 
  function initParticlePool() {
    particles = [];
    const count = Math.min(Math.floor(W / 8), 80);
    for (let i = 0; i < count; i++) {
      const p = createParticle();
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }
  }
 
  function drawParticle(p) {
    const progress = p.life / p.maxLife;
    const alpha = p.opacity * Math.sin(progress * Math.PI);
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.color}, ${alpha})`;
    ctx.shadowBlur = 6;
    ctx.shadowColor = `rgba(${p.color}, ${alpha * 0.5})`;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
 
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.08;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }
 
  function animate() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
 
    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      p.life++;
 
      drawParticle(p);
 
      if (p.life >= p.maxLife || p.x < 0 || p.x > W || p.y < 0) {
        particles[i] = createParticle();
      }
    });
 
    animFrame = requestAnimationFrame(animate);
  }
 
  resize();
  initParticlePool();
  animate();
 
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      initParticlePool();
    }, 200);
  });
})();
 
 
/* ========== NAVBAR — SCROLL BEHAVIOR ========== */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
 
  function handleScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
 
    // Active link highlighting
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
 
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
 
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
})();
 
 
/* ========== MOBILE HAMBURGER MENU ========== */
(function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;
 
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
 
  // Close on nav link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
 
  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
})();
 
 
/* ========== SCROLL REVEAL ANIMATION ========== */
(function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.service-card, .price-card, .why-card, .testimonial-card, .faq-item, .info-card, .team-card, .section-header'
  );
 
  // Add reveal class
  revealElements.forEach((el, i) => {
    el.classList.add('reveal');
    if (i % 3 === 1) el.classList.add('reveal-delay-1');
    if (i % 3 === 2) el.classList.add('reveal-delay-2');
  });
 
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
 
  revealElements.forEach(el => observer.observe(el));
})();
 
 
/* ========== FAQ ACCORDION ========== */
(function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
 
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!question || !answer) return;
 
    question.addEventListener('click', () => {
      const isExpanded = question.getAttribute('aria-expanded') === 'true';
 
      // Close all others
      faqItems.forEach(other => {
        const otherQ = other.querySelector('.faq-question');
        const otherA = other.querySelector('.faq-answer');
        if (otherQ && otherA && other !== item) {
          otherQ.setAttribute('aria-expanded', 'false');
          otherA.hidden = true;
        }
      });
 
      // Toggle this one
      const newExpanded = !isExpanded;
      question.setAttribute('aria-expanded', String(newExpanded));
      answer.hidden = !newExpanded;
    });
  });
})();
 
 
/* ========== FORM VALIDATION ========== */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
 
  const fields = {
    name: {
      el: document.getElementById('name'),
      errEl: document.getElementById('name-error'),
      validate(val) {
        if (!val.trim()) return 'Please enter your full name.';
        if (val.trim().length < 2) return 'Name must be at least 2 characters.';
        return '';
      }
    },
    phone: {
      el: document.getElementById('phone'),
      errEl: document.getElementById('phone-error'),
      validate(val) {
        if (!val.trim()) return 'Please enter your phone number.';
        if (!/^[6-9][0-9]{9}$/.test(val.trim())) return 'Enter a valid 10-digit Indian mobile number.';
        return '';
      }
    },
    email: {
      el: document.getElementById('email'),
      errEl: document.getElementById('email-error'),
      validate(val) {
        if (val.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())) {
          return 'Please enter a valid email address.';
        }
        return '';
      }
    },
    service: {
      el: document.getElementById('service'),
      errEl: document.getElementById('service-error'),
      validate(val) {
        if (!val) return 'Please select a service.';
        return '';
      }
    }
  };
 
  function showError(fieldKey, message) {
    const field = fields[fieldKey];
    if (!field.errEl) return;
    field.errEl.textContent = message;
    if (field.el) {
      field.el.style.borderColor = message ? '#ff4d6d' : '';
      field.el.setAttribute('aria-invalid', message ? 'true' : 'false');
    }
  }
 
  function clearError(fieldKey) {
    showError(fieldKey, '');
  }
 
  // Inline validation on blur
  Object.keys(fields).forEach(key => {
    const field = fields[key];
    if (!field.el) return;
 
    field.el.addEventListener('blur', () => {
      const err = field.validate(field.el.value);
      showError(key, err);
    });
 
    field.el.addEventListener('input', () => {
      if (field.errEl && field.errEl.textContent) {
        clearError(key);
      }
    });
  });
 
  form.addEventListener('submit', (e) => {
    e.preventDefault();
 
    let isValid = true;
 
    // Validate all fields
    Object.keys(fields).forEach(key => {
      const field = fields[key];
      if (!field.el) return;
      const err = field.validate(field.el.value);
      showError(key, err);
      if (err) isValid = false;
    });
 
    if (!isValid) return;
 
    // Simulate form submission (replace with actual backend/Firebase integration)
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const successMsg = document.getElementById('form-success');
 
    submitBtn.disabled = true;
    if (btnText) btnText.hidden = true;
    if (btnLoading) btnLoading.hidden = false;
 
    // Simulate async submission
    setTimeout(() => {
      submitBtn.disabled = false;
      if (btnText) btnText.hidden = false;
      if (btnLoading) btnLoading.hidden = true;
 
      if (successMsg) {
        successMsg.hidden = false;
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
 
      form.reset();
 
      // Auto-hide success message after 6 seconds
      setTimeout(() => {
        if (successMsg) successMsg.hidden = true;
      }, 6000);
    }, 1200);
 
    /**
     * TO INTEGRATE WITH A REAL BACKEND:
     * Replace the setTimeout above with a fetch() call to your backend or Firebase Function.
     *
     * WARNING: Also validate all inputs on backend / Firebase Functions.
     * NEVER trust frontend validation alone.
     *
     * Example:
     * const data = {
     *   name: fields.name.el.value,
     *   phone: fields.phone.el.value,
     *   email: fields.email.el.value,
     *   service: fields.service.el.value,
     *   message: document.getElementById('message').value
     * };
     * await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) });
     */
  });
})();
 
 
/* ========== STATS BAR — TICKER ANIMATION ========== */
(function initStatsTicker() {
  const statsContainer = document.querySelector('.stats-container');
  if (!statsContainer) return;
 
  // On small screens, auto-scroll the stats bar
  if (window.innerWidth < 600) {
    statsContainer.style.overflowX = 'auto';
    statsContainer.style.flexWrap = 'nowrap';
    statsContainer.style.scrollbarWidth = 'none';
    statsContainer.style.msOverflowStyle = 'none';
    statsContainer.style.webkitScrollbarDisplay = 'none';
  }
})();
 
 
/* ========== SMOOTH SCROLL FOR ANCHOR LINKS ========== */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
 
      const target = document.querySelector(targetId);
      if (!target) return;
 
      e.preventDefault();
      const navbarHeight = document.getElementById('navbar')?.offsetHeight || 70;
      const top = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
 
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
 
 
/* ========== LAZY LOADING FOR IMAGES ========== */
(function initLazyImages() {
  const images = document.querySelectorAll('img[data-src]');
  if (!images.length) return;
 
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
 
  images.forEach(img => imageObserver.observe(img));
})();
 
 
/* ========== HERO TITLE GLITCH EFFECT (Subtle) ========== */
(function initGlitchEffect() {
  const accentTitle = document.querySelector('.title-line.accent-glow');
  if (!accentTitle) return;
 
  let glitchInterval;
 
  function startGlitch() {
    let count = 0;
    const original = accentTitle.style.textShadow;
    glitchInterval = setInterval(() => {
      if (count % 2 === 0) {
        accentTitle.style.transform = `translateX(${Math.random() * 4 - 2}px)`;
        accentTitle.style.textShadow = `0 0 20px rgba(255, 0, 128, 0.8), 0 0 40px rgba(0, 240, 255, 0.3)`;
      } else {
        accentTitle.style.transform = 'translateX(0)';
        accentTitle.style.textShadow = '';
      }
      count++;
      if (count > 4) {
        clearInterval(glitchInterval);
        accentTitle.style.transform = 'translateX(0)';
        accentTitle.style.textShadow = '';
      }
    }, 80);
  }
 
  // Trigger glitch effect every ~8 seconds
  setInterval(startGlitch, 8000);
})();
