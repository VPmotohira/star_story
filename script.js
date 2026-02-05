// セーブデータ用キー
const STORAGE_KEY = "second_crown_progress_v1";

/**
 * 流し込み用スクリプト
 */
const script = [
  {
    id: "test_001",
    type: "line",
    speaker: "ミア",
    text: "……ここが、あなたの世界。",
    bg: "city_night",
    char: "mia_normal"
  }
];

// 背景ID -> 画像パス
const BG_MAP = {
  city_night: "images/bg_city_night.jpg"
};

// 立ち絵ID -> 画像パス
const CHAR_MAP = {
  mia_normal: "images/char_mia_normal.png"
};

// タイムライン上の現在位置
let currentIndex = 0;
let hasUserTappedOnce = false;

// DOM取得
const gameScreen = document.getElementById("game-screen");
const nameLabel = document.getElementById("name-label");
const textContent = document.getElementById("text-content");
const sceneBreakOverlay = document.getElementById("scene-break");
const progressBar = document.getElementById("progress-bar");
const tapHint = document.getElementById("tap-hint");

// タイトル画面関連
const titleScreen = document.getElementById("title-screen");
const btnStart = document.getElementById("btn-start");
const btnContinue = document.getElementById("btn-continue");

// 背景＆立ち絵画像
const bgImage = document.getElementById("bg-image");
const charImage = document.getElementById("char-image");

function getCurrentBlock() {
  return script[currentIndex] || null;
}

function updateProgress() {
  const total = script.length;
  if (!progressBar || total === 0) return;
  const progress = Math.min((currentIndex + 1) / total, 1);
  progressBar.style.width = `${progress * 100}%`;
}

function saveProgress() {
  try {
    const data = { index: currentIndex };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn("Failed to save progress:", e);
  }
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (typeof data.index === "number") {
      const idx = data.index;
      if (idx >= 0 && idx < script.length) {
        return { index: idx };
      }
    }
  } catch (e) {
    console.warn("Failed to load progress:", e);
  }
  return null;
}

function clearProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn("Failed to clear progress:", e);
  }
}

function updateVisuals(block) {
  if (!block) return;

  // 背景
  if (bgImage) {
    if (block.bg && BG_MAP[block.bg]) {
      bgImage.src = BG_MAP[block.bg];
      bgImage.style.opacity = "1";
    }
  }

  // 立ち絵
  if (charImage) {
    if (block.char && CHAR_MAP[block.char]) {
      charImage.src = CHAR_MAP[block.char];
      charImage.style.opacity = "1";
    } else {
      charImage.style.opacity = "0";
    }
  }
}

function renderCurrentBlock() {
  const block = getCurrentBlock();
  if (!block) return;

  updateVisuals(block);

  if (block.type === "line") {
    if (nameLabel) nameLabel.textContent = block.speaker || "";
    if (textContent) textContent.textContent = block.text || "";
    updateProgress();
    saveProgress();
  } else if (block.type === "sceneBreak") {
    showSceneBreak();
    updateProgress();
    saveProgress();
  } else {
    updateProgress();
  }
}

function goToNextBlock() {
  const block = getCurrentBlock();
  if (!block) return;
  if (block.type === "sceneBreak") return;

  if (currentIndex < script.length - 1) {
    currentIndex += 1;
    renderCurrentBlock();
  } else {
    currentIndex = script.length - 1;
  }
}

function showSceneBreak() {
  if (!sceneBreakOverlay) return;
  sceneBreakOverlay.classList.add("scene-break--visible");
}

function proceedFromSceneBreak() {
  if (!sceneBreakOverlay) return;
  sceneBreakOverlay.classList.remove("scene-break--visible");
  if (currentIndex < script.length - 1) {
    currentIndex += 1;
    renderCurrentBlock();
  }
}

function startNewGame() {
  clearProgress();
  currentIndex = 0;
  hasUserTappedOnce = false;
  if (tapHint) tapHint.style.display = "inline-block";
  hideTitleScreen();
  renderCurrentBlock();
}

function continueGame() {
  const saved = loadProgress();
  if (!saved) {
    startNewGame();
    return;
  }
  currentIndex = saved.index;
  hasUserTappedOnce = true;
  if (tapHint) tapHint.style.display = "none";
  hideTitleScreen();
  renderCurrentBlock();
}

function hideTitleScreen() {
  if (!titleScreen) return;
  titleScreen.style.display = "none";
}

function setupTitleScreen() {
  const saved = loadProgress();
  if (saved) {
    btnContinue.disabled = false;
    btnContinue.classList.remove("title-button--disabled");
  } else {
    btnContinue.disabled = true;
    btnContinue.classList.add("title-button--disabled");
  }

  btnStart.addEventListener("click", () => {
    startNewGame();
  });

  btnContinue.addEventListener("click", () => {
    if (btnContinue.disabled) return;
    continueGame();
  });
}

function init() {
  setupTitleScreen();

  gameScreen.addEventListener("click", (event) => {
    if (titleScreen && titleScreen.style.display !== "none") return;
    if (sceneBreakOverlay.classList.contains("scene-break--visible")) return;

    const target = event.target;
    if (target.closest(".ui-button")) return;

    if (!hasUserTappedOnce) {
      hasUserTappedOnce = true;
      if (tapHint) tapHint.style.display = "none";
    }

    goToNextBlock();
  });

  sceneBreakOverlay.addEventListener("click", () => {
    proceedFromSceneBreak();
  });
}

document.addEventListener("DOMContentLoaded", init);
