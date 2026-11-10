// ===== 深色模式切換（記住使用者選擇）=====
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.getElementById("themeLabel");
const savedTheme = localStorage.getItem("junmi-theme");
const initialTheme = savedTheme === "dark" ? "dark" : "light";

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const isDark = theme === "dark";
  themeIcon.textContent = isDark ? "☀️" : "🌙";
  themeLabel.textContent = isDark ? "淺色" : "深色";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", isDark ? "切換淺色模式" : "切換深色模式");
  document.querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", isDark ? "#21151C" : "#FEFFEF");
}

applyTheme(initialTheme);
themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("junmi-theme", nextTheme);
  applyTheme(nextTheme);
});

// 自動更新年份
document.getElementById("year").textContent = new Date().getFullYear();

// 圖片載入錯誤智慧容錯處理器（優先嘗試根目錄、次嘗試 images/ 目錄、最後嘗試線上備援）
function handleImgError(img, filename, onlineFallback) {
  if (!img.dataset.retryCount) {
    img.dataset.retryCount = "1";
    img.src = "images/" + filename;
  } else if (img.dataset.retryCount === "1") {
    img.dataset.retryCount = "2";
    img.src = "./" + filename;
  } else if (onlineFallback && img.dataset.retryCount === "2") {
    img.dataset.retryCount = "3";
    img.src = onlineFallback;
  }
}

// 作品資料庫（含 YouTube 影片與畫廊）
const worksData = [
  {
    title: "2D 動畫作品",
    category: "01 / ANIMATION",
    tags: ["2D Animation", "Storytelling"],
    desc: "展示角色動態、細節動作連貫性、場景演出與分鏡敘事練習。",
    tools: "Clip Studio Paint / TVPaint / Premiere Pro",
    role: "分鏡腳本、角色動畫原畫、動態調整",
    isVideo: true,
    videos: [
      {
        title: "2D 動畫短片練習",
        youtubeId: "kF-eNTpA4yY",
        youtubeUrl: "https://youtu.be/kF-eNTpA4yY?si=L68b76QT4afmlGQW",
        thumb: "./thumb-2d.jpg"
      }
    ]
  },
  {
    title: "AE 動態設計",
    category: "02 / MOTION DESIGN",
    tags: ["After Effects", "Motion Design"],
    desc: "展示文字動畫、循環動畫與動態視覺效果。運用 Speed Graph 控制平滑動態節奏與轉場。",
    tools: "Adobe After Effects / Illustrator",
    role: "動態設計、視覺特效、音效同步",
    isVideo: true,
    videos: [
      {
        title: "AE 動態作品 01",
        youtubeId: "QnOMhfVs3no",
        youtubeUrl: "https://youtu.be/QnOMhfVs3no?si=1mBZrSJB-gi2TeYj",
        thumb: "./thumb-ae-1.jpg"
      },
      {
        title: "AE 動態作品 02",
        youtubeId: "TG32nuCMXow",
        youtubeUrl: "https://youtu.be/TG32nuCMXow?si=6jr2Od1rgncY3IzP",
        thumb: "./thumb-ae-2.jpg"
      }
    ]
  },
  {
    title: "數位繪圖",
    category: "03 / ILLUSTRATION",
    tags: ["Illustration", "Digital Art"],
    desc: "角色插畫、概念設計與個人色彩繪圖創作。",
    tools: "Clip Studio Paint / Adobe Photoshop / Procreate",
    role: "角色設計、概念插畫、色彩規劃",
    isGallery: true,
    gallery: [
      {
        src: "./chibi-palette.jpg",
        title: "Chibi Character & Palette"
      },
      {
        src: "./happy-halloween.jpg",
        title: "HAPPY HALLOWEEN"
      }
    ]
  },
  {
    title: "視覺實驗",
    category: "04 / VISUAL EXPERIMENT",
    tags: ["Experiment", "Visual Art"],
    desc: "探索不同的構圖、色彩與視覺表現方式，結合世界觀設定與氛圍描繪。",
    tools: "Mixed Media / Clip Studio Paint / Photoshop",
    role: "世界觀構思、雙人角色立繪、線稿與色彩完稿",
    isGallery: true,
    gallery: [
      {
        src: "./odyssey-express.jpg",
        title: "ODYSSEY EXPRESS"
      }
    ]
  }
];

let currentGalleryIndex = 0;
let activeGalleryItems = [];
let currentVideoIndex = 0;
let activeVideoList = [];

