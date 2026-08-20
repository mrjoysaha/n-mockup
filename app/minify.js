/* =========================================================
   minify.js — Nothing Space Mockup Editor
   ========================================================= */

/* ----------------------------------------------------------
   1. THEME
   ---------------------------------------------------------- */
function toggleTheme() {
  const html = document.documentElement;
  const icon = document.getElementById("t-icon");
  if (html.getAttribute("data-theme") === "dark") {
    html.setAttribute("data-theme", "light");
    if (icon) icon.className = "fa-solid fa-moon";
    localStorage.setItem("n-theme", "light");
  } else {
    html.setAttribute("data-theme", "dark");
    if (icon) icon.className = "fa-solid fa-sun";
    localStorage.setItem("n-theme", "dark");
  }
}

(function initTheme() {
  const saved = localStorage.getItem("n-theme") || "light";
  document.documentElement.setAttribute("data-theme", saved);
  const icon = document.getElementById("t-icon");
  if (icon) icon.className = saved === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
})();

/* ----------------------------------------------------------
   2. FOOTER YEAR
   ---------------------------------------------------------- */
(function setYear() {
  const el = document.getElementById("current-year");
  if (el) el.textContent = new Date().getFullYear();
})();

/* ----------------------------------------------------------
   3. SCREEN / MODAL HELPERS
   ---------------------------------------------------------- */
function openScreen(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = "flex";
  requestAnimationFrame(() => el.classList.add("active"));
  document.body.style.overflow = "hidden";
}

function closeScreen(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove("active");
  setTimeout(() => { el.style.display = "none"; document.body.style.overflow = ""; }, 300);
}

document.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("screen")) {
    const id = e.target.id;
    if (id) closeScreen(id);
  }
});

/* ----------------------------------------------------------
   4. BOT FEED / EDITOR OPENER
   ---------------------------------------------------------- */
function openBotFeed() { openScreen("botFeedScr"); }

/* ----------------------------------------------------------
   5. ANIMATED BACKGROUND (stars canvas)
   ---------------------------------------------------------- */
