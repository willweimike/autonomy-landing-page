/* ================================================================
   AUTONOMOUS AI AGENT SYSTEM — JavaScript
   Author: Bill Liu
   ================================================================ */

'use strict';

// ── 1. DOM READY ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initParticleCanvas();
  initCounterAnimation();
  initScrollReveal();
  initTerminalAnimation();
});

// ── 2. NAV — sticky + scroll class ───────────────────────────
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}

// ── 3. PARTICLE CANVAS ────────────────────────────────────────
function initParticleCanvas() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, particles, animFrameId;

  const PARTICLE_COUNT    = 80;
  const CONNECTION_RADIUS = 140;
  const PARTICLE_SPEED    = 0.35;

  class Particle {
    constructor() { this.reset(true); }

    reset(initial = false) {
      this.x  = Math.random() * width;
      this.y  = initial ? Math.random() * height : -10;
      this.vx = (Math.random() - 0.5) * PARTICLE_SPEED;
      this.vy = (Math.random() - 0.5) * PARTICLE_SPEED;
      this.r  = Math.random() * 2 + 1;
      this.opacity = Math.random() * 0.5 + 0.2;
      this.hue = Math.random() > 0.5 ? 195 : 258; // cyan or purple
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < -20) this.x = width + 20;
      if (this.x > width + 20) this.x = -20;
      if (this.y < -20) this.y = height + 20;
      if (this.y > height + 20) this.y = -20;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 100%, 60%, ${this.opacity})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `hsl(${this.hue}, 100%, 60%)`;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function resize() {
    const hero = document.getElementById('hero');
    width  = canvas.width  = hero ? hero.offsetWidth  : window.innerWidth;
    height = canvas.height = hero ? hero.offsetHeight : window.innerHeight;
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECTION_RADIUS) {
          const alpha = (1 - dist / CONNECTION_RADIUS) * 0.25;
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, `hsla(195, 100%, 60%, ${alpha})`);
          grad.addColorStop(1, `hsla(258, 100%, 65%, ${alpha})`);

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }
  }

  function tick() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    animFrameId = requestAnimationFrame(tick);
  }

  function init() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
    if (animFrameId) cancelAnimationFrame(animFrameId);
    tick();
  }

  window.addEventListener('resize', () => {
    resize();
    particles.forEach(p => {
      p.x = Math.random() * width;
      p.y = Math.random() * height;
    });
  }, { passive: true });

  init();
}

// ── 4. COUNTER ANIMATION ──────────────────────────────────────
function initCounterAnimation() {
  const stats = document.querySelectorAll('.hero__stat-value');
  if (!stats.length) return;

  const easeOut = t => 1 - Math.pow(1 - t, 3);

  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const duration = 1800;
    const start = performance.now();
    const isFloat = String(target).includes('.');

    const step = (now) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value    = target * easeOut(progress);

      el.textContent = isFloat
        ? value.toFixed(1)
        : Math.floor(value);

      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }

  // Trigger on hero entry
  const hero = document.getElementById('hero');
  if (!hero) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        stats.forEach(el => animateCounter(el));
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(hero);
}

// ── 5. SCROLL REVEAL (IntersectionObserver fallback) ─────────
function initScrollReveal() {
  // Skip if browser supports native scroll-driven animations
  if (CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
    return; // Let pure CSS handle it
  }

  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = getComputedStyle(el).getPropertyValue('--delay') || '0ms';
        setTimeout(() => el.classList.add('visible'), parseInt(delay) || 0);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

// ── 6. TERMINAL ANIMATION ─────────────────────────────────────
function initTerminalAnimation() {
  const output = document.getElementById('terminal-output');
  if (!output) return;

  const LINES = [
    { type: 'cmd',  text: '$ python agent_system.py --task "分析市場趨勢並生成報告"' },
    { type: 'info', text: '' },
    { type: 'info', text: '🚀 初始化自律型代理人系統 v2.1.0...' },
    { type: 'info', text: '✓  載入 LLM 引擎 (Gemini Pro)' },
    { type: 'info', text: '✓  連接向量記憶庫 (FAISS index: 128k vectors)' },
    { type: 'info', text: '✓  工具註冊完成 (search, browser, code_exec, file_io)' },
    { type: 'info', text: '' },
    { type: 'warn', text: '▶  [主協調代理人] 任務接收：分析市場趨勢並生成報告' },
    { type: 'out',  text: '   ├─ 子任務 1：網路搜尋最新市場數據 → [研究代理人]' },
    { type: 'out',  text: '   ├─ 子任務 2：數據分析與視覺化 → [程式代理人]' },
    { type: 'out',  text: '   └─ 子任務 3：報告撰寫與審查 → [審查代理人]' },
    { type: 'info', text: '' },
    { type: 'out',  text: '   [研究代理人] 正在搜尋："2024 Q4 科技市場分析"...' },
    { type: 'out',  text: '   [研究代理人] 已取得 24 篇相關文章，摘要整理中...' },
    { type: 'out',  text: '   [程式代理人] 執行數據分析腳本...' },
    { type: 'out',  text: '   [程式代理人] 生成圖表：market_trends_2024.png ✓' },
    { type: 'out',  text: '   [審查代理人] 品質驗證中...' },
    { type: 'out',  text: '   [審查代理人] 發現 2 處待改善項目，觸發反思迴路...' },
    { type: 'warn', text: '   [主協調代理人] 代理人自我修正第 1 輪...' },
    { type: 'out',  text: '   [審查代理人] 重新驗證通過 ✓' },
    { type: 'info', text: '' },
    { type: 'done', text: '✅ 任務完成！報告已生成：market_report_2024.pdf' },
    { type: 'done', text: '   耗時：47.3s | 工具調用：18 次 | 自主決策：100%' },
  ];

  let lineIndex = 0;
  let charIndex = 0;
  let currentLineEl = null;
  let isTyping = false;
  let animTimer = null;

  function createLine(type) {
    const span = document.createElement('span');
    span.className = `terminal__line terminal__line--${type}`;
    return span;
  }

  function typeChar() {
    if (lineIndex >= LINES.length) {
      // Add blinking cursor at end
      const cursor = document.createElement('span');
      cursor.className = 'terminal__cursor';
      output.appendChild(cursor);
      return;
    }

    const { type, text } = LINES[lineIndex];

    if (charIndex === 0) {
      currentLineEl = createLine(type);
      output.appendChild(currentLineEl);
    }

    if (charIndex < text.length) {
      currentLineEl.textContent += text[charIndex];
      charIndex++;

      const delay = type === 'cmd' ? 28 : text[charIndex - 1] === '.' ? 60 : 6;
      animTimer = setTimeout(typeChar, delay);
    } else {
      // Line done — add newline
      output.appendChild(document.createElement('br'));
      lineIndex++;
      charIndex = 0;

      const pause = type === 'cmd' ? 300 : lineIndex < 7 ? 80 : 200;
      animTimer = setTimeout(typeChar, pause);
    }

    // Auto-scroll
    output.scrollTop = output.scrollHeight;
  }

  // Start animation when section comes into view
  const demoSection = document.getElementById('demo');
  if (!demoSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !isTyping) {
        isTyping = true;
        typeChar();
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(demoSection);
}
