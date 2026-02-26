/* ============================================================
   main.js — Portfolio Interactivity
   ============================================================ */

'use strict';

// ─── Custom Cursor ───────────────────────────────────────────
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .project-card, .contact-card').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursorFollower.style.width = '56px';
    cursorFollower.style.height = '56px';
    cursorFollower.style.borderColor = 'rgba(99,102,241,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    cursorFollower.style.width = '36px';
    cursorFollower.style.height = '36px';
    cursorFollower.style.borderColor = 'rgba(99,102,241,0.4)';
  });
});

// ─── Navbar Scroll ───────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  // Back to top
  document.getElementById('back-to-top').classList.toggle('visible', window.scrollY > 400);
});

// ─── Mobile Menu ─────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ─── Theme Toggle ────────────────────────────────────────────
const themeBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') applyLight();

function applyLight() {
  document.body.classList.add('light-mode');
  themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
}
function applyDark() {
  document.body.classList.remove('light-mode');
  themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
}

themeBtn.addEventListener('click', () => {
  if (document.body.classList.contains('light-mode')) {
    applyDark(); localStorage.setItem('theme', 'dark');
  } else {
    applyLight(); localStorage.setItem('theme', 'light');
  }
});

// ─── Reveal on Scroll ────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = (i % 4) * 0.1 + 's';
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach((el) => revealObserver.observe(el));

// ─── Typed Text Effect ───────────────────────────────────────
const phrases = [
  'AI-Powered Apps.',
  'Automation Bots.',
  'Full-Stack Web Apps.',
  'Smart Solutions.',
  'Cool Stuff. 🚀',
];
let phraseIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('typed-text');

function typeLoop() {
  const phrase = phrases[phraseIndex];
  typedEl.textContent = phrase.slice(0, charIndex);

  if (!isDeleting && charIndex < phrase.length) {
    charIndex++;
    setTimeout(typeLoop, 75);
  } else if (!isDeleting && charIndex === phrase.length) {
    isDeleting = true;
    setTimeout(typeLoop, 1800);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeLoop, 40);
  } else {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(typeLoop, 200);
  }
}
typeLoop();

// ─── Counter Animations ──────────────────────────────────────
const statNums = document.querySelectorAll('.stat-num');
let countersStarted = false;

function animateCounters() {
  if (countersStarted) return;
  countersStarted = true;
  statNums.forEach((el) => {
    const target = +el.dataset.target;
    let current = 0;
    const step = Math.ceil(target / 40);
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(interval);
    }, 40);
  });
}

const heroObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) animateCounters();
}, { threshold: 0.5 });
heroObserver.observe(document.getElementById('hero'));

// ─── Skill Bars Animation ────────────────────────────────────
const bars = document.querySelectorAll('.bar-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.width + '%';
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
bars.forEach((bar) => barObserver.observe(bar));

// ─── Particle Canvas ─────────────────────────────────────────
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

function randomBetween(a, b) { return a + Math.random() * (b - a); }

function initParticles() {
  particles = [];
  const count = Math.floor(window.innerWidth / 18);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: randomBetween(1, 3),
      dx: randomBetween(-0.3, 0.3),
      dy: randomBetween(-0.3, 0.3),
      alpha: randomBetween(0.1, 0.6),
    });
  }
}
initParticles();

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.x += p.dx; p.y += p.dy;
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(99, 102, 241, ${p.alpha})`;
    ctx.fill();
  });

  // Draw connecting lines
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(99, 102, 241, ${0.08 * (1 - dist / 100)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(drawParticles);
}
drawParticles();

// ─── Blog & Research Tab Switcher ────────────────────────────
const blogTabs = document.querySelectorAll('.blog-tab');
blogTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    blogTabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-content-posts').classList.toggle('hidden', target !== 'posts');
    document.getElementById('tab-content-research').classList.toggle('hidden', target !== 'research');
    const newCards = document.querySelectorAll(`#tab-content-${target} .reveal`);
    newCards.forEach((card) => {
      card.classList.remove('visible');
      setTimeout(() => card.classList.add('visible'), 50);
    });
  });
});

// ─── HACKER MODE — In-Page Toggle ────────────────────────────
const hackerToggle = document.getElementById('hacker-toggle');
const hackerBtnLbl = document.getElementById('hacker-btn-label');
const hkMatrix = document.getElementById('hk-matrix');
const hkOverlay = document.getElementById('hk-overlay');
const hkOvCanvas = document.getElementById('hk-ov-canvas');
const hkOvCtx = hkOvCanvas.getContext('2d');
const hkLine1 = document.getElementById('hk-line-1');
const hkLine2 = document.getElementById('hk-line-2');
const hkLine3 = document.getElementById('hk-line-3');
const hkStatus = document.getElementById('hk-status');
const bd = document.body;

// Size overlay canvas
function resizeHkOv() {
  hkOvCanvas.width = window.innerWidth;
  hkMatrix.width = window.innerWidth;
  hkOvCanvas.height = window.innerHeight;
  hkMatrix.height = window.innerHeight;
}
resizeHkOv();
window.addEventListener('resize', resizeHkOv);

