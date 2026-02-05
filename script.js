// ================================
// SECOND CROWN - Prototype
// script.js（全文上書き用）
// ================================

// ------- セーブ用キー -------
const STORAGE_KEY = "second_crown_progress_v1";

// ------- 背景マップ -------
const BG_MAP = {
  city_evening: "images/bg_city_night.jpg"
  // 今後増やしたらここに追記
};

// ------- 立ち絵マップ -------
const CHAR_MAP = {
  mia_normal: "images/char_mia_normal.png",
  iroha_normal: "images/char_iroha_normal.png"
};


// ------- シナリオ（1タップ＝1要素） -------
const script = [
  // Scene 1：見知らぬ街
  {
    id: "s1_001",
    type: "line",
    speaker: "かなめ（モノローグ）",
    text: "……視界が、切り替わった。",
    bg: "city_evening"
  },
  {
    id: "s1_002",
    type: "line",
    speaker: "かなめ（モノローグ）",
    text: "石畳。煤けた建物。聞き取れない言葉と、怒気を孕んだ空気。――転移。"
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
    speaker: "かなめ（モノローグ）",
    text: "声。すぐ近く。"
  },
  {
    id: "s1_005",
    type: "line",
    speaker: "？？？",
    text: "……ここ、は。",
    // ここで初めてミアを出す
    char: "mia_normal"
  },
  {
    id: "s1_006",
    type: "line",
    speaker: "かなめ（モノローグ）",
    text: "少女。白に近い金髪。どこか現実感の薄い存在感。"
  },
  {
    id: "s1_007",
    type: "line",
    speaker: "かなめ（モノローグ）",
    text: "――知っている。資料で、映像で、報告書で。"
  },
  {
    id: "s1_008",
    type: "line",
    speaker: "かなめ（モノローグ）",
    text: "でも――こうして隣に立つのは、初めてだ。"
  },

  // Scene 2：初対面
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
    speaker: "かなめ（モノローグ）",
    text: "名乗らない。自己紹介もない。ただ、確認するみたいな声音。"
  },
  {
    id: "s2_005",
    type: "line",
    speaker: "かなめ",
    text: "……それを、俺も知りたい。"
  },
  {
    id: "s2_006",
    type: "line",
    speaker: "？？？",
    text: "……。"
  },
  {
    id: "s2_007",
    type: "line",
    speaker: "？？？",
    text: "……そう、ですか。"
  },
  {
    id: "s2_008",
    type: "line",
    speaker: "かなめ（モノローグ）",
    text: "少しだけ、安堵した顔。自分だけが取り残されていない、と確認したみたいに。"
  },

  // Scene 3：ミアの不安
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
  {
    id: "s3_004",
    type: "line",
    speaker: "かなめ（モノローグ）",
    text: "説明としては、意味不明。でも、不思議と否定する気にならない。"
  },
  {
    id: "s3_005",
    type: "line",
    speaker: "？？？",
    text: "……すみません。私、今……少し、不安定で。"
  },
  {
    id: "s3_006",
    type: "line",
    speaker: "かなめ（モノローグ）",
    text: "この声。記録よりも、ずっと人間的だ。"
  },

  // Scene 4：通信割り込み
  {
    id: "s4_001",
    type: "line",
    speaker: "？？？（通信）",
    text: "――あー、聞こえてる？　二人とも。"
  },
  {
    id: "s4_002",
    type: "line",
    speaker: "かなめ（モノローグ）",
    text: "現代の音。はっきり、現実側の声。"
  },
  {
    id: "s4_003",
    type: "line",
    speaker: "？？？",
    text: "……通信。"
  },

  // Scene 5：いろは登場
  {
    id: "s5_001",
    type: "line",
    speaker: "いろは",
    text: "よし、繋がった。生存確認、問題なし。"
    char: "iroha_normal"   // ★いろは登場！ここで立ち絵を切り替える
  },
  {
    id: "s5_002",
    type: "line",
    speaker: "かなめ",
    text: "……いろはさん？"
  },
  {
    id: "s5_003",
    type: "line",
    speaker: "いろは",
    text: "正解。久しぶり、かなめくん。"
  },
  {
    id: "s5_004",
    type: "line",
    speaker: "かなめ（モノローグ）",
    text: "……やっぱり。嫌な予感は当たる。"
  },
  {
    id: "s5_005",
    type: "line",
    speaker: "いろは",
    text: "で――そっちの彼女が、ミア。"
  },
  {
    id: "s5_006",
    type: "line",
    speaker: "ミア",
    text: "……はい。それが、私の呼び名です。"
  },
  {
    id: "s5_007",
    type: "line",
    speaker: "かなめ（モノローグ）",
    text: "ここで、初めて名が出る。"
  },

  // Scene 6：立場の非対称
  {
    id: "s6_001",
    type: "line",
    speaker: "いろは",
    text: "簡単に説明するね。"
  },
  {
    id: "s6_002",
    type: "line",
    speaker: "いろは",
    text: "かなめくんは、君のことを知ってる。ミア。"
  },
  {
    id: "s6_003",
    type: "line",
    speaker: "ミア",
    text: "……そう、なんですか。"
  },
  {
    id: "s6_004",
    type: "line",
    speaker: "かなめ",
    text: "……存在だけ、です。"
  },
  {
    id: "s6_005",
    type: "line",
    speaker: "ミア",
    text: "……。"
  },
  {
    id: "s6_006",
    type: "line",
    speaker: "ミア",
    text: "……なるほど。"
  },
  {
    id: "s6_007",
    type: "line",
    speaker: "かなめ（モノローグ）",
    text: "否定も、警戒もない。ただ、受け入れるみたいな間。"
  },

  // Scene 7：時代の断定
  {
    id: "s7_001",
    type: "line",
    speaker: "いろは",
    text: "現在地。"
  },
  {
    id: "s7_002",
    type: "line",
    speaker: "いろは",
    text: "ここはフランス。時代は1792年。"
  },
  {
    id: "s7_003",
    type: "line",
    speaker: "ミア",
    text: "……革命の、直前。"
  },
  {
    id: "s7_004",
    type: "line",
    speaker: "かなめ（モノローグ）",
    text: "ここで初めて、彼女の中の何かが繋がる。"
  },
  {
    id: "s7_005",
    type: "line",
    speaker: "ミア",
    text: "……そうか。だから、こんなに……。"
  },
  {
    id: "s7_006",
    type: "line",
    speaker: "かなめ",
    text: "……？"
  },
  {
    id: "s7_007",
    type: "line",
    speaker: "ミア",
    text: "人の感情が、近い。"
  },

  // Scene 8：能力の起動
  {
    id: "s8_001",
    type: "line",
    speaker: "ミア",
    text: "……情報、参照できそうです。"
  },
  {
    id: "s8_002",
    type: "line",
    speaker: "いろは",
    text: "OK。説明が入ったことで、星屑が安定した。"
  },
  {
    id: "s8_003",
    type: "line",
    speaker: "かなめ（モノローグ）",
    text: "最初から“知っていた”わけじゃない。――今、開いた。"
  },

  // Scene 9：王宮の話
  {
    id: "s9_001",
    type: "line",
    speaker: "いろは",
    text: "この時代には、星屑を持つ人がいる。"
  },
  {
    id: "s9_002",
    type: "line",
    speaker: "ミア",
    text: "……王家。"
  },
  {
    id: "s9_003",
    type: "line",
    speaker: "いろは",
    text: "ルイ16世と、マリー・アントワネット。"
  },
  {
    id: "s9_004",
    type: "line",
    speaker: "かなめ（モノローグ）",
    text: "処刑される、未来の人たち。"
  },
  {
    id: "s9_005",
    type: "line",
    speaker: "いろは",
    text: "彼らは、君たちのことを夢で知っている。"
  },

  // Scene 10：同行の決断
  {
    id: "s10_001",
    type: "line",
    speaker: "いろは",
    text: "だから、最初の行動は一つ。"
  },
  {
    id: "s10_002",
    type: "line",
    speaker: "いろは",
    text: "王宮へ行って。彼らの話を聞いて。"
  },
  {
    id: "s10_003",
    type: "line",
    speaker: "ミア",
    text: "……あの。"
  },
  {
    id: "s10_004",
    type: "line",
    speaker: "かなめ",
    text: "？"
  },
  {
    id: "s10_005",
    type: "line",
    speaker: "ミア",
    text: "あなた……名前は。"
  },
  {
    id: "s10_006",
    type: "line",
    speaker: "かなめ",
    text: "……かなめ。"
  },
  {
    id: "s10_007",
    type: "line",
    speaker: "ミア",
    text: "……かなめ。"
  },
  {
    id: "s10_008",
    type: "line",
    speaker: "ミア",
    text: "……一緒に、行ってくれますか。"
  },
  {
    id: "s10_009",
    type: "line",
    speaker: "かなめ",
    text: "……ああ。"
  },
  {
    id: "s10_010",
    type: "line",
    speaker: "かなめ（モノローグ）",
    text: "初対面。でも――不思議と、拒む理由がなかった。"
  },
  {
    id: "s10_011",
    type: "line",
    speaker: "いろは",
    text: "決まりね。健闘を祈るわ、二人とも。"
  },
  {
    id: "s10_012",
    type: "line",
    speaker: "ミア",
    text: "……行きましょう。フランス王宮へ。"
  }
];