// 打開作品詳情彈窗
function openWorkModal(index) {
  const data = worksData[index];
  if (!data) return;

  document.getElementById("modalCategory").textContent = data.category;
  document.getElementById("modalTitle").textContent = data.title;
  document.getElementById("modalDesc").textContent = data.desc;
  document.getElementById("modalTools").textContent = data.tools;
  document.getElementById("modalRole").textContent = data.role;

  // 渲染標籤
  const tagBox = document.getElementById("modalTags");
  tagBox.innerHTML = "";
  data.tags.forEach(t => {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = t;
    tagBox.appendChild(span);
  });

  const mediaBox = document.getElementById("modalMedia");

  if (data.isVideo && data.videos && data.videos.length > 0) {
    activeVideoList = data.videos;
    currentVideoIndex = 0;
    activeGalleryItems = [];
    renderVideoInModal();
  } else if (data.isGallery && data.gallery && data.gallery.length > 0) {
    activeGalleryItems = data.gallery;
    activeVideoList = [];
    currentGalleryIndex = 0;
    renderGalleryInModal();
  } else {
    activeGalleryItems = [];
    activeVideoList = [];
    mediaBox.className = "";
    mediaBox.innerHTML = "";
  }

  const modal = document.getElementById("workModal");
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // 防止背景滾動
}

// 渲染 YouTube 播放器
function renderVideoInModal() {
  const mediaBox = document.getElementById("modalMedia");
  mediaBox.className = "";

  const currentVideo = activeVideoList[currentVideoIndex];
  const hasMultipleVideos = activeVideoList.length > 1;

  mediaBox.innerHTML = `
    <div class="video-player-wrap">
      <iframe id="activeYoutubeIframe" src="https://www.youtube.com/embed/${currentVideo.youtubeId}?rel=0" title="${currentVideo.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <div class="video-footer-bar">
      <span id="activeVideoTitle" class="video-footer-title">${currentVideo.title}</span>
      <a id="activeVideoLink" class="gallery-open-full" href="${currentVideo.youtubeUrl}" target="_blank" rel="noopener noreferrer">在 YouTube 上觀看 ↗</a>
    </div>
    ${hasMultipleVideos ? `
      <div class="video-selector-grid">
        ${activeVideoList.map((vid, idx) => `
          <div class="video-select-item ${idx === currentVideoIndex ? 'active' : ''}" onclick="switchVideoSlide(${idx})">
            <img src="${vid.thumb}" onerror="handleImgError(this, '${vid.thumb.replace('./', '')}', 'https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg')" alt="${vid.title}">
            <span>${vid.title}</span>
          </div>
        `).join('')}
      </div>
    ` : ''}
  `;
}

