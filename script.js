const entryGate = document.getElementById("entryGate");
const startButton = document.getElementById("startButton");
const chatInterface = document.getElementById("chatInterface");
const messagesContainer = document.getElementById("messagesContainer");
const actionContainer = document.getElementById("actionContainer");
const bgMusic = document.getElementById("bgMusic");
const heartsContainer = document.getElementById("heartsContainer");

// Sequence of messages
const messages = [
  "halo",
  "aku ada pesan dari si bos",
  "katanya si bos sayang banget sama mu",
  "love you banyaa banyaa",
];

let messageIndex = 0;

// Start interaction
startButton.addEventListener("click", () => {
  // Start background music
  bgMusic.play().catch((err) => console.log("Autoplay blocked:", err));

  // Fade out the gate
  entryGate.classList.add("opacity-0");

  setTimeout(() => {
    entryGate.classList.add("hidden");

    // Show chat interface
    chatInterface.classList.remove("hidden");
    // Trigger reflow to apply transition
    void chatInterface.offsetWidth;
    chatInterface.classList.remove("opacity-0");

    // Start typing sequence after a brief pause
    setTimeout(showNextMessage, 1200);

    // Start floating hearts
    setInterval(createFloatingHeart, 600);
    // Create a few initial hearts immediately
    for (let i = 0; i < 5; i++) {
      setTimeout(createFloatingHeart, i * 100);
    }
  }, 1000);
});

