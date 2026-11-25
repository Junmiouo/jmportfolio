/* =====================================================
   潘湜瀅 / 君米 (JUNMI) — 作品集互動腳本
   ===================================================== */

// ===== 作品資料 (與首頁作品卡片對應) =====
const WORKS_DATA = [
  {
    category: '01 / 2D ANIMATION',
    title: '2D 動畫作品',
    tags: ['2D Animation', 'Storytelling', 'Clip Studio Paint'],
    youtubeId: 'kF-eNTpA4yY',
    image: './thumb-2d.jpg',
    description:
      '透過角色動態、表情演出與分鏡節奏呈現敘事張力，結合前期角色設定與手繪逐格練習，探索 2D 動畫的表現可能。',
    tools: 'Clip Studio Paint, After Effects',
    role: '編劇 / 角色設計 / 2D 動畫製作',
  },
  {
    category: '02 / MOTION DESIGN',
    title: 'AE 動態設計',
    tags: ['After Effects', 'Motion Design', '元件動畫'],
    youtubeId: 'QnOMhfVs3no',
    image: './thumb-ae-1.jpg',
    description:
      '運用 After Effects 製作關鍵影格動態、文字編排與元件循環動畫，強調畫面律動與視覺節奏控制。',
    tools: 'After Effects',
    role: '元件動畫 / 動態設計 / 美編排版',
  },
  {
    category: '03 / DIGITAL ART',
    title: '數位繪圖',
    tags: ['Illustration', 'Character Design', 'Clip Studio Paint'],
    youtubeId: null,
    image: './chibi-palette.jpg',
    description:
      '收錄個人角色設計、風格探索與插畫創作，著重鮮明色彩搭配、角色個性塑造與美式復古視覺語彙。',
    tools: 'Clip Studio Paint',
    role: '角色設計 / 插畫繪製',
  },
  {
    category: '04 / VISUAL EXPERIMENT',
    title: '視覺實驗',
    tags: ['Experiment', 'Visual Art', 'Collage'],
    youtubeId: null,
    image: './odyssey-express.jpg',
    description:
      '針對構圖、色彩情緒與復古拼貼質感進行的多元視覺實驗，作為未來原創故事世界觀的美術風格探索。',
    tools: 'Clip Studio Paint, After Effects',
    role: '美術風格監督 / 視覺設計',
  },
];