(function initStars() {
  const container = document.querySelector(".stars-container");
  if (!container) return;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  container.appendChild(canvas);

  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize();
  window.addEventListener("resize", resize);

  const stars = Array.from({ length: 80 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.2 + 0.3,
    a: Math.random(),
    da: (Math.random() * 0.004 + 0.001) * (Math.random() < 0.5 ? 1 : -1),
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    stars.forEach(s => {
      s.a = Math.max(0.05, Math.min(1, s.a + s.da));
      if (s.a >= 1 || s.a <= 0.05) s.da *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? `rgba(255,255,255,${s.a * 0.6})` : `rgba(0,0,0,${s.a * 0.15})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ----------------------------------------------------------
   6. DEVICE CATALOG
   ---------------------------------------------------------- */
const DEVICES = [
  { id: "p1",      name: "NP (1)",             f: "../assets/mockup/p1_f.png",      b: "../assets/mockup/p1_b.png" },
  { id: "p2",      name: "NP (2)",             f: "../assets/mockup/p2_f.png",      b: "../assets/mockup/p2_b.png" },
  { id: "p2a",     name: "NP (2a)",            f: "../assets/mockup/p2a_f.png",     b: "../assets/mockup/p2a_b.png" },
  { id: "p2aplus", name: "NP (2a+)",           f: "../assets/mockup/p2aplus_f.png", b: "../assets/mockup/p2aplus_b.png" },
  { id: "p3",      name: "NP (3)",             f: "../assets/mockup/p3f.png",       b: "../assets/mockup/p3b.png" },
  { id: "p3a",     name: "NP (3a)",            f: "../assets/mockup/p3a_f.png",     b: "../assets/mockup/p3a_b.png" },
  { id: "p3alite", name: "NP (3a Lite)",       f: "../assets/mockup/p3alite_f.png", b: "../assets/mockup/p3alite_b.png" },
  { id: "p3apro",  name: "NP (3a Pro)",        f: "../assets/mockup/p3apro_f.png",  b: "../assets/mockup/p3a_b.png" },
  { id: "p4a",     name: "NP (4a)",            f: "../assets/mockup/p4a_f.png",     b: "../assets/mockup/p4a_b.png" },
  { id: "p4apro",  name: "NP (4a Pro)",        f: "../assets/mockup/p4apro_f.png",  b: "../assets/mockup/p4apro_b.png" },
  { id: "p4b",     name: "NP (4b)",            f: "../assets/mockup/p4b_f.png",     b: "../assets/mockup/p4b_b.png" },
  { id: "cmf1",    name: "CMF Phone (1)",      f: "../assets/mockup/cmf1_f.png",    b: "../assets/mockup/cmf1_b.png" },
  { id: "cmf2",    name: "CMF Phone (2)",      f: "../assets/mockup/cmf2_f.png",    b: "../assets/mockup/cmf2_b.png" },
  { id: "3apro",   name: "CMF Phone (3a Pro)", f: "../assets/mockup/3apro_f.png",   b: "../assets/mockup/3apro_b.png" },
];

const SCREEN_MASKS = {
  p1:      { x: 86, y: 80, w: 828, h: 840 },
  p2:      { x: 86, y: 80, w: 828, h: 840 },
  p2a:     { x: 86, y: 80, w: 828, h: 840 },
  p2aplus: { x: 86, y: 80, w: 828, h: 840 },
  p3:      { x: 86, y: 80, w: 828, h: 840 },
  p3a:     { x: 86, y: 80, w: 828, h: 840 },
  p3alite: { x: 86, y: 80, w: 828, h: 840 },
  p3apro:  { x: 86, y: 80, w: 828, h: 840 },
  p4a:     { x: 86, y: 80, w: 828, h: 840 },
  p4apro:  { x: 86, y: 80, w: 828, h: 840 },
  p4b:     { x: 86, y: 80, w: 828, h: 840 },
  cmf1:    { x: 86, y: 80, w: 828, h: 840 },
  cmf2:    { x: 86, y: 80, w: 828, h: 840 },
  "3apro": { x: 86, y: 80, w: 828, h: 840 },
};

/* ----------------------------------------------------------
   7. EDITOR STATE
   ---------------------------------------------------------- */
let editorReady = false;
let currentDeviceId = "p2";
let currentSide = "f";
let phoneShadowOn = false;
let wmVisible = true;
let toolbarVisible = true;
let activePopup = null;
let activeBtn = null;
let bubbleInterval = null;

/* ----------------------------------------------------------
   8. SCALE EDITOR — fit 1000×1000 export area into container
   ---------------------------------------------------------- */
function scaleEditor() {
  const container = document.getElementById("editorScaleContainer");
  const exportArea = document.getElementById("editorExportArea");
  if (!container || !exportArea) return;
  // Use parent width so container can shrink below max-width on small screens
  const parentW = container.parentElement ? container.parentElement.offsetWidth - 20 : 460;
  const size = Math.min(container.offsetWidth || container.getBoundingClientRect().width || parentW, 480);
  if (size < 10) return; // not yet rendered
  const scale = size / 1000;
  exportArea.style.transform = `scale(${scale})`;
  exportArea.style.transformOrigin = "top left";
  container.style.width = size + "px";
  container.style.height = size + "px";
}

window.addEventListener("resize", scaleEditor);

/* ----------------------------------------------------------
   9. INIT EDITOR MODE
   ---------------------------------------------------------- */
function initEditorMode() {
  const btn = document.getElementById("initEditBtn");
  const card = document.getElementById("unifiedEditorCard");
  const toolbar = document.getElementById("mockupToolbar");
  if (!editorReady) {
    if (btn) btn.style.display = "none";
    if (card) card.style.display = "flex";
    if (toolbar) toolbar.style.display = "block";
    editorReady = true;
    loadDeviceList();
    applyDevice("p2", "f");
    // Modal needs a tick to finish layout before we can measure
    requestAnimationFrame(() => {
      scaleEditor();
      // Second pass in case font/resource loading shifted layout
      setTimeout(scaleEditor, 120);
    });
  }
}

/* ----------------------------------------------------------
   9. DEVICE LIST POPUP
   ---------------------------------------------------------- */
function loadDeviceList() {
  const popup = document.getElementById("popup-device");
  if (!popup) return;
  popup.innerHTML = "";
  DEVICES.forEach(d => {
    const chip = document.createElement("div");
    chip.className = "device-chip" + (d.id === currentDeviceId ? " active-chip" : "");
    chip.textContent = d.name;
    chip.dataset.id = d.id;
    chip.addEventListener("click", () => {
      document.querySelectorAll(".device-chip").forEach(c => c.classList.remove("active-chip"));
      chip.classList.add("active-chip");
      document.getElementById("editorDeviceVal").value = d.id;
      document.getElementById("editorDeviceNameStore").value = d.name;
      currentDeviceId = d.id;
      applyDevice(d.id, currentSide);
      closeAllPopups();
    });
    popup.appendChild(chip);
  });
}

/* ----------------------------------------------------------
   11. APPLY DEVICE
   ---------------------------------------------------------- */
function applyDevice(deviceId, side) {
  const dev = DEVICES.find(d => d.id === deviceId);
  if (!dev) return;
  const frameImg = document.getElementById("editorProcFrameImg");
  const mask = document.getElementById("editorScreenMask");
  const hint = document.getElementById("editorUploadHint");
  const src = side === "f" ? dev.f : dev.b;
  if (frameImg) { frameImg.src = src; frameImg.style.opacity = "1"; }
  const m = SCREEN_MASKS[deviceId] || SCREEN_MASKS["p2"];
  if (mask) {
    mask.style.left = m.x + "px";
    mask.style.top = m.y + "px";
    mask.style.width = m.w + "px";
    mask.style.height = m.h + "px";
  }
  // Always show the upload hint unless user already uploaded a screenshot
  const userImg = document.getElementById("editorProcUserImg");
  const hasScreenshot = userImg && userImg.src && userImg.src !== window.location.href;
  if (hint) hint.style.display = hasScreenshot ? "none" : "flex";
  // Re-apply scale in case container changed
  scaleEditor();
}

/* ----------------------------------------------------------
   11. SIDE TOGGLE
   ---------------------------------------------------------- */
function toggleEditorPhoneSide() {
  currentSide = currentSide === "f" ? "b" : "f";
  document.getElementById("editorPhoneSideVal").value = currentSide;
  applyDevice(currentDeviceId, currentSide);
  const icon = document.getElementById("editorPhoneIcon");
  if (icon) { icon.style.transform = "rotateY(180deg)"; setTimeout(() => icon.style.transform = "", 400); }
}

/* ----------------------------------------------------------
   12. SCREENSHOT UPLOAD
   ---------------------------------------------------------- */
function handleEditorSSUpload(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    const userImg = document.getElementById("editorProcUserImg");
    const hint = document.getElementById("editorUploadHint");
    if (userImg) { userImg.src = e.target.result; userImg.style.display = "block"; }
    if (hint) hint.style.display = "none";
  };
  reader.readAsDataURL(file);
  input.value = "";
}

/* ----------------------------------------------------------
   13. LOGO UPLOAD
   ---------------------------------------------------------- */
function handleEditorLogoUpload(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    const prev = document.getElementById("editorLogoPrev");
    const icon = document.getElementById("editorLogoIcon");
    if (prev) { prev.src = e.target.result; prev.style.display = "inline-block"; }
    if (icon) icon.style.display = "none";
    updateLiveWatermark();
  };
  reader.readAsDataURL(file);
  input.value = "";
}

/* ----------------------------------------------------------
   14. BACKGROUND
   ---------------------------------------------------------- */
function setEditorBgSolid(color) {
  const bg = document.getElementById("editorBgLayer");
  if (bg) bg.style.background = color;
  document.getElementById("editorBgTypeVal").value = "solid";
  document.getElementById("editorBgVal").value = color;
  document.getElementById("editorBgGrad1").value = "";
  document.getElementById("editorBgGrad2").value = "";
  closeAllPopups();
}

function setRandomGradient() {
  const hue1 = Math.floor(Math.random() * 360);
  const hue2 = (hue1 + 40 + Math.floor(Math.random() * 80)) % 360;
  const c1 = `hsl(${hue1},70%,40%)`;
  const c2 = `hsl(${hue2},80%,30%)`;
  const angle = Math.floor(Math.random() * 360);
  const bg = document.getElementById("editorBgLayer");
  if (bg) bg.style.background = `linear-gradient(${angle}deg,${c1},${c2})`;
  document.getElementById("editorBgTypeVal").value = "gradient";
  document.getElementById("editorBgGrad1").value = c1;
  document.getElementById("editorBgGrad2").value = c2;
}

/* ----------------------------------------------------------
   15. EFFECTS
   ---------------------------------------------------------- */
const EFFECT_STYLES = {
  none:     "",
  dots:     "radial-gradient(circle,rgba(255,255,255,.15) 1px,transparent 1px) 0 0/20px 20px",
  grid:     "linear-gradient(rgba(255,255,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.07) 1px,transparent 1px)",
  lines:    "repeating-linear-gradient(0deg,transparent,transparent 18px,rgba(255,255,255,.08) 18px,rgba(255,255,255,.08) 19px)",
  diagonal: "repeating-linear-gradient(45deg,rgba(255,255,255,.05),rgba(255,255,255,.05) 1px,transparent 1px,transparent 14px)",
  light:    "radial-gradient(ellipse at center,rgba(255,255,255,.18) 0%,transparent 70%)",
  darken:   "radial-gradient(ellipse at center,transparent 30%,rgba(0,0,0,.6) 100%)",
};

function setEditorEffect(effect, el) {
  document.querySelectorAll(".effect-chip").forEach(c => c.classList.remove("active-chip"));
  if (el) el.classList.add("active-chip");
  document.getElementById("editorEffectVal").value = effect;
  const layer = document.getElementById("editorEffectLayer");
  if (!layer) return;
  if (bubbleInterval) { clearInterval(bubbleInterval); bubbleInterval = null; }
  layer.innerHTML = "";
  layer.style.backgroundImage = "";
  layer.style.backgroundSize = "";
  if (effect === "bubbles") { spawnBubbles(layer); closeAllPopups(); return; }
  if (effect === "grid") { layer.style.backgroundImage = EFFECT_STYLES.grid; layer.style.backgroundSize = "20px 20px"; closeAllPopups(); return; }
  layer.style.backgroundImage = EFFECT_STYLES[effect] || "";
  closeAllPopups();
}

function spawnBubbles(layer) {
  function makeBubble() {
    const b = document.createElement("div");
    const size = 20 + Math.random() * 60;
    b.style.cssText = `position:absolute;width:${size}px;height:${size}px;border-radius:50%;border:1px solid rgba(255,255,255,.2);left:${Math.random()*90}%;bottom:-${size}px;animation:bubbleRise ${3+Math.random()*4}s linear forwards;pointer-events:none;`;
    layer.appendChild(b);
    setTimeout(() => b.remove(), 8000);
  }
  if (!document.getElementById("bubbleKeyframes")) {
    const s = document.createElement("style");
    s.id = "bubbleKeyframes";
    s.textContent = "@keyframes bubbleRise{0%{transform:translateY(0);opacity:.5}100%{transform:translateY(-1100px);opacity:0}}";
    document.head.appendChild(s);
  }
  bubbleInterval = setInterval(makeBubble, 600);
}

/* ----------------------------------------------------------
   16. WATERMARK
   ---------------------------------------------------------- */
function updateLiveWatermark() {
  const input = document.getElementById("editorWmInput");
  const fontRadio = document.querySelector("input[name=editorFont]:checked");
  const logoPrev = document.getElementById("editorLogoPrev");
  const tlEl = document.getElementById("wmTopLeft");
  const trEl = document.getElementById("wmTopRight");
  const bcEl = document.getElementById("wmBotCenter");
  const text = input ? input.value.trim() : "";
  const font = fontRadio ? fontRadio.value : "'Pacifico',cursive";
  const hasLogo = logoPrev && logoPrev.style.display !== "none" && logoPrev.src;
  if (tlEl) tlEl.innerHTML = "";
  if (trEl) trEl.innerHTML = "";
  if (bcEl) bcEl.innerHTML = "";
  if (!wmVisible) return;
  function makeText() {
    const span = document.createElement("span");
    span.textContent = text;
    span.style.fontFamily = font;
    span.style.fontSize = "32px";
    span.style.color = "rgba(255,255,255,.85)";
    span.style.textShadow = "0 2px 8px rgba(0,0,0,.5)";
    span.style.textTransform = "none";
    return span;
  }
  if (text) { if (tlEl) tlEl.appendChild(makeText()); if (trEl) trEl.appendChild(makeText()); }
  if (bcEl && (text || hasLogo)) {
    if (hasLogo) {
      const img = document.createElement("img");
      img.src = logoPrev.src;
      img.style.cssText = "width:36px;height:36px;border-radius:50%;object-fit:cover;border:2px solid rgba(255,255,255,.5);";
      bcEl.appendChild(img);
    }
    if (text) bcEl.appendChild(makeText());
  }
}

function toggleWatermarkVisibility() {
  wmVisible = !wmVisible;
  const icon = document.getElementById("wmEyeIcon");
  if (icon) icon.className = wmVisible ? "fa-solid fa-eye" : "fa-solid fa-eye-slash";
  const container = document.getElementById("wmContainer");
  if (container) container.style.opacity = wmVisible ? "1" : "0";
}

function selectEditorFontChip(el) {
  document.querySelectorAll(".font-chip").forEach(c => c.classList.remove("active-chip"));
  el.classList.add("active-chip");
  const radio = el.closest("label")?.querySelector("input[type=radio]");
  if (radio) radio.checked = true;
  updateLiveWatermark();
}

/* ----------------------------------------------------------
   17. PHONE SHADOW
   ---------------------------------------------------------- */
function togglePhoneShadow() {
  phoneShadowOn = !phoneShadowOn;
  const wrapper = document.getElementById("editorPhoneWrapper");
  const icon = document.getElementById("shadowToggleIcon");
  if (wrapper) wrapper.style.filter = phoneShadowOn ? "drop-shadow(0 40px 60px rgba(0,0,0,.7)) drop-shadow(0 10px 20px rgba(0,0,0,.5))" : "none";
  if (icon) icon.style.color = phoneShadowOn ? "var(--accent)" : "";
}

/* ----------------------------------------------------------
   18. FLOATING BUTTON
   ---------------------------------------------------------- */
function handleFloatingBtnClick() {
  toolbarVisible = !toolbarVisible;
  const toolbar = document.getElementById("mockupToolbar");
  if (toolbar) toolbar.style.display = toolbarVisible ? "block" : "none";
  const icon = document.getElementById("editorToggleIcon");
  if (icon) icon.className = toolbarVisible ? "fa-solid fa-pen" : "fa-solid fa-chevron-down";
}

/* ----------------------------------------------------------
   19. POPUP SYSTEM
   ---------------------------------------------------------- */
function openPopup(name, btnId) {
  const popup = document.getElementById("popup-" + name);
  const btn = document.getElementById(btnId);
  if (activePopup && activePopup !== popup) { activePopup.style.display = "none"; if (activeBtn) activeBtn.classList.remove("is-active"); }
  if (!popup) return;
  if (popup.style.display === "flex") { popup.style.display = "none"; if (btn) btn.classList.remove("is-active"); activePopup = null; activeBtn = null; return; }
  popup.style.display = "flex";
  if (btn) btn.classList.add("is-active");
  activePopup = popup;
  activeBtn = btn;
}

function closeAllPopups() {
  document.querySelectorAll(".editor-popup").forEach(p => p.style.display = "none");
  document.querySelectorAll(".mockup-tool-btn").forEach(b => b.classList.remove("is-active"));
  activePopup = null;
  activeBtn = null;
}

document.addEventListener("click", function (e) {
  if (activePopup && !activePopup.contains(e.target) && !e.target.closest(".mockup-tool-btn")) closeAllPopups();
});

/* ----------------------------------------------------------
   20. GENERATE FINAL MOCKUP
   ---------------------------------------------------------- */
async function generateFinalMockup() {
  const btn = document.getElementById("editorGenBtn");
  if (btn) { btn.disabled = true; btn.textContent = "GENERATING..."; }
  try {
    await buildCanvasManually();
  } catch (err) {
    console.error("Mockup generation error:", err);
    alert("Could not generate mockup. Make sure a screenshot is uploaded first.");
  }
  if (btn) { btn.disabled = false; btn.innerHTML = "<i class=\"fa-solid fa-mobile-screen\"></i> GENERATE MOCKUP"; }
}

async function buildCanvasManually() {
  const SIZE = 1000;
  const canvas = document.createElement("canvas");
  canvas.width = SIZE; canvas.height = SIZE;
  const ctx = canvas.getContext("2d");

  const bgLayer = document.getElementById("editorBgLayer");
  const bgType = document.getElementById("editorBgTypeVal")?.value || "solid";
  const bgGrad1 = document.getElementById("editorBgGrad1")?.value;
  const bgGrad2 = document.getElementById("editorBgGrad2")?.value;

  if (bgType === "gradient" && bgGrad1 && bgGrad2) {
    const grad = ctx.createLinearGradient(0, 0, SIZE, SIZE);
    grad.addColorStop(0, bgGrad1);
    grad.addColorStop(1, bgGrad2);
    ctx.fillStyle = grad;
  } else {
    ctx.fillStyle = bgLayer ? bgLayer.style.backgroundColor || bgLayer.style.background || "#c0392b" : "#c0392b";
  }
  ctx.fillRect(0, 0, SIZE, SIZE);

  const userImg = document.getElementById("editorProcUserImg");
  const scale = 0.75;
  const offset = (SIZE - SIZE * scale) / 2;

  if (userImg && userImg.style.display !== "none" && userImg.src) {
    const m = SCREEN_MASKS[currentDeviceId] || SCREEN_MASKS["p2"];
    const mx = offset + m.x * scale, my = offset + m.y * scale;
    const mw = m.w * scale, mh = m.h * scale;
    await drawImg(ctx, userImg.src, mx, my, mw, mh, true);
  }

  const frameImg = document.getElementById("editorProcFrameImg");
  if (frameImg && frameImg.src) {
    await drawImg(ctx, frameImg.src, offset, offset, SIZE * scale, SIZE * scale, false);
  }

  if (wmVisible) {
    const wmInput = document.getElementById("editorWmInput");
    const text = wmInput ? wmInput.value.trim() : "";
    if (text) {
      const fontRadio = document.querySelector("input[name=editorFont]:checked");
      const fontVal = fontRadio ? fontRadio.value.replace(/'/g,"").split(",")[0].trim() : "Pacifico";
      ctx.font = `30px "${fontVal}"`;
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.shadowBlur = 8;
      ctx.textAlign = "left";  ctx.fillText(text, 85, 115);
      ctx.textAlign = "right"; ctx.fillText(text, SIZE - 85, 115);
      ctx.textAlign = "center"; ctx.fillText(text, SIZE / 2, SIZE - 55);
      ctx.shadowBlur = 0;
    }
  }

  downloadCanvas(canvas);
}

function drawImg(ctx, src, x, y, w, h, clip) {
  return new Promise(resolve => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (clip) { ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); ctx.drawImage(img, x, y, w, h); ctx.restore(); }
      else ctx.drawImage(img, x, y, w, h);
      resolve();
    };
    img.onerror = () => resolve();
    img.src = src;
  });
}

function downloadCanvas(canvas) {
  const dev = DEVICES.find(d => d.id === currentDeviceId);
  const name = dev ? dev.name.replace(/[^a-z0-9]/gi, "_") : "mockup";
  const link = document.createElement("a");
  link.download = `n_mockup_${name}_${Date.now()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

/* ----------------------------------------------------------
   21. GUIDE BOXES (accordion)
   ---------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".guide-header").forEach(header => {
    header.addEventListener("click", function () {
      const content = this.nextElementSibling;
      if (!content) return;
      const isOpen = content.classList.contains("open");
      document.querySelectorAll(".guide-content").forEach(c => c.classList.remove("open"));
      if (!isOpen) content.classList.add("open");
    });
  });

  document.querySelectorAll(".wp-card").forEach(card => {
    card.classList.add("hidden-state");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("scroll-active"); entry.target.classList.remove("hidden-state"); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.1 });
    obs.observe(card);
  });
});

/* ----------------------------------------------------------
   22. IMAGE VIEWER
   ---------------------------------------------------------- */
function openImgViewer(src) {
  const viewer = document.getElementById("imgViewer");
  const img = document.getElementById("viewImg");
  if (!viewer || !img) return;
  img.src = src;
  viewer.style.display = "flex";
  requestAnimationFrame(() => viewer.classList.add("active"));
}

function closeImgViewer() {
  const viewer = document.getElementById("imgViewer");
  if (!viewer) return;
  viewer.classList.remove("active");
  setTimeout(() => viewer.style.display = "none", 300);
}

const imgViewerEl = document.getElementById("imgViewer");
if (imgViewerEl) imgViewerEl.addEventListener("click", e => { if (e.target === imgViewerEl) closeImgViewer(); });

/* END OF FILE */