function createFloatingHeart() {
  if (!heartsContainer) return;

  const heart = document.createElement("div");
  heart.className = "floating-heart";

  // Random heart emoji
  const heartEmojis = ["❤️", "💖", "💕", "💗", "💓", "✨"];
  heart.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

  // Random position and animation properties
  const leftPos = Math.random() * 100;
  const duration = Math.random() * 4 + 4; // 4 to 8 seconds
  const size = Math.random() * 15 + 15; // 15px to 30px

  heart.style.left = `${leftPos}vw`;
  heart.style.animationDuration = `${duration}s`;
  heart.style.fontSize = `${size}px`;

  heartsContainer.appendChild(heart);

  // Cleanup to prevent memory leaks
  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

// HTML for the left-aligned chat bubble tail
const tailHTML = `<div class="absolute -left-[6px] bottom-0 w-0 h-0 border-t-[10px] border-t-transparent border-r-[10px] border-r-lavender-purple border-b-[0px]"></div>`;

function showTypingIndicator() {
  const indicatorId = "typingIndicator";
  const div = document.createElement("div");
  div.id = indicatorId;
  div.className = "self-start max-w-[80%] relative animate-fade-up opacity-0";
  div.innerHTML = `
        <div class="bg-lavender-purple px-4 py-3 rounded-2xl rounded-bl-none text-gray-700 shadow-sm relative">
            ${tailHTML}
            <div class="flex gap-1 items-center h-5 px-1">
                <span class="w-1.5 h-1.5 bg-gray-500 rounded-full typing-dot"></span>
                <span class="w-1.5 h-1.5 bg-gray-500 rounded-full typing-dot"></span>
                <span class="w-1.5 h-1.5 bg-gray-500 rounded-full typing-dot"></span>
            </div>
        </div>
    `;
  messagesContainer.appendChild(div);
  scrollToBottom();
}

function removeTypingIndicator() {
  const indicator = document.getElementById("typingIndicator");
  if (indicator) {
    indicator.remove();
  }
}

function showMessage(text) {
  const div = document.createElement("div");
  div.className = "self-start max-w-[85%] relative animate-fade-up opacity-0";
  div.innerHTML = `
        <div class="bg-lavender-purple px-5 py-3 rounded-2xl rounded-bl-none text-gray-700 shadow-sm text-[15px] leading-relaxed relative">
            ${tailHTML}
            ${text}
        </div>
    `;
  messagesContainer.appendChild(div);
  scrollToBottom();
}

function scrollToBottom() {
  messagesContainer.scrollTo({
    top: messagesContainer.scrollHeight,
    behavior: "smooth",
  });
}

function showNextMessage() {
  if (messageIndex < messages.length) {
    showTypingIndicator();

    // Show typing indicator for 1.5 seconds
    setTimeout(() => {
      removeTypingIndicator();
      showMessage(messages[messageIndex]);
      messageIndex++;

      // Wait before showing the next typing indicator (giving time to read)
      setTimeout(showNextMessage, 1500);
    }, 1500);
  } else {
    // After last message, wait 1 second then show the final action button
    setTimeout(() => {
      actionContainer.classList.remove(
        "opacity-0",
        "pointer-events-none",
        "translate-y-4",
      );
      // Add padding so the button doesn't cover the last message
      messagesContainer.style.paddingBottom = "5rem";
      scrollToBottom();
    }, 1000);
  }
}

// --- Phase 2 Logic ---
const lanjutButton = document.getElementById("lanjutButton");
const phase2Container = document.getElementById("phase2Container");
const nindyCard = document.getElementById("nindyCard");
const initialQuestion = document.getElementById("initialQuestion");
const cardContent = document.getElementById("cardContent");
const sentenceDisplay = document.getElementById("sentenceDisplay");
const progressIndicator = document.getElementById("progressIndicator");

// 10 Kalimat Romantis
const nindySentences = [
  "Nindy adalah sebuah puisi indah yang tak pernah lelah kubaca.",
  "Di kedalaman matamu, Nindy, kutemukan ketenangan yang lama kucari.",
  "Kehadiran Nindy bagaikan fajar yang lembut menyibak kelamnya malam.",
  "Setiap senyum Nindy adalah melodi yang mengalun menenangkan benakku.",
  "Nindy, sosok anggun yang mengajariku makna dari sebuah ketulusan.",
  "Berada di sisi Nindy merupakan sebuah kemewahan waktu yang tak terhingga.",
  "Dalam setiap doa yang kurapal, nama Nindy senantiasa tersemat di dalamnya.",
  "Nindy adalah mahakarya semesta yang paling kusyukuri kehadirannya.",
  "Rasaku pada Nindy tumbuh laksana akar yang menjalar tenang, namun menguatkan.",
  "Teruntuk Nindy, izinkan aku menjadi satu-satunya tempatmu berpulang.",
];

let nindyIndex = 0;
let phase2Started = false;

lanjutButton.addEventListener("click", () => {
  // Fade out chat interface
  chatInterface.classList.add("opacity-0");
  setTimeout(() => {
    chatInterface.classList.add("hidden");

    // Show phase 2
    phase2Container.classList.remove("hidden");
    void phase2Container.offsetWidth; // Trigger reflow
    phase2Container.classList.remove("opacity-0");
  }, 1000);
});

nindyCard.addEventListener("click", () => {
  if (!phase2Started) {
    // First click: hide question, show content
    initialQuestion.classList.add("opacity-0");
    setTimeout(() => {
      initialQuestion.classList.add("hidden");
      cardContent.classList.remove("hidden");
      cardContent.classList.add("flex");
      void cardContent.offsetWidth; // Trigger reflow
      cardContent.classList.remove("opacity-0");

      showNindySentence();
      phase2Started = true;
    }, 500);
  } else {
    // Next clicks: show next sentence
    nindyIndex++;
    if (nindyIndex < nindySentences.length) {
      showNindySentence();
    } else {
      // Reached end, trigger heart burst again
      triggerHeartBurst();
    }
  }
});

function showNindySentence() {
  progressIndicator.innerText = `${nindyIndex + 1}/10`;

  const sentence = nindySentences[nindyIndex];
  const isLast = nindyIndex === nindySentences.length - 1;

  const textClass = isLast
    ? "font-quicksand text-[1.4rem] font-bold text-pink-500 tracking-wide drop-shadow-sm leading-relaxed"
    : "font-quicksand text-xl font-medium text-gray-700 leading-relaxed";

  sentenceDisplay.innerHTML = `<p class="${textClass} animate-fade-up opacity-0 relative z-10" style="animation-duration: 0.8s; animation-fill-mode: forwards;">${sentence}</p>`;

  if (isLast) {
    triggerHeartBurst();
  }
}

function triggerHeartBurst() {
  for (let i = 0; i < 40; i++) {
    setTimeout(createFloatingHeart, i * 40);
  }

  // Reveal Scroll Hint and Gallery
  setTimeout(() => {
    const scrollHint = document.getElementById("scrollHint");
    const polaroidGallery = document.getElementById("polaroidGallery");
    const praiseSection = document.getElementById("praiseSection");

    scrollHint.classList.remove("hidden");
    polaroidGallery.classList.remove("hidden");
    if (praiseSection) praiseSection.classList.remove("hidden");

    void scrollHint.offsetWidth; // Trigger reflow

    scrollHint.classList.remove("opacity-0");
    polaroidGallery.classList.remove("opacity-0");
    if (praiseSection) praiseSection.classList.remove("opacity-0");

    initPolaroidGallery();
    initPraiseCards();
    initCatStickers();
    initCuteGame();
    initScoreGame();
    initStarryNight();
  }, 2000);
}

// --- Phase 3 Logic ---
function initPolaroidGallery() {
  const grid = document.getElementById("polaroidGrid");
  if (grid.children.length > 0) return; // Prevent double initialization

  // TARUH NAMA FILE FOTO DI SINI SECARA BERURUTAN
  // (Pastikan file fotonya ditaruh di folder img)
  const photos = [
    "img/senyum.jpeg", // Foto 1
    "img/angwy.jpeg", // Foto 2
    "img/sejuta.jpeg", // Foto 3
    "img/jepret.jpeg", // Foto 4
    "img/imup.jpeg", // Foto 5
    "img/mambar.jpeg", // Foto 6
    "img/p1.jpeg", // Foto 7
    "img/p2.jpeg", // Foto 8
  ];

  const captions = [
    "Senyum favorit yang selalu ditunggu. 🤭",
    "Mai kisah angryy. 😠",
    "Mai kisah dengan sejuta pesonanya.",
    "Selalu cantik di setiap jepretan. 🌸",
    "Lucu banget sih ciwi siapa ini? 🤭",
    "Mambar.",
    "Potbar pertama.",
    "Potbar kedua. 🤭",
  ];

  captions.forEach((caption, idx) => {
    // Random rotation between -3 and 3 degrees
    const rotation = (Math.random() * 6 - 3).toFixed(1);

    const polaroid = document.createElement("div");
    // Initial state: hidden, moved down, scaled down
    polaroid.className =
      "polaroid-item opacity-0 transform translate-y-12 scale-95 transition-all duration-[800ms] ease-out bg-white p-3 pb-8 md:p-4 md:pb-12 shadow-xl rounded-sm";
    // Store the target rotation so the observer can use it
    polaroid.dataset.rotation = rotation;

    // Menggunakan padding-top: 177.78% agar rasionya 9:16
    polaroid.innerHTML = `
            <div class="relative w-full overflow-hidden bg-gray-200 shadow-inner" style="padding-top: 177.78%;">
                <img src="${photos[idx]}" loading="lazy" decoding="async" onerror="this.src='https://via.placeholder.com/360x640?text=Ganti+Foto+${idx + 1}'" alt="Memory ${idx + 1}" class="absolute inset-0 w-full h-full object-cover grayscale-[20%] contrast-[1.1] hover:grayscale-0 hover:scale-105 transition-all duration-700">
            </div>
            <p class="font-caveat text-2xl md:text-3xl text-center text-gray-800 mt-4 md:mt-6 px-1 leading-tight">${caption}</p>
        `;

    grid.appendChild(polaroid);
  });

  // Intersection Observer to trigger scroll animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const rot = el.dataset.rotation;

          // Animate to visible, normal position, and final rotation
          el.classList.remove("opacity-0");
          el.style.transform = `translateY(0) scale(1) rotate(${rot}deg)`;

          // Stop observing once animated
          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of the item is visible
      rootMargin: "0px 0px -50px 0px", // Trigger slightly before it hits the bottom
    },
  );

  document
    .querySelectorAll(".polaroid-item")
    .forEach((el) => observer.observe(el));
}

