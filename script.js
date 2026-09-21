/**
 * Ayush Gupta - Senior Engineering Portfolio
 * Interactive Architecture & UI Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Year
  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile Navigation Toggle
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen.toString());
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Scroll Spy for Active Navigation Link
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const onScroll = () => {
    const scrollPos = window.scrollY + 140;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  // 4. Typewriter Effect
  const phrases = [
    'Full-Stack Architecture',
    'Distributed Systems & Microservices',
    'Agentic AI & Enterprise RAG',
    'Spring Boot & React Engineering',
    'High-Throughput C-DAC Platforms'
  ];

  const typewriterEl = document.getElementById('typewriter-text');
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function typeCycle() {
    if (!typewriterEl) return;
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 35;
    } else {
      typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typeSpeed = 2200;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 350;
    }

    setTimeout(typeCycle, typeSpeed);
  }

  setTimeout(typeCycle, 600);

  // 5. Animated Number Counters
  const countElements = document.querySelectorAll('.metric-number[data-target]');
  let hasAnimatedCount = false;

  const animateCounters = () => {
    countElements.forEach(el => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const duration = 1600;
      const stepTime = 25;
      const totalSteps = duration / stepTime;
      const increment = target / totalSteps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          el.textContent = target;
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(current);
        }
      }, stepTime);
    });
  };

  const metricsSection = document.querySelector('.metrics-section');
  if (metricsSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimatedCount) {
          hasAnimatedCount = true;
          animateCounters();
        }
      });
    }, { threshold: 0.25 });
    observer.observe(metricsSection);
  } else {
    animateCounters();
  }

  // 6. Interactive Architecture Terminal Live Simulation
  const streamMsgEl = document.getElementById('terminal-stream-msg');
  const terminalMessages = [
    'Spring Cloud Gateway: Routing traffic to 8 cluster nodes...',
    'Kafka Consumer: Processed 4,200 batch attendance events...',
    'RAG Vector Search: Similarity score 0.94 | Chunk latency 18ms...',
    'JWT RBAC: Enforcing multi-tier role authorization...',
    'PostgreSQL Connection Pool: 98% idle, zero connection wait...',
    'Cluster Health Check: All 8 microservices responding (p99: 14ms)...'
  ];
  let termMsgIdx = 0;

  if (streamMsgEl) {
    setInterval(() => {
      termMsgIdx = (termMsgIdx + 1) % terminalMessages.length;
      streamMsgEl.textContent = terminalMessages[termMsgIdx];
    }, 3200);
  }

  // 7. Ambient Mouse Spotlight Effect on Cards
  const spotlightCards = document.querySelectorAll('.spotlight-card');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 8. Interactive Skills Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 30);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // 9. Image Lightbox Modal
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');
  const zoomBtns = document.querySelectorAll('.zoom-btn');

  function openLightbox(src, title) {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = src;
    if (lightboxTitle) lightboxTitle.textContent = title;
    lightboxModal.classList.add('open');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('open');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  zoomBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const imgPath = btn.getAttribute('data-img');
      const title = btn.getAttribute('data-title') || 'System Preview';
      openLightbox(imgPath, title);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('open')) {
      closeLightbox();
    }
  });

  // 10. Copy Email with Toast Feedback
  const copyBtn = document.getElementById('btn-copy-email');
  const copyStatus = document.getElementById('copy-status');
  const toast = document.getElementById('toast');

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = 'ayush12gp@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        if (copyStatus) copyStatus.textContent = 'Copied!';
        showToast('✓ Email address copied to clipboard: ' + email);
        setTimeout(() => {
          if (copyStatus) copyStatus.textContent = 'Copy';
        }, 2500);
      }).catch(() => {
        showToast('Email: ' + email);
      });
    });
  }

  // 11. Background Constellation Particle Canvas
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    const particleCount = Math.min(Math.floor((width * height) / 22000), 55);
    const particles = [];

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 1.8 + 0.8;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.45)';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const alpha = (1 - dist / 130) * 0.16;
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();
  }
});