function switchVideoSlide(idx) {
  currentVideoIndex = idx;
  const currentVideo = activeVideoList[currentVideoIndex];
  const iframe = document.getElementById("activeYoutubeIframe");
  const titleEl = document.getElementById("activeVideoTitle");
  const linkEl = document.getElementById("activeVideoLink");

  if (iframe) {
    iframe.src = `https://www.youtube.com/embed/${currentVideo.youtubeId}?rel=0&autoplay=1`;
  }
  if (titleEl) titleEl.textContent = currentVideo.title;
  if (linkEl) linkEl.href = currentVideo.youtubeUrl;

  const items = document.querySelectorAll(".video-select-item");
  items.forEach((item, i) => {
    if (i === currentVideoIndex) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// 渲染畫廊 (Gallery)
function renderGalleryInModal() {
  const mediaBox = document.getElementById("modalMedia");
  mediaBox.className = "gallery-container";

  const currentItem = activeGalleryItems[currentGalleryIndex];
  const hasMultiple = activeGalleryItems.length > 1;

  mediaBox.innerHTML = `
    <div class="gallery-main-view">
      ${hasMultiple ? `<span class="gallery-counter">${currentGalleryIndex + 1} / ${activeGalleryItems.length}</span>` : ''}
      ${hasMultiple ? `<button class="gallery-btn prev" onclick="changeGallerySlide(-1); event.stopPropagation();" aria-label="上一張">❮</button>` : ''}
      <img id="galleryActiveImg" src="${currentItem.src}" onerror="handleImgError(this, '${currentItem.src.replace('./', '')}')" alt="${currentItem.title}">
      ${hasMultiple ? `<button class="gallery-btn next" onclick="changeGallerySlide(1); event.stopPropagation();" aria-label="下一張">❯</button>` : ''}
    </div>
    <div class="gallery-caption-bar">
      <div class="gallery-caption-title">${currentItem.title}</div>
      <a class="gallery-open-full" href="${currentItem.src}" target="_blank" rel="noopener noreferrer">看原始大圖 ↗</a>
    </div>
    ${hasMultiple ? `
      <div class="gallery-thumbs">
        ${activeGalleryItems.map((item, idx) => `
          <div class="gallery-thumb-item ${idx === currentGalleryIndex ? 'active' : ''}" onclick="selectGallerySlide(${idx})">
            <img src="${item.src}" onerror="handleImgError(this, '${item.src.replace('./', '')}')" alt="${item.title}">
          </div>
        `).join('')}
      </div>
    ` : ''}
  `;
}

function changeGallerySlide(step) {
  if (!activeGalleryItems.length) return;
  currentGalleryIndex = (currentGalleryIndex + step + activeGalleryItems.length) % activeGalleryItems.length;
  updateGalleryView();
}

function selectGallerySlide(idx) {
  currentGalleryIndex = idx;
  updateGalleryView();
}

function updateGalleryView() {
  const currentItem = activeGalleryItems[currentGalleryIndex];
  const img = document.getElementById("galleryActiveImg");
  if (img) {
    img.style.opacity = "0.3";
    setTimeout(() => {
      img.src = currentItem.src;
      img.alt = currentItem.title;
      img.style.opacity = "1";
    }, 120);
  }

  const counter = document.querySelector(".gallery-counter");
  if (counter) counter.textContent = `${currentGalleryIndex + 1} / ${activeGalleryItems.length}`;

  const titleEl = document.querySelector(".gallery-caption-title");
  const openEl = document.querySelector(".gallery-open-full");
  if (titleEl) titleEl.textContent = currentItem.title;
  if (openEl) openEl.href = currentItem.src;

  const thumbs = document.querySelectorAll(".gallery-thumb-item");
  thumbs.forEach((th, idx) => {
    if (idx === currentGalleryIndex) {
      th.classList.add("active");
    } else {
      th.classList.remove("active");
    }
  });
}

// 關閉彈窗
function closeWorkModal() {
  const modal = document.getElementById("workModal");
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  // 停止影片播放（清空媒體內容避免背景持續出聲）
  setTimeout(() => {
    const mediaBox = document.getElementById("modalMedia");
    if (mediaBox) mediaBox.innerHTML = "";
  }, 250);
}

function closeWorkModalOnOverlay(e) {
  if (e.target.id === "workModal") {
    closeWorkModal();
  }
}

// 鍵盤操作支援 (ESC 關閉、左右鍵切換畫廊)
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeWorkModal();
  if (activeGalleryItems.length > 1) {
    if (e.key === "ArrowLeft") changeGallerySlide(-1);
    if (e.key === "ArrowRight") changeGallerySlide(1);
  }
});

// 滾動監聽：導覽列陰影 & 回到頂部按鈕 & Active Link
const header = document.getElementById("mainHeader");
const backToTopBtn = document.getElementById("backToTop");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  // 導覽列陰影
  if (currentScroll > 30) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // 回頂部按鈕顯示
  if (currentScroll > 400) {
    backToTopBtn.classList.add("visible");
  } else {
    backToTopBtn.classList.remove("visible");
  }

  // 滾動選單當前高亮
  let currentSection = "";
  sections.forEach(sec => {
    const secTop = sec.offsetTop - 150;
    const secHeight = sec.offsetHeight;
    if (currentScroll >= secTop && currentScroll < secTop + secHeight) {
      currentSection = sec.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active");
    }
  });
}, { passive: true });

// 滾動進場動畫 (IntersectionObserver)
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealElements.forEach((el) => observer.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("visible"));
}