// Matrix rain on hk-matrix canvas (always ticking, opacity controlled by CSS)
const HK_CHARS = 'アイウエオNABCDEFGHIJ01@#$%&*';
let hkDrops = Array.from({ length: Math.floor(window.innerWidth / 14) }, () => Math.random() * -80);
const hkMCtx = hkMatrix.getContext('2d');
function drawHkMatrix() {
  hkMCtx.fillStyle = 'rgba(0,0,0,0.05)';
  hkMCtx.fillRect(0, 0, hkMatrix.width, hkMatrix.height);
  hkMCtx.font = '14px Share Tech Mono';
  hkDrops.forEach((y, i) => {
    const ch = HK_CHARS[Math.floor(Math.random() * HK_CHARS.length)];
    const bright = Math.random() > 0.94;
    hkMCtx.fillStyle = bright ? '#fff' : '#00ff41';
    hkMCtx.shadowColor = '#00ff41';
    hkMCtx.shadowBlur = bright ? 8 : 0;
    hkMCtx.fillText(ch, i * 14, y * 14);
    if (y * 14 > hkMatrix.height && Math.random() > 0.975) hkDrops[i] = 0;
    hkDrops[i] += 0.5;
  });
  requestAnimationFrame(drawHkMatrix);
}
drawHkMatrix();

// Overlay matrix burst
let hkOvDrops = [];
function initHkOvDrops() {
  hkOvDrops = Array.from({ length: Math.floor(hkOvCanvas.width / 14) }, () => Math.random() * -50);
}
let hkOvRaf = null;
function drawHkOvMatrix() {
  hkOvCtx.fillStyle = 'rgba(0,0,0,0.07)';
  hkOvCtx.fillRect(0, 0, hkOvCanvas.width, hkOvCanvas.height);
  hkOvCtx.font = '13px Share Tech Mono';
  hkOvDrops.forEach((y, i) => {
    const ch = HK_CHARS[Math.floor(Math.random() * HK_CHARS.length)];
    const bright = Math.random() > 0.92;
    hkOvCtx.fillStyle = bright ? '#fff' : '#00ff41';
    hkOvCtx.shadowColor = '#00ff41';
    hkOvCtx.shadowBlur = bright ? 10 : 2;
    hkOvCtx.fillText(ch, i * 14, y * 14);
    if (y * 14 > hkOvCanvas.height && Math.random() > 0.975) hkOvDrops[i] = 0;
    hkOvDrops[i] += 0.8;
  });
  hkOvRaf = requestAnimationFrame(drawHkOvMatrix);
}

// Typewriter helper
function typeHkLine(el, text, speed = 30) {
  return new Promise(resolve => {
    el.textContent = '';
    let i = 0;
    const iv = setInterval(() => {
      el.textContent += text[i++];
      if (i >= text.length) { clearInterval(iv); resolve(); }
    }, speed);
  });
}

// Main toggle transition
let isHackerMode = false;
async function toggleHackerMode() {
  if (hackerToggle) hackerToggle.disabled = true;

  const toHacker = !isHackerMode;

  // Start overlay
  initHkOvDrops();
  hkOvCtx.clearRect(0, 0, hkOvCanvas.width, hkOvCanvas.height);
  hkOverlay.classList.add('active');
  drawHkOvMatrix();

  hkLine1.textContent = '';
  hkLine2.textContent = '';
  hkLine3.textContent = '';
  hkStatus.textContent = '';

  await new Promise(r => setTimeout(r, 180));

  if (toHacker) {
    await typeHkLine(hkLine1, '> INITIATING HACK SEQUENCE...');
    await new Promise(r => setTimeout(r, 90));
    await typeHkLine(hkLine2, '> BYPASSING FIREWALL... [OK]');
    await new Promise(r => setTimeout(r, 90));
    await typeHkLine(hkLine3, '> LOADING OFFENSIVE PROFILE...');
    await new Promise(r => setTimeout(r, 180));
    hkStatus.textContent = '[ ACCESS GRANTED ]';
    hkStatus.style.color = '#00ff41';
    await new Promise(r => setTimeout(r, 450));

    bd.classList.add('hacker-mode');
    hackerBtnLbl.textContent = 'AI PORTFOLIO';
    document.querySelector('#hacker-toggle .hm-skull').textContent = '🤖';
  } else {
    await typeHkLine(hkLine1, '> TERMINATING SESSION...');
    await new Promise(r => setTimeout(r, 90));
    await typeHkLine(hkLine2, '> CLEARING TRACES... [OK]');
    await new Promise(r => setTimeout(r, 90));
    await typeHkLine(hkLine3, '> RESTORING AI PORTFOLIO...');
    await new Promise(r => setTimeout(r, 180));
    hkStatus.textContent = '[ AI MODE RESTORED ]';
    hkStatus.style.color = '#00d4ff';
    await new Promise(r => setTimeout(r, 450));

    bd.classList.remove('hacker-mode');
    hackerBtnLbl.textContent = 'HACKER MODE';
    document.querySelector('#hacker-toggle .hm-skull').textContent = '☠';
  }

  isHackerMode = toHacker;

  // Fade overlay out
  hkOverlay.style.transition = 'opacity 0.5s ease';
  hkOverlay.style.opacity = '0';
  await new Promise(r => setTimeout(r, 520));

  cancelAnimationFrame(hkOvRaf);
  hkOverlay.classList.remove('active');
  hkOverlay.style.opacity = '';
  hkOverlay.style.transition = '';

  if (hackerToggle) hackerToggle.disabled = false;
}

if (hackerToggle) hackerToggle.addEventListener('click', toggleHackerMode);



// ─── Contact Form ────────────────────────────────────────────
const form = document.getElementById('contact-form');
const formNote = document.getElementById('form-note');
const submitBtn = document.getElementById('submit-btn');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';

    // If using Formspree, uncomment the fetch below.
    // For now, simulate a 1.5s delay and show success.
    await new Promise((r) => setTimeout(r, 1500));

    submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
    formNote.textContent = '✅ Thanks! I\'ll get back to you soon.';
    form.reset();

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
      formNote.textContent = '';
    }, 4000);
  });
}

// ─── Back to Top ─────────────────────────────────────────────
document.getElementById('back-to-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ─── Active Nav Link Highlight ───────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navAnchors.forEach((a) => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach((sec) => sectionObserver.observe(sec));
