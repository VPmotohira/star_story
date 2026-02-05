// ================================
// SECOND CROWN - Novel Prototype
// script.js（全文上書き用）
// ================================

// --- セーブデータキー ---
const STORAGE_KEY = "second_crown_progress_v1";

// --- 背景画像マップ ---
const BG_MAP = {
  city_evening: "images/bg_city_night.jpg",
  palace_room: "images/bg_city_night.jpg"
};

// --- 立ち絵マップ ---
const CHAR_MAP = {
  mia_normal: "images/char_mia_normal.png"
};

// --- シナリオデータ ---
const script = [
  // Scene 1
  {
    id: "s1_001",
    type: "line",
    speaker: "かなめ",
    text: "……視界が、切り替わった。",
    bg: "city_evening"
  },
  {
    id: "s1_002",
    type: "line",
    speaker: "かなめ",
    text: "石畳。煤けた建物。怒気を孕んだ空気。――転移。"
  },
  {
    id: "s1_003",
    type: "line",
    speaker: "？？？",
    text: "……っ。"
  },
  {
    id: "s1_004",
    type: "line",
    speaker: "かなめ",
    text: "声。すぐ近く。"
  },
  {
    id: "s1_005",
    type: "line",
    speaker: "？？？",
    text: "……ここ、は。",
    char: "mia_normal"
  },
  {
    id: "s1_006",
    type: "line",
    speaker: "かなめ",
    text: "少女。白に近い金髪。どこか現実感の薄い存在感。"
  },
  {
    id: "s1_007",
    type: "line",
    speaker: "かなめ",
    text: "――知っている。資料で、映像で、報告書で。"
  },

  // Scene 2
  {
    id: "s2_001",
    type: "line",
    speaker: "？？？",
    text: "……あの。"
  },
  {
    id: "s2_002",
    type: "line",
    speaker: "かなめ",
    text: "……はい。"
  },
  {
    id: "s2_003",
    type: "line",
    speaker: "？？？",
    text: "ここは……どこですか。"
  },
  {
    id: "s2_004",
    type: "line",
    speaker: "かなめ",
    text: "……それを、俺も知りたい。"
  },

  // Scene 3
  {
    id: "s3_001",
    type: "line",
    speaker: "？？？",
    text: "……大丈夫。"
  },
  {
    id: "s3_002",
    type: "line",
    speaker: "かなめ",
    text: "？"
  },
  {
    id: "s3_003",
    type: "line",
    speaker: "？？？",
    text: "夢、じゃないですけど……現実も、まだ確定していません。"
  },

  // Scene 4
  {
    id: "s4_001",
    type: "line",
    speaker: "？？？（通信）",
    text: "――あー、聞こえてる？　二人とも。"
  },

  // Scene 5
  {
    id: "s5_001",
    type: "line",
    speaker: "いろは",
    text: "よし、繋がった。生存確認、問題なし。"
  },
  {
    id: "s5_002",
    type: "line",
    speaker: "いろは",
    text: "で――そっちの彼女が、ミア。"
  },
  {
    id: "s5_003",
    type: "line",
    speaker: "ミア",
    text: "……はい。それが、私の呼び名です。"
  },

  // Scene 10
  {
    id: "s10_001",
    type: "line",
    speaker: "ミア",
    text: "……一緒に、行ってくれますか。"
  },
  {
    id: "s10_002",
    type: "line",
    speaker: "かなめ",
    text: "……ああ。"
  }
];

// --- 状態管理 ---
let currentIndex = 0;

// --- DOM取得 ---
const gameScreen = document.getElementById("game-screen");
const bgImage = document.getElementById("bg-image");
const charImage = document.getElementById("char-image");
const nameLabel = document.getElementById("name-label");
const textContent = document.getElementById("text-content");
const tapHint = document.getElementById("tap-hint");
const progressBar = document.getElementById("progress-bar");

// --- 現在ブロック取得 ---
function getCurrentBlock() {
  return script[currentIndex] || null;
}

// --- 表示更新（★重要修正版） ---
function updateVisuals(block) {
  if (!block) return;

  // 背景：指定があるときだけ更新
  if ("bg" in block && block.bg && BG_MAP[block.bg]) {
    bgImage.src = BG_MAP[block.bg];
  }

  // 立ち絵：
  // char が「書いてあるブロック」だけ処理する
  if ("char" in block) {
    if (block.char && CHAR_MAP[block.char]) {
      charImage.src = CHAR_MAP[block.char];
      charImage.style.opacity = "1";
    } else {
      charImage.style.opacity = "0";
    }
  }

  nameLabel.textContent = block.speaker || "";
  textContent.textContent = block.text || "";

  updateProgress();
}

// --- 進捗バー ---
function updateProgress() {
  const total = script.length;
  const progress = Math.min((currentIndex + 1) / total, 1);
  progressBar.style.width = `${progress * 100}%`;
}

// --- 次へ ---
function goNext() {
  if (currentIndex < script.length - 1) {
    currentIndex++;
    render();
  }
}

// --- 描画 ---
function render() {
  const block = getCurrentBlock();
  updateVisuals(block);
}

// --- 初期化 ---
function init() {
  render();

  gameScreen.addEventListener("click", () => {
    goNext();
  });
}

document.addEventListener("DOMContentLoaded", init);