// --- Phase 4 Logic ---
function initPraiseCards() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.classList.remove("opacity-0", "translate-y-12");
          el.classList.add("translate-y-0");
          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  document
    .querySelectorAll(".praise-card")
    .forEach((el) => observer.observe(el));
}

// --- Phase 5 Logic (Cat Stickers) ---

// TARUH FOTO KUCING DAN TEKSNYA DI SINI
const catStickersData = [
  {
    image: "stiker/imup.jpeg", // Ganti nama file foto kucing ke-1
    text: "Imup 💕", // Ganti teks kucing ke-1
  },
  {
    image: "stiker/heuh.jpeg", // Ganti nama file foto kucing ke-2
    text: "Heuh😡", // Ganti teks kucing ke-2
  },
  {
    image: "stiker/himanis.jpeg", // Ganti nama file foto kucing ke-3
    text: "Hi Manis🤭", // Ganti teks kucing ke-3
  },
];

function initCatStickers() {
  const container = document.getElementById("catStickersContainer");
  if (!container || container.children.length > 0) return; // Prevent double initialization

  // Observer khusus untuk stiker kucing
  const catObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("opacity-0", "translate-y-12");
        entry.target.classList.add("translate-y-0");
        catObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  catStickersData.forEach((sticker, idx) => {
    // Delay staggered animation
    const delay = idx * 200 + 100;

    const card = document.createElement("div");
    card.className =
      "praise-card opacity-0 transform translate-y-12 transition-all duration-[800ms] ease-out bg-white/40 backdrop-blur-xl border border-pink-200 rounded-[2rem] p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] flex flex-col items-center justify-center hover:-translate-y-2 hover:shadow-xl hover:bg-white/50 cursor-default";
    card.style.transitionDelay = `${delay}ms`;

    // Default image fallback if local image is not found yet
    const defaultImgs = [
      "https://media1.tenor.com/m/5aAMnFmC4fQAAAAC/peach-cat.gif",
      "https://media1.tenor.com/m/u6tU6jI7YjAAAAAC/peach-cat-kiss.gif",
      "https://media1.tenor.com/m/Xf-xGgLOr3QAAAAC/peach-and-goma-peach-cat.gif",
    ];

    card.innerHTML = `
      <img src="${sticker.image}" loading="lazy" decoding="async" onerror="this.src='${defaultImgs[idx]}'" alt="Kucing ${idx + 1}" class="w-48 h-40 object-contain drop-shadow-sm mb-4">
      <p class="font-quicksand font-bold text-pink-400 text-lg tracking-wide text-center">${sticker.text}</p>
    `;

    container.appendChild(card);
    catObserver.observe(card); // Observe elemen yang baru dibuat!
  });
}