// ------- 状態管理 -------
let currentIndex = 0;

// ------- DOM 取得 -------
const gameScreen   = document.getElementById("game-screen");
const bgImage      = document.getElementById("bg-image");
const charImage    = document.getElementById("char-image");
const nameLabel    = document.getElementById("name-label");
const textContent  = document.getElementById("text-content");
const tapHint      = document.getElementById("tap-hint");
const progressBar  = document.getElementById("progress-bar");

// タイトル画面関連
const titleScreen  = document.getElementById("title-screen");
const btnStart     = document.getElementById("btn-start");
const btnContinue  = document.getElementById("btn-continue");

// ------- セーブ系 -------

function saveProgress() {
  try {
    const data = { index: currentIndex };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn("進行状況の保存に失敗しました:", e);
  }
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (typeof data.index === "number") {
      return data;
    }
    return null;
  } catch (e) {
    console.warn("進行状況の読み込みに失敗しました:", e);
    return null;
  }
}

function clearProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn("進行状況の削除に失敗しました:", e);
  }
}

// CONTINUE ボタンの有効 / 無効
function refreshContinueButton() {
  const saved = loadProgress();
  if (saved) {
    btnContinue.disabled = false;
    btnContinue.classList.remove("title-button--disabled");
  } else {
    btnContinue.disabled = true;
    btnContinue.classList.add("title-button--disabled");
  }
}