// ===== 復古印刷風 SVG 佔位圖產生器 =====
function createRetroPlaceholderSvg(title, subtitle, accentColor = '#D94E34') {
  const safeTitle = String(title).replace(/[<>&'"]/g, '');
  const safeSub = String(subtitle).replace(/[<>&'"]/g, '');
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450">
      <rect width="800" height="450" fill="#EFE5CF"/>
      <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="5" cy="5" r="1.5" fill="#231B17" fill-opacity="0.12"/>
      </pattern>
      <rect width="800" height="450" fill="url(#dots)"/>
      <rect x="28" y="28" width="744" height="394" rx="6" fill="#FFFDF7" stroke="#231B17" stroke-opacity="0.35" stroke-width="2"/>
      <rect x="56" y="56" width="220" height="36" rx="4" fill="${accentColor}"/>
      <text x="166" y="80" text-anchor="middle" font-family="monospace" font-size="16" font-weight="700" fill="#FFFDF7">${safeSub}</text>
      <circle cx="670" cy="128" r="46" fill="none" stroke="#355C7D" stroke-width="2.5" stroke-dasharray="6 4"/>
      <text x="670" y="140" text-anchor="middle" font-size="38" fill="#D94E34">✳</text>
      <text x="60" y="245" font-family="serif" font-size="40" font-weight="900" fill="#231B17">${safeTitle}</text>
      <line x1="60" y1="274" x2="360" y2="274" stroke="#E3A535" stroke-width="4"/>
      <text x="60" y="315" font-family="monospace" font-size="17" fill="#6E6057">JUNMI · RETRO ARCHIVE EDITION</text>
    </svg>
  `.trim();
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

// ===== 首頁個人插畫載入失敗時的復古版畫風預設圖 =====
function handleHeroIllustrationError(img) {
  img.onerror = null;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 675">
      <rect width="600" height="675" fill="#EADBBF"/>
      <pattern id="paperDots" width="18" height="18" patternUnits="userSpaceOnUse">
        <circle cx="4" cy="4" r="1.4" fill="#231B17" fill-opacity="0.13"/>
      </pattern>
      <rect width="600" height="675" fill="url(#paperDots)"/>
      <rect x="34" y="34" width="532" height="607" fill="#FFFDF7" stroke="#231B17" stroke-opacity="0.3" stroke-width="2"/>
      <circle cx="300" cy="275" r="158" fill="#EFE5CF" stroke="#355C7D" stroke-width="2.5" stroke-dasharray="8 6"/>
      <circle cx="300" cy="275" r="134" fill="#355C7D" fill-opacity="0.12"/>
      <!-- 復古獨角與星芒剪影 -->
      <polygon points="300,82 328,195 272,195" fill="#E3A535" stroke="#231B17" stroke-width="3" stroke-linejoin="round"/>
      <line x1="286" y1="142" x2="318" y2="154" stroke="#231B17" stroke-width="2.2"/>
      <line x1="280" y1="168" x2="322" y2="180" stroke="#231B17" stroke-width="2.2"/>
      <circle cx="176" cy="182" r="24" fill="#D94E34"/>
      <text x="176" y="191" text-anchor="middle" font-size="24" fill="#FFFDF7">✳</text>
      <circle cx="426" cy="212" r="10" fill="#E3A535"/>
      <path d="M195 318 Q300 262 405 318" fill="none" stroke="#231B17" stroke-width="2.5" stroke-dasharray="4 4"/>
      <rect x="92" y="348" width="416" height="118" rx="4" fill="#FFFDF7" stroke="#231B17" stroke-width="2"/>
      <text x="300" y="396" text-anchor="middle" font-family="serif" font-size="28" font-weight="900" fill="#231B17">個人插畫主視覺區</text>
      <text x="300" y="434" text-anchor="middle" font-family="monospace" font-size="16" fill="#6E6057">放入 hero-illustration.jpg 即可顯示</text>
      <text x="300" y="540" text-anchor="middle" font-family="serif" font-style="italic" font-size="22" fill="#355C7D">Unicorn of My Own Life</text>
      <text x="300" y="575" text-anchor="middle" font-family="monospace" font-size="14" letter-spacing="3" fill="#D94E34">PAN SHIH-YING / JUNMI</text>
    </svg>
  `.trim();
  img.src = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

// ===== 作品圖片錯誤處理 =====
function handleImgError(img, localFile, fallbackUrl) {
  if (fallbackUrl && !img.dataset.triedFallback) {
    img.dataset.triedFallback = '1';
    img.src = fallbackUrl;
    return;
  }
  img.onerror = null;
  const label = img.alt || localFile || 'WORK PREVIEW';
  img.src = createRetroPlaceholderSvg(label, 'PORTFOLIO ARCHIVE', '#355C7D');
}

// ===== 作品 Modal 控制 =====
function openWorkModal(index) {
  const work = WORKS_DATA[index];
  if (!work) return;

  const modal = document.getElementById('workModal');
  const categoryEl = document.getElementById('modalCategory');
  const titleEl = document.getElementById('modalTitle');
  const tagsEl = document.getElementById('modalTags');
  const mediaEl = document.getElementById('modalMedia');
  const descEl = document.getElementById('modalDesc');
  const toolsEl = document.getElementById('modalTools');
  const roleEl = document.getElementById('modalRole');

  categoryEl.textContent = work.category;
  titleEl.textContent = work.title;
  descEl.textContent = work.description;
  toolsEl.textContent = work.tools;
  roleEl.textContent = work.role;

  tagsEl.innerHTML = '';
  work.tags.forEach((tag) => {
    const span = document.createElement('span');
    span.className = 'tag';
    span.textContent = tag;
    tagsEl.appendChild(span);
  });

  mediaEl.innerHTML = '';
  if (work.youtubeId) {
    const wrap = document.createElement('div');
    wrap.className = 'modal-video-wrap';
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${work.youtubeId}`;
    iframe.title = work.title;
    iframe.allow =
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    wrap.appendChild(iframe);
    mediaEl.appendChild(wrap);
  } else {
    const img = document.createElement('img');
    img.src = work.image;
    img.alt = work.title;
    img.onerror = function () {
      handleImgError(this, work.image);
    };
    mediaEl.appendChild(img);
  }

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeWorkModal() {
  const modal = document.getElementById('workModal');
  const mediaEl = document.getElementById('modalMedia');
  if (!modal) return;

  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (mediaEl) {
    mediaEl.innerHTML = '';
  }
}

function closeWorkModalOnOverlay(event) {
  if (event.target && event.target.id === 'workModal') {
    closeWorkModal();
  }
}

function handleCardKeydown(event, index) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    openWorkModal(index);
  }
}

// ===== 主題切換 (淺色 / 夜間紙張) =====
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  const iconEl = document.getElementById('themeIcon');
  const labelEl = document.getElementById('themeLabel');
  if (!toggleBtn) return;

  const applyTheme = (theme) => {
    const isDark = theme === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    toggleBtn.setAttribute('aria-pressed', String(isDark));
    iconEl.textContent = isDark ? '☀️' : '🌙';
    labelEl.textContent = isDark ? '日間紙張' : '夜間紙張';
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', isDark ? '#1B1715' : '#F4ECD8');
    }
  };

  const savedTheme = localStorage.getItem('junmi-theme');
  if (savedTheme === 'dark' || savedTheme === 'light') {
    applyTheme(savedTheme);
  }

  toggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('junmi-theme', next);
  });
}

// ===== 手機版導覽選單 =====
function initMobileNav() {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (!navToggle || !navLinks) return;

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ===== 捲動效果 & Reveal 動畫 =====
function initScrollEffects() {
  const header = document.getElementById('mainHeader');
  const backToTop = document.getElementById('backToTop');
  const reveals = document.querySelectorAll('.reveal');

  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle('scrolled', y > 24);
    if (backToTop) backToTop.classList.toggle('visible', y > 360);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }
}

// ===== 柔和復古星光畫布 =====
function initStarTrail() {
  const canvas = document.getElementById('starTrailCanvas');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const colors = ['#D94E34', '#E3A535', '#355C7D', '#4E7A66'];
  const particles = [];
  let lastSpawn = 0;

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  const spawnStar = (x, y, count = 1, burst = false) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = burst ? 1.2 + Math.random() * 2.6 : 0.3 + Math.random() * 0.8;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (burst ? 0.35 : 0.15),
        size: burst ? 4.5 + Math.random() * 3.5 : 2.8 + Math.random() * 2.5,
        alpha: 0.72,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI,
      });
    }
  };

  window.addEventListener('pointermove', (e) => {
    const now = performance.now();
    if (now - lastSpawn > 50) {
      spawnStar(e.clientX, e.clientY, 1, false);
      lastSpawn = now;
    }
  });

  window.addEventListener('click', (e) => {
    spawnStar(e.clientX, e.clientY, 6, true);
  });

  const drawStar = (p) => {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = Math.max(0, p.alpha);
    ctx.fillStyle = p.color;

    const r = p.size;
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2;
      ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
      ctx.lineTo(Math.cos(a + Math.PI / 4) * (r * 0.34), Math.sin(a + Math.PI / 4) * (r * 0.34));
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.025;
      p.rotation += 0.04;
      p.alpha -= 0.022;
      if (p.alpha <= 0) {
        particles.splice(i, 1);
      } else {
        drawStar(p);
      }
    }
    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
}

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  initThemeToggle();
  initMobileNav();
  initScrollEffects();
  initStarTrail();

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeWorkModal();
    }
  });
});