// --- Phase 6 Logic (Cute Game) ---
function initCuteGame() {
  const btnNo = document.getElementById("btnNo");
  const btnYes = document.getElementById("btnYes");
  const gameSuccess = document.getElementById("gameSuccess");
  const gameCard = document.getElementById("gameCard");

  if (!btnNo || btnNo.dataset.initialized) return;
  btnNo.dataset.initialized = "true";

  const moveButton = () => {
    const cardRect = gameCard.getBoundingClientRect();
    const btnRect = btnNo.getBoundingClientRect();

    // Memastikan tombol tidak keluar dari batas kartu
    const maxX = cardRect.width - btnRect.width - 20;
    const maxY = cardRect.height - btnRect.height - 20;

    const randomX = Math.floor(Math.random() * maxX) + 10;
    const randomY = Math.floor(Math.random() * maxY) + 10;

    btnNo.style.position = "absolute";
    btnNo.style.left = `${randomX}px`;
    btnNo.style.top = `${randomY}px`;
  };

  // Saat disentuh atau didekati mouse, tombol lari
  btnNo.addEventListener("mouseover", moveButton);
  btnNo.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moveButton();
  });

  // Saat tombol Yes diklik, tampilkan pesan sukses dan ledakan hati
  btnYes.addEventListener("click", () => {
    gameSuccess.classList.remove("hidden");
    void gameSuccess.offsetWidth;
    gameSuccess.classList.remove("opacity-0");
    triggerHeartBurst();
  });

  // Animasi scroll-reveal untuk game container
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.classList.remove("opacity-0", "translate-y-12");
          el.classList.add("translate-y-0");
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.1 },
  );

  const gameSection = document.getElementById("gameSection");
  if (gameSection) observer.observe(gameSection);
}

