// ================================
// SECOND CROWN - Novel Prototype
// script.js（立ち絵切替 安定版）
// ================================

// ----------------
// 画像マップ
// ----------------
const BG_MAP = {
  city_evening: "images/bg_city_night.jpg"
};

const CHAR_MAP = {
  mia_normal: "images/char_mia_normal.png",
  iroha_normal: "images/char_iroha_normal.png"
};

// ----------------
// シナリオ
// ----------------
const script = [
  {
    speaker: "かなめ",
    text: "……視界が、切り替わった。",
    bg: "city_evening"
  },
  {
    speaker: "かなめ",
    text: "石畳。煤けた建物。怒気を孕んだ空気。――転移。"
  },
  {
    speaker: "？？？",
    text: "……っ。"
  },
  {
    speaker: "かなめ",
    text: "声。すぐ近く。"
  },
  {
    speaker: "？？？",
    text: "……ここ、は。",
    char: "mia_normal"   // ★ミア表示
  },
  {
    speaker: "かなめ",
    text: "少女。白に近い金髪。どこか現実感の薄い存在感。"
  },

  // ---- いろは登場 ----
  {
    speaker: "いろは",
    text: "――あー、聞こえてる？　二人とも。",
    char: "iroha_normal" // ★ここで必ず切り替わる
  },
  {
    speaker: "かなめ",
    text: "……いろはさん？"
  },
  {
    speaker: "いろは",
    text: "正解。久しぶり、かなめくん。"
  },
  {
    speaker: "いろは",
    text: "そっちの彼女が、ミア。"
  },

  // ---- ミアに戻す ----
  {
    speaker: "ミア",
    text: "……はい。それが、私の呼び名です。",
    char: "mia_normal"   // ★ここでミアに戻す
  },
  {
    speaker: "ミア",
    text: "……行きましょう。フランス王宮へ。"
  }
];

// ----------------
// 状態
// ----------------
let index = 0;

// ----------------
// DOM
// ----------------
const screen = document.getElementById("game-screen");
const bgImg = document.getElementById("bg-image");
const charImg = document.getElementById("char-image");
const nameBox = document.getElementById("name-label");
const textBox = document.getElementById("text-content");

// ----------------
// 描画
// ----------------
function render() {
  const line = script[index];
  if (!line) return;

  // 背景
  if (line.bg && BG_MAP[line.bg]) {
    bgImg.src = BG_MAP[line.bg];
  }

  // ★ 立ち絵：指定されたら必ず上書きする
  if (line.char && CHAR_MAP[line.char]) {
    charImg.src = CHAR_MAP[line.char];
    charImg.style.opacity = "1";
  }

  nameBox.textContent = line.speaker || "";
  textBox.textContent = line.text || "";
}

// ----------------
// 次へ
// ----------------
function next() {
  if (index < script.length - 1) {
    index++;
    render();
  }
}

// ----------------
// 初期化
// ----------------
document.addEventListener("DOMContentLoaded", () => {
  render();
  screen.addEventListener("click", next);
});
