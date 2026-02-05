// シンプルなシーンデータの例
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

const gameScreen = document.getElementById("game-screen");
const nameLabel = document.getElementById("name-label");
const textContent = document.getElementById("text-content");
const sceneBreakOverlay = document.getElementById("scene-break");
const progressBar = document.getElementById("progress-bar");

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
 * テキストを描画
 */
function renderCurrentLine() {
  const scene = getCurrentScene();
  nameLabel.textContent = scene.speaker || "";
  const line = scene.lines[currentLineIndex] || "";
  textContent.textContent = line;
  updateProgress();
}

/**
 * 次の行へ進む
 */
function goToNextLine() {
  const scene = getCurrentScene();

  // まだ行が残っている場合
  if (currentLineIndex < scene.lines.length - 1) {
    currentLineIndex += 1;
    renderCurrentLine();
    return;
  }

  // 最後の行を読んだあと → 区切りオーバーレイを表示
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

  // 次シーンがあれば進む。なければとりあえず同じシーンをループ。
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
  const scene = getCurrentScene();
  nameLabel.textContent = scene.speaker || "";
  currentLineIndex = 0;
  renderCurrentLine();

  // 画面タップでテキストを進める
  gameScreen.addEventListener("click", (event) => {
    // オーバーレイが出ているときは、そちらのタップ優先
    if (sceneBreakOverlay.classList.contains("scene-break--visible")) {
      return;
    }

    // ボタン類のクリックは無視
    const target = event.target;
    if (target.closest(".ui-button")) {
      return;
    }

    goToNextLine();
  });

  // シーン区切りオーバーレイのタップ処理
  sceneBreakOverlay.addEventListener("click", () => {
    proceedFromSceneBreak();
  });
}

// DOMが読み込まれたら初期化
document.addEventListener("DOMContentLoaded", init);