// --- Phase 7 Logic (Score Game) ---
function initScoreGame() {
  const gameSection = document.getElementById("scoreGameSection");
  if (!gameSection) return;

  const btnStart = document.getElementById("btnStartGame");
  const overlay = document.getElementById("gameStartOverlay");
  const timeDisplay = document.getElementById("timeLeft");
  const scoreDisplay = document.getElementById("gameScore");
  const cells = document.querySelectorAll(".game-cell");
  const resultContainer = document.getElementById("gameResult");
  const resultMessage = document.getElementById("gameResultMessage");

  if (!btnStart || btnStart.dataset.initialized) return;
  btnStart.dataset.initialized = "true";

  let score = 0;
  let timeLeft = 15;
  let gameInterval = null;
  let popInterval = null;
  let isPlaying = false;
  let activeCell = null;

  function startGame() {
    if (isPlaying) return;
    isPlaying = true;
    score = 0;
    timeLeft = 15;
    scoreDisplay.innerText = score;
    timeDisplay.innerText = timeLeft;

    overlay.classList.add("hidden");
    resultContainer.classList.add("hidden");

    // Clear board
    cells.forEach((c) => (c.innerHTML = ""));

    // Countdown Timer
    gameInterval = setInterval(() => {
      timeLeft--;
      timeDisplay.innerText = timeLeft;
      if (timeLeft <= 0) {
        endGame();
      }
    }, 1000);

    // Heart popping logic
    popInterval = setInterval(() => {
      if (activeCell) activeCell.innerHTML = "";

      const emptyCells = Array.from(cells).filter((c) => c !== activeCell);
      const randomCell =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];

      randomCell.innerHTML = "💖";
      randomCell.classList.add("animate-pulse");
      activeCell = randomCell;
    }, 600); // Heart pops every 600ms
  }

  function endGame() {
    isPlaying = false;
    clearInterval(gameInterval);
    clearInterval(popInterval);
    if (activeCell) activeCell.innerHTML = "";

    overlay.classList.remove("hidden");
    btnStart.innerText = "Main Lagi";

    resultContainer.classList.remove("hidden");

    if (score >= 15) {
      resultMessage.innerText = `Skor kamu ${score}! Hebat banget, emang ahlinya nangkep hatiku! 🤭`;
      triggerHeartBurst(); // Ledakan hati untuk kemenangan!
    } else {
      resultMessage.innerText = `Skor kamu ${score}... Kurang gesit nih nangkep hatinya! 😜`;
    }
  }

  // Handle clicking/touching hearts
  cells.forEach((cell) => {
    const catchHeart = (e) => {
      e.preventDefault(); // Prevent double triggering on touch devices
      if (isPlaying && cell === activeCell && cell.innerHTML !== "") {
        score++;
        scoreDisplay.innerText = score;
        cell.innerHTML = "✨"; // Ubah jadi sparkle saat ditangkap
        cell.classList.remove("animate-pulse");
        activeCell = null;
      }
    };

    cell.addEventListener("mousedown", catchHeart);
    cell.addEventListener("touchstart", catchHeart);
  });

  btnStart.addEventListener("click", startGame);

  // Observe logic for scrolling
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("opacity-0", "translate-y-12");
          entry.target.classList.add("translate-y-0");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  observer.observe(gameSection);
}

