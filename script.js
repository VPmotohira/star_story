// 進捗保存用キー
const STORAGE_KEY = "star_story_progress_v1";

// シーンデータ（仮）
// ※このあと増やしていく
const scenes = [
  {
    id: "scene_01",
    speaker: "Narration",
    lines: [
      "The city at night turned slowly, like a machine in need of oil.",
      "Wind slipped between towers, carrying the faint scent of something burned and long forgotten.",
      "On your phone, a single notification glowed from an unknown sender.",
      "— Will you turn this observation into interference?",
      "Your fingertip traces the outline of hesitation. For a moment, the world holds its breath."
    ]
  }
];

let currentSceneIndex = 0;
let currentLineIndex = 0;
let hasUserTappedOnce = false;

const gameScreen = document.getElementById("game-screen");
const nameLabel = document.getElementById("name-label");
const textContent = document.getElementById("text-content");
const sceneBreakOverlay = document.getElementById("scene-break");
const progressBar = document.getElementById("progress-bar");
const tapHint = document.getElementById("tap-hint");

// タイトル関連
const titleScreen = document.getElementById("title-screen");
const btnStart = document.getElementById("btn-start");
const btnContinue = document.getElementById("btn-continue");

/**
 * 現在のシーンオブジェクトを取得
 */
function getCurrentScene() {
  return scenes[currentSceneIndex];
}

/**
 * 進捗バー更新
 */
function updateProgress() {
  const scene = getCurrentScene();
  const totalLines = scene.lines.length;
  const progress = Math.min(currentLineIndex / totalLines, 1);
  progressBar.style.width = `${progress * 100}%`;
}

/**
 * 現在の状態を localStorage に保存
 */
function saveProgress() {
  try {
    const data = {
      sceneIndex: currentSceneIndex,
      lineIndex: currentLineIndex
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn("Failed to save progress:", e);
  }
}

/**
 * 保存されている進捗を読み込む
 */
function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);

    if (
      typeof data.sceneIndex === "number" &&
      typeof data.lineIndex === "number" &&
      data.sceneIndex >= 0 &&
      data.sceneIndex < scenes.length
    ) {
      const scene = scenes[data.sceneIndex];
      if (data.lineIndex >= 0 && data.lineIndex < scene.lines.length) {
        return data;
      }
    }
  } catch (e) {
    console.warn("Failed to load progress:", e);
  }
  return null;
}

/**
 * セーブデータを削除
 */
function clearProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn("Failed to clear progress:", e);
  }
}

/**
 * テキストを描画
 */
function renderCurrentLine() {
  const scene = getCurrentScene();
  nameLabel.textContent = scene.speaker || "";
  const line = scene.lines[currentLineIndex] || "";
  textContent.textContent = line;
  updateProgress();
  saveProgress();
}

/**
 * 次の行へ進む
 */
function goToNextLine() {
  const scene = getCurrentScene();

  if (currentLineIndex < scene.lines.length - 1) {
    currentLineIndex += 1;
    renderCurrentLine();
    return;
  }

  // 最後の行 → 区切りオーバーレイ
  showSceneBreak();
}

/**
 * シーン区切りオーバーレイ表示
 */
function showSceneBreak() {
  sceneBreakOverlay.classList.add("scene-break--visible");
}

/**
 * シーン区切りオーバーレイ非表示 & 次シーンへ（いまは同じシーンをループ）
 */
function proceedFromSceneBreak() {
  sceneBreakOverlay.classList.remove("scene-break--visible");

  if (currentSceneIndex < scenes.length - 1) {
    currentSceneIndex += 1;
  } else {
    currentSceneIndex = 0;
  }
  currentLineIndex = 0;
  renderCurrentLine();
}

/**
 * ゲーム本編をはじめから開始
 */
function startNewGame() {
  clearProgress();
  currentSceneIndex = 0;
  currentLineIndex = 0;
  hasUserTappedOnce = false;

  if (tapHint) {
    tapHint.style.display = "inline-block";
  }

  hideTitleScreen();
  renderCurrentLine();
}

/**
 * 続きから開始
 */
function continueGame() {
  const saved = loadProgress();

  if (!saved) {
    // 進捗がない場合は、はじめからと同じ挙動
    startNewGame();
    return;
  }

  currentSceneIndex = saved.sceneIndex;
  currentLineIndex = saved.lineIndex;
  hasUserTappedOnce = true;

  if (tapHint) {
    tapHint.style.display = "none";
  }

  hideTitleScreen();
  renderCurrentLine();
}

/**
 * タイトル画面を閉じる
 */
function hideTitleScreen() {
  if (!titleScreen) return;
  titleScreen.style.display = "none";
}

/**
 * タイトル画面を初期化
 */
function setupTitleScreen() {
  const saved = loadProgress();

  if (saved) {
    // CONTINUE 有効
    btnContinue.disabled = false;
    btnContinue.classList.remove("title-button--disabled");
  } else {
    // CONTINUE 無効
    btnContinue.disabled = true;
    btnContinue.classList.add("title-button--disabled");
  }

  // ボタンイベント
  btnStart.addEventListener("click", () => {
    startNewGame();
  });

  btnContinue.addEventListener("click", () => {
    if (btnContinue.disabled) return;
    continueGame();
  });
}

/**
 * 初期化
 */
function init() {
  // タイトル画面セットアップ
  setupTitleScreen();

  // ※この時点ではまだタイトルが前面にあるので、
  //   本編のテキストは描画しない（ボタン押下で開始）

  // 画面タップでテキストを進める
  gameScreen.addEventListener("click", (event) => {
    // タイトル画面が出ている間は何もしない
    if (titleScreen && titleScreen.style.display !== "none") {
      return;
    }

    // オーバーレイが出ているときは、そちらのタップ優先
    if (sceneBreakOverlay.classList.contains("scene-break--visible")) {
      return;
    }

    // ボタン類のクリックは無視
    const target = event.target;
    if (target.closest(".ui-button")) {
      return;
    }

    // 最初の1回タップしたら TAP ヒントを消す
    if (!hasUserTappedOnce) {
      hasUserTappedOnce = true;
      if (tapHint) {
        tapHint.style.display = "none";
      }
    }

    goToNextLine();
  });

  // シーン区切りオーバーレイのタップ処理
  sceneBreakOverlay.addEventListener("click", () => {
    proceedFromSceneBreak();
  });
}

document.addEventListener("DOMContentLoaded", init);
