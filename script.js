// セーブデータ用キー
const STORAGE_KEY = "second_crown_progress_v1";

/**
 * 流し込み用スクリプト
 * - 1要素 = タイムライン上の1ステップ
 * - type: "line" | "sceneBreak"
 * - speaker: 話者名（ナレーションも含む）
 * - text: 本文
 * - bg / char: 背景ID・立ち絵ID（将来用）
 */
const script = [
  {
    id: "prologue_001",
    type: "line",
    speaker: "ナレーション",
    text: "夜更けの都市は、静かに軋む機械のように、ゆっくりと回転していた。",
    bg: "city_night",
    char: null
  },
  {
    id: "prologue_002",
    type: "line",
    speaker: "ナレーション",
    text: "ビルの谷間を縫うように吹き抜ける風は、どこか懐かしい焦げた匂いを運んでくる。",
    bg: "city_night",
    char: null
  },
  {
    id: "prologue_003",
    type: "line",
    speaker: "ナレーション",
    text: "君のスマホの画面には、見知らぬ送信者からの短いメッセージが、ひとつだけ光っていた。",
    bg: "city_night",
    char: null
  },
  {
    id: "prologue_004",
    type: "line",
    speaker: "ナレーション",
    text: "――この『観測』を、介入に変える気はあるか？",
    bg: "city_night",
    char: null
  },
  {
    id: "prologue_005",
    type: "line",
    speaker: "ナレーション",
    text: "指先が、躊躇いの輪郭をなぞる。ほんの少しだけ、世界が静かになる。",
    bg: "city_night",
    char: null
  },

  // ここが区切り（タイトルで言うプロローグの終端など）
  {
    id: "prologue_break_001",
    type: "sceneBreak"
  }

  // この下に第1章の行を足していくイメージ
  // {
  //   id: "fr_intro_001",
  //   type: "line",
  //   speaker: "ナレーション",
  //   text: "1792年5月。飢えと革命の熱狂に包まれたパリ。",
  //   bg: "paris_night",
  //   char: null
  // },
];

// タイムライン上の現在位置（script 配列のインデックス）
let currentIndex = 0;
// 「タップしたことがあるか」（TAPヒント制御用）
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

/**
 * 現在のブロックを取得
 */
function getCurrentBlock() {
  return script[currentIndex] || null;
}

/**
 * 進捗バー更新
 */
function updateProgress() {
  const total = script.length;
  if (!progressBar || total === 0) return;

  // 0〜1 の範囲で現在位置の割合を計算
  const progress = Math.min((currentIndex + 1) / total, 1);
  progressBar.style.width = `${progress * 100}%`;
}

/**
 * 現在位置を localStorage に保存
 */
function saveProgress() {
  try {
    const data = {
      index: currentIndex
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

/**
 * セーブデータ削除
 */
function clearProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn("Failed to clear progress:", e);
  }
}

/**
 * 現在のブロックを画面に反映
 */
function renderCurrentBlock() {
  const block = getCurrentBlock();
  if (!block) return;

  if (block.type === "line") {
    // セリフ・ナレーション
    if (nameLabel) {
      nameLabel.textContent = block.speaker || "";
    }
    if (textContent) {
      textContent.textContent = block.text || "";
    }

    // TODO: bg / char の反映は、このあと背景・立ち絵機能を足すときに実装

    updateProgress();
    saveProgress();
  } else if (block.type === "sceneBreak") {
    // 区切りオーバーレイ表示
    showSceneBreak();
    updateProgress();
    saveProgress();
  } else {
    // 未知の type はとりあえずスキップ候補（今は使わない）
    updateProgress();
  }
}

/**
 * 次のブロックへ進む
 */
function goToNextBlock() {
  const block = getCurrentBlock();
  if (!block) return;

  // sceneBreak 中はここでは進めず、オーバーレイ側に任せる
  if (block.type === "sceneBreak") {
    return;
  }

  if (currentIndex < script.length - 1) {
    currentIndex += 1;
    renderCurrentBlock();
  } else {
    // 一番最後まで来たら、とりあえず止める（ループさせたければここを変更）
    currentIndex = script.length - 1;
  }
}

/**
 * シーン区切りオーバーレイ表示
 */
function showSceneBreak() {
  if (!sceneBreakOverlay) return;
  sceneBreakOverlay.classList.add("scene-break--visible");
}

/**
 * シーン区切りオーバーレイを閉じて、次のブロックへ
 */
function proceedFromSceneBreak() {
  if (!sceneBreakOverlay) return;
  sceneBreakOverlay.classList.remove("scene-break--visible");

  if (currentIndex < script.length - 1) {
    currentIndex += 1;
    renderCurrentBlock();
  }
}

/**
 * 新しくゲームを開始（最初から）
 */
function startNewGame() {
  clearProgress();
  currentIndex = 0;
  hasUserTappedOnce = false;

  if (tapHint) {
    tapHint.style.display = "inline-block";
  }

  hideTitleScreen();
  renderCurrentBlock();
}

/**
 * 続きから再開
 */
function continueGame() {
  const saved = loadProgress();

  if (!saved) {
    // 進捗がない場合は最初から
    startNewGame();
    return;
  }

  currentIndex = saved.index;
  hasUserTappedOnce = true;

  if (tapHint) {
    tapHint.style.display = "none";
  }

  hideTitleScreen();
  renderCurrentBlock();
}

/**
 * タイトル画面を非表示
 */
function hideTitleScreen() {
  if (!titleScreen) return;
  titleScreen.style.display = "none";
}

/**
 * タイトル画面のセットアップ
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
  setupTitleScreen();

  // ここではまだ本編は描画しない（START/CONTINUE押下で開始）

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

    goToNextBlock();
  });

  // シーン区切りオーバーレイのタップ処理
  sceneBreakOverlay.addEventListener("click", () => {
    proceedFromSceneBreak();
  });
}

document.addEventListener("DOMContentLoaded", init);