// ------- シナリオ描画 -------

function getCurrentBlock() {
  return script[currentIndex] || null;
}

// ここが「立ち絵を消さない」ようにした重要な部分
function updateVisuals(block) {
  if (!block) return;

  // 背景：bg が指定されているときだけ更新
  if ("bg" in block && block.bg && BG_MAP[block.bg]) {
    bgImage.src = BG_MAP[block.bg];
  }

  // 立ち絵：char プロパティが存在するブロックだけ処理
  //   - 文字列ならその立ち絵に差し替え
  //   - null / 空文字なら非表示
  //   - プロパティ自体が無いブロックでは「何もしない」
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

function updateProgress() {
  const total = script.length;
  const progress = Math.min((currentIndex + 1) / total, 1);
  progressBar.style.width = `${progress * 100}%`;
}

function renderCurrentBlock() {
  const block = getCurrentBlock();
  updateVisuals(block);
}

// ------- 進行操作 -------

function goToNextBlock() {
  if (currentIndex < script.length - 1) {
    currentIndex++;
    renderCurrentBlock();
    saveProgress();
  } else {
    // とりあえず最後まで行ったら TAP ヒントを消すだけ
    tapHint.style.opacity = "0";
  }
}

// ------- タイトル画面関連 -------

function startNewGame() {
  clearProgress();
  currentIndex = 0;
  renderCurrentBlock();
  saveProgress();
  hideTitleScreen();
}

function continueGame() {
  const saved = loadProgress();
  if (saved) {
    currentIndex = saved.index;
  } else {
    currentIndex = 0;
  }
  renderCurrentBlock();
  hideTitleScreen();
}

function hideTitleScreen() {
  if (titleScreen) {
    titleScreen.style.display = "none"; // CSS で flex になっているので、none で消す
  }
}

// ------- 初期化 -------

function init() {
  // ゲーム画面側を先に初期描画（タイトルが上に被さっている）
  currentIndex = 0;
  renderCurrentBlock();

  // CONTINUE ボタンの状態
  refreshContinueButton();

  // タイトルボタン
  if (btnStart) {
    btnStart.addEventListener("click", (e) => {
      e.stopPropagation();
      startNewGame();
    });
  }
  if (btnContinue) {
    btnContinue.addEventListener("click", (e) => {
      e.stopPropagation();
      continueGame();
    });
  }

  // 画面タップで進行（タイトル表示中は無視）
  if (gameScreen) {
    gameScreen.addEventListener("click", () => {
      if (
        titleScreen &&
        titleScreen.style.display !== "none"
      ) {
        // タイトルが出ている間は START/CONTINUE だけ有効にしたいので無視
        return;
      }
      goToNextBlock();
    });
  }
}

document.addEventListener("DOMContentLoaded", init);
