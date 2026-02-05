// 進捗保存用キー
const STORAGE_KEY = "star_story_progress_v1";

// シーンデータ
const scenes = [
  {
    id: "scene_01",
    speaker: "ナレーション",
    lines: [
      "夜更けの都市は、静かに軋む機械のように、ゆっくりと回転していた。",
      "ビルの谷間を縫うように吹き抜ける風は、どこか懐かしい焦げた匂いを運んでくる。",
      "君のスマホの画面には、見知らぬ送信者からの短いメッセージが、ひとつだけ光っていた。",
      "――この『観測』を、介入に変える気はあるか？",
      "指先が、躊躇いの輪郭をなぞる。ほんの少しだけ、世界が静かになる。"
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
 * 初期化
 */
function init() {
  const saved = loadProgress();

  if (saved) {
    // 2回目以降の訪問：途中から＋TAPは最初から非表示
    currentSceneIndex = saved.sceneIndex;
    currentLineIndex = saved.lineIndex;
    hasUserTappedOnce = true;
    if (tapHint) {
      tapHint.style.display = "none";
    }
  } else {
    // 初回訪問
    currentSceneIndex = 0;
    currentLineIndex = 0;
  }

  renderCurrentLine();

  // 画面タップでテキストを進める
  gameScreen.addEventListener("click", (event) => {
    if (sceneBreakOverlay.classList.contains("scene-break--visible")) {
      return;
    }

    // ボタン類のクリックは無視
    const target = event.target;
    if (target.closest(".ui-button")) {
      return;
    }

    // 最初の1回タップしたら TAP ヒントを完全に消す
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