// --- Phase 8 Logic (The Dark Universe) ---
function initStarryNight() {
  const section = document.getElementById("starryNightSection");
  if (!section) return;

  const btnSwitch = document.getElementById("btnSwitchLight");
  const darkOverlay = document.getElementById("darkOverlay");
  const starsContainer = document.getElementById("starsContainer");
  const darkContent = document.getElementById("darkUniverseContent");

  let shootingStarInterval = null;

  // Add CSS for 3D planets
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes spin-slow { 100% { transform: rotate(360deg); } }
    .planet-3d {
      border-radius: 50%;
      position: relative;
      animation: spin-slow 60s linear infinite;
      box-shadow: inset -30px -30px 50px rgba(0,0,0,0.9), inset 10px 10px 30px rgba(255,255,255,0.4);
    }
    .ring-3d {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotateX(75deg) rotateY(15deg);
      border-radius: 50%;
      box-shadow: 0 0 15px rgba(255, 213, 79, 0.5), inset 0 0 15px rgba(255, 213, 79, 0.5);
    }
  `;
  document.head.appendChild(style);

  // Generate static stars
  for (let i = 0; i < 150; i++) {
    const star = document.createElement("div");
    star.className = "absolute bg-white rounded-full animate-pulse will-change-opacity";
    const size = Math.random() * 2.5 + 0.5;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 3}s`;
    star.style.animationDuration = `${Math.random() * 2 + 1}s`;
    starsContainer.appendChild(star);
  }

  const createShootingStar = () => {
    if (darkOverlay.classList.contains("opacity-0")) return;
    const shootingStar = document.createElement("div");
    shootingStar.className = "absolute bg-gradient-to-r from-transparent via-white to-transparent h-[1.5px] transform -rotate-45";
    shootingStar.style.width = `${Math.random() * 150 + 50}px`;
    shootingStar.style.left = `${Math.random() * 100}%`;
    shootingStar.style.top = `${Math.random() * 50}%`;
    starsContainer.appendChild(shootingStar);
    
    shootingStar.animate([
      { transform: 'translateX(0) translateY(0) rotate(-45deg)', opacity: 1 },
      { transform: 'translateX(-500px) translateY(500px) rotate(-45deg)', opacity: 0 }
    ], { duration: Math.random() * 1000 + 800, easing: 'linear' }).onfinish = () => shootingStar.remove();
  };

  const planets = [
    { name: 'Merkurius', size: 120, colors: 'radial-gradient(circle at 30% 30%, #b0bec5, #78909c, #37474f)', glow: '#78909c', text: 'Layaknya Merkurius yang selalu mengitari mentari dalam dekap hangatnya, begitu pula duniaku yang tak pernah lelah mengorbit pada senyummu.' },
    { name: 'Venus', size: 160, colors: 'radial-gradient(circle at 30% 30%, #ffe082, #ffb300, #e65100)', glow: '#ffb300', text: 'Venus mungkin adalah planet yang paling bercahaya di langit malam, namun di mataku, satu-satunya pijar yang menuntun arahku pulang hanyalah kamu.' },
    { name: 'Bumi', size: 180, colors: 'radial-gradient(circle at 30% 30%, #81d4fa, #29b6f6, #01579b)', glow: '#29b6f6', text: 'Di alam semesta yang maha luas dan sunyi ini, aku bersyukur kita dilahirkan di Bumi yang sama, di garis waktu yang sama, hingga aku bisa menyebutmu rumah.' },
    { name: 'Mars', size: 140, colors: 'radial-gradient(circle at 30% 30%, #ffab91, #f4511e, #bf360c)', glow: '#f4511e', text: 'Meski rintangan menerjang dan jarak terasa merenggut, cintaku padamu serupa tanah Mars—merona, berani, dan tak akan pernah pudar oleh waktu.' },
    { name: 'Jupiter', size: 280, colors: 'radial-gradient(circle at 30% 30%, #d7ccc8, #a1887f, #4e342e)', glow: '#a1887f', text: 'Layaknya Jupiter yang memeluk tata surya dengan gravitasinya yang agung, begitu pula rengkuhanku yang akan selalu melindungimu dari segala riuh dunia.' },
    { name: 'Saturnus', size: 240, colors: 'radial-gradient(circle at 30% 30%, #fff59d, #fbc02d, #f57f17)', glow: '#fbc02d', hasRing: true, text: 'Keindahan Saturnus dengan cincin abadinya menjadi saksi, bahwa setiap janji yang terucap untukmu adalah ikatan yang takkan pernah terputus.' },
    { name: 'Uranus', size: 200, colors: 'radial-gradient(circle at 30% 30%, #b2ebf2, #4dd0e1, #006064)', glow: '#4dd0e1', text: 'Setenang samudra es biru di langit Uranus, begitulah caramu menenangkan jiwaku yang bising. Bersamamu adalah kedamaian yang tak berkesudahan.' },
    { name: 'Neptunus', size: 190, colors: 'radial-gradient(circle at 30% 30%, #c5cae9, #5c6bc0, #1a237e)', glow: '#5c6bc0', text: 'Meskipun berada di ujung terjauh semesta, cintaku padamu bagaikan lautan Neptunus—dalam, penuh misteri yang indah, dan tak bertepi.' },
  ];

  // Render Planet sections
  darkContent.innerHTML = ''; 
  planets.forEach((p, index) => {
    const isEven = index % 2 === 0;
    const ringHTML = p.hasRing ? `<div class="ring-3d" style="width: ${p.size * 2.5}px; height: ${p.size * 2.5}px; border: 20px solid rgba(255, 213, 79, 0.4);"></div>` : '';
    
    darkContent.innerHTML += `
      <div class="planet-section min-h-screen w-full flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-center px-6 py-20 gap-12 md:gap-24 opacity-0 transform translate-y-20 transition-all duration-1000">
        <div class="relative flex justify-center items-center shrink-0">
          <div class="absolute inset-0 rounded-full blur-[30px] opacity-40 animate-pulse" style="background: ${p.glow};"></div>
          <div class="planet-3d" style="width: ${p.size}px; height: ${p.size}px; background: ${p.colors};"></div>
          ${ringHTML}
        </div>
        <div class="max-w-xl text-center ${isEven ? 'md:text-left' : 'md:text-right'}">
          <h2 class="font-playfair text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 font-bold mb-6 tracking-wide drop-shadow-lg">${p.name}</h2>
          <p class="font-quicksand text-xl md:text-2xl text-gray-300 leading-relaxed drop-shadow-md font-medium italic">"${p.text}"</p>
        </div>
      </div>
    `;
  });

  // Final Quote Section
  darkContent.innerHTML += `
    <div class="planet-section min-h-[100vh] w-full flex flex-col items-center justify-center px-6 py-20 opacity-0 transform translate-y-20 transition-all duration-1000">
      <h1 class="font-playfair text-3xl md:text-5xl text-center px-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-white to-blue-200 font-bold leading-relaxed max-w-4xl drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">
        "Di antara miliaran galaksi dan triliunan bintang yang berpendar di angkasa raya, hatiku telah berlabuh.<br><br>Dan jika semesta runtuh malam ini, aku akan tetap memilihmu, lagi dan lagi.<br><br>Nindy, you are my whole universe."
      </h1>
      <button id="btnTurnOn" class="mt-20 px-8 py-3 border border-white/30 rounded-full text-white/70 font-quicksand text-lg hover:text-white hover:border-white hover:bg-white/10 transition-all focus:outline-none shadow-lg">
        Kembali ke Bumi 🌍
      </button>
    </div>
  `;

  // Intersection Observer for the dark universe scrolling
  const darkObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0', 'translate-y-20');
        entry.target.classList.add('opacity-100', 'translate-y-0');
      }
    });
  }, { threshold: 0.3 });

  btnSwitch.addEventListener("click", () => {
    darkOverlay.classList.remove("pointer-events-none");
    darkOverlay.classList.remove("opacity-0");
    darkContent.classList.remove("hidden");
    
    setTimeout(() => {
      darkContent.classList.remove("opacity-0");
      document.querySelectorAll('.planet-section').forEach(el => darkObserver.observe(el));
    }, 1000);

    if (!shootingStarInterval) {
      shootingStarInterval = setInterval(createShootingStar, 2000);
    }
  });

  // Event delegation for dynamically added btnTurnOn
  darkContent.addEventListener("click", (e) => {
    if (e.target.id === "btnTurnOn") {
      darkOverlay.classList.add("opacity-0");
      darkOverlay.classList.add("pointer-events-none");
      darkContent.classList.add("opacity-0");
      setTimeout(() => {
        darkContent.classList.add("hidden");
      }, 1000);
      
      if (shootingStarInterval) {
        clearInterval(shootingStarInterval);
        shootingStarInterval = null;
      }
      darkOverlay.scrollTo({ top: 0, behavior: 'smooth' });

      // Add final goodbye message
      if (!document.getElementById("finalGoodbyeMessage")) {
        const finalMsg = document.createElement("div");
        finalMsg.id = "finalGoodbyeMessage";
        finalMsg.className = "mt-4 mb-32 w-full flex justify-center opacity-0 transition-opacity duration-1000";
        finalMsg.innerHTML = `
          <p class="font-quicksand italic font-medium text-pink-500 text-lg md:text-xl tracking-wide text-center bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm">
            Udah selesai, terimakasih sudah liat sampe habis ❤️
          </p>
        `;
        
        const starrySection = document.getElementById("starryNightSection");
        if (starrySection) {
          starrySection.parentElement.appendChild(finalMsg);
          starrySection.classList.remove("pb-32");
          starrySection.classList.add("pb-8");
        }

        setTimeout(() => {
          finalMsg.classList.remove("opacity-0");
          const phase2 = document.getElementById('phase2Container');
          if(phase2) {
            phase2.scrollTo({
               top: phase2.scrollHeight,
               behavior: 'smooth'
            });
          }
        }, 1500);
      }
    }
  });

  // Observer for the switch button itself
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.remove("opacity-0", "translate-y-12");
        entry.target.classList.add("translate-y-0");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  observer.observe(section);
}