// ===== 可愛星形游標與星光跟隨拖尾效果 (Cute Star Cursor & Trail) =====
(function initStarCursorTrail() {
  // 僅在支援精確指標 (滑鼠/觸控板) 且未設定減少動態時啟動粒子特效
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!hasFinePointer || prefersReducedMotion) return;

  const canvas = document.getElementById("starTrailCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas, { passive: true });

  const particles = [];
  const MAX_PARTICLES = 65;
  const colors = ['#FF8D8D', '#FFE66D', '#DEE48E', '#FF9AA8', '#3B1B26', '#FFFFFF'];

  let lastX = -100;
  let lastY = -100;
  let animId = null;

  // 繪製五角小星星
  function draw5PointStar(ctx, rOut, rIn) {
    let rot = (Math.PI / 2) * 3;
    const step = Math.PI / 5;
    ctx.beginPath();
    ctx.moveTo(0, -rOut);
    for (let i = 0; i < 5; i++) {
      ctx.lineTo(Math.cos(rot) * rOut, Math.sin(rot) * rOut);
      rot += step;
      ctx.lineTo(Math.cos(rot) * rIn, Math.sin(rot) * rIn);
      rot += step;
    }
    ctx.closePath();
  }

  // 繪製四角星芒 ✦
  function drawSparkle(ctx, r) {
    ctx.beginPath();
    ctx.moveTo(0, -r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.quadraticCurveTo(0, 0, 0, r);
    ctx.quadraticCurveTo(0, 0, -r, 0);
    ctx.quadraticCurveTo(0, 0, 0, -r);
    ctx.closePath();
  }

  // 繪製 Junmi 代表性米字星 ✳
  function drawAsterisk(ctx, r) {
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      const ang = (i * Math.PI) / 4;
      const cos = Math.cos(ang) * r;
      const sin = Math.sin(ang) * r;
      ctx.moveTo(-cos, -sin);
      ctx.lineTo(cos, sin);
    }
    ctx.lineWidth = Math.max(1.5, r * 0.28);
    ctx.lineCap = "round";
    ctx.stroke();
  }

  class StarParticle {
    constructor(x, y, isBurst = false) {
      this.x = x + (Math.random() - 0.5) * 6;
      this.y = y + (Math.random() - 0.5) * 6;

      if (isBurst) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.8 + Math.random() * 3.6;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - 0.8;
        this.maxLife = 35 + Math.floor(Math.random() * 20);
        this.size = 7 + Math.random() * 9;
      } else {
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = 0.4 + Math.random() * 1.2; // 輕柔向下飄落
        this.maxLife = 28 + Math.floor(Math.random() * 18);
        this.size = 5 + Math.random() * 8;
      }

      this.life = this.maxLife;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.type = Math.floor(Math.random() * 4); // 0: star, 1: sparkle, 2: asterisk, 3: dot
      this.rot = Math.random() * Math.PI * 2;
      this.vRot = (Math.random() - 0.5) * 0.12;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.035; // 柔和微重力
      this.vx *= 0.98;
      this.rot += this.vRot;
      this.life--;
    }

    draw(ctx) {
      const progress = this.life / this.maxLife;
      const currentSize = this.size * Math.sin((progress * Math.PI) / 2);
      if (currentSize <= 0.2) return;

      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rot);
      ctx.globalAlpha = Math.max(0, progress);

      if (this.type === 2) {
        ctx.strokeStyle = this.color;
        drawAsterisk(ctx, currentSize);
      } else if (this.type === 3) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, Math.max(1, currentSize * 0.45), 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = this.color;
        if (this.type === 0) {
          draw5PointStar(ctx, currentSize, currentSize * 0.48);
        } else {
          drawSparkle(ctx, currentSize);
        }
        ctx.fill();

        // 若不是深色粒子，加細緻外框保持復古童趣感
        if (this.color !== '#3B1B26' && currentSize > 4) {
          ctx.strokeStyle = '#3B1B26';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      ctx.restore();
    }
  }

  function spawnParticles(x, y, count = 1, isBurst = false) {
    for (let i = 0; i < count; i++) {
      if (particles.length >= MAX_PARTICLES) {
        particles.shift();
      }
      particles.push(new StarParticle(x, y, isBurst));
    }
    startLoop();
  }

  function loop() {
    ctx.clearRect(0, 0, width, height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw(ctx);
      if (p.life <= 0) {
        particles.splice(i, 1);
      }
    }

    if (particles.length > 0) {
      animId = requestAnimationFrame(loop);
    } else {
      // 沒有活躍粒子時自動停止動畫循環，節省資源
      animId = null;
    }
  }

  function startLoop() {
    if (!animId) {
      animId = requestAnimationFrame(loop);
    }
  }

  // 滑鼠移動生成拖尾星光
  window.addEventListener("mousemove", (e) => {
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    const dist = Math.hypot(dx, dy);

    // 避免原地不動時持續生成，移動超過 14px 時飄落星星
    if (dist > 14) {
      lastX = e.clientX;
      lastY = e.clientY;
      spawnParticles(e.clientX, e.clientY, dist > 45 ? 2 : 1, false);
    }
  }, { passive: true });

  // 滑鼠點擊時星光噴發
  window.addEventListener("click", (e) => {
    spawnParticles(e.clientX, e.clientY, 7, true);
  }, { passive: true });

  // 切換分頁時清空粒子
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      particles.length = 0;
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    }
  });
})();
