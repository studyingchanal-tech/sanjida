// ==================================
// FLOATING DECORATIONS
// ==================================

const decor = document.getElementById("decor");

function createDecoration() {
  const items = ["🌸", "✨", "💕", "🌷", "💗"];
  const el = document.createElement("span");

  el.className = "floating";
  el.textContent = items[Math.floor(Math.random() * items.length)];
  el.style.left = Math.random() * 100 + "%";
  el.style.fontSize = 14 + Math.random() * 18 + "px";
  el.style.animationDuration = 7 + Math.random() * 6 + "s";

  decor.appendChild(el);

  setTimeout(() => el.remove(), 14000);
}

setInterval(createDecoration, 700);


// ==================================
// PAGE NAVIGATION
// ==================================

function showPage(number) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  document.getElementById("page" + number).classList.add("active");

  window.scrollTo({ top: 0, behavior: "smooth" });
}


// ==================================
// TOAST MESSAGE
// ==================================

let toastTimer;

function showToast(message) {
  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}


// ==================================
// MUSIC
// ==================================

const song = document.getElementById("song");
const musicDisc = document.getElementById("musicDisc");

song.addEventListener("play", () => {
  musicDisc.classList.add("playing");
});

song.addEventListener("pause", () => {
  musicDisc.classList.remove("playing");
});

document.getElementById("musicYes").addEventListener("click", async () => {
  try {
    await song.play();
  } catch (error) {
    showToast("গান চালু হয়নি! mysong.mp3 ফাইলটি পরীক্ষা করো।");
  }

  startWish();
});

document.getElementById("musicNo").addEventListener("click", () => {
  song.pause();
  song.currentTime = 0;
  startWish();
});


// ==================================
// BIRTHDAY WISH ANIMATION
// ==================================

let typingTimer;

function startWish() {
  showPage(2);

  const text =
    "শুভ জন্মদিন! 🎂✨\nআজকের দিনটা তোমার মতোই সুন্দর হোক।";

  const output = document.getElementById("typedWish");
  const letter = document.getElementById("letter");
  const next = document.getElementById("goCake");

  clearInterval(typingTimer);

  output.textContent = "";
  letter.classList.add("hidden");
  next.classList.add("hidden");

  let index = 0;

  typingTimer = setInterval(() => {
    output.textContent += text.charAt(index);
    index++;

    if (index >= text.length) {
      clearInterval(typingTimer);
      letter.classList.remove("hidden");
      next.classList.remove("hidden");
    }
  }, 75);
}

document.getElementById("goCake").addEventListener("click", () => {
  showPage(3);
});


// ==================================
// CAKE CUTTING
// ==================================

document.getElementById("cake").addEventListener("click", () => {
  const cake = document.getElementById("cake");

  if (cake.classList.contains("cut")) return;

  cake.classList.add("cut");

  document.getElementById("cakeHint").textContent =
    "ইয়েই! কেক কাটা হয়ে গেছে! 🎉";

  document.getElementById("goGuests").classList.remove("hidden");

  showToast("শুভ জন্মদিন! 🎂💗");
});

document.getElementById("goGuests").addEventListener("click", () => {
  showPage(4);
});


// ==================================
// FEED CAKE TO EVERYONE
// ==================================

const guests = [
  { name: "আম্মু", emoji: "👩" },
  { name: "আব্বু", emoji: "👨" },
  { name: "দাদী", emoji: "👵" },
  { name: "দাদা", emoji: "👴" },
  { name: "নানী", emoji: "👵🏻" },
  { name: "নানা", emoji: "👴🏻" },
  { name: "আনারস", emoji: "🍍" },
  { name: "বান্ধবীরা", emoji: "👯‍♀️" }
];

let fedCount = 0;

const guestGrid = document.getElementById("guestGrid");

function buildGuests() {
  guestGrid.innerHTML = "";

  guests.forEach(guest => {
    const button = document.createElement("button");
    button.className = "guest";

    const emoji = document.createElement("span");
    emoji.textContent = guest.emoji;

    button.appendChild(emoji);
    button.appendChild(document.createTextNode(guest.name));

    button.addEventListener("click", () => {
      if (button.classList.contains("done")) return;

      button.classList.add("done");
      button.innerHTML = "";

      const icon = document.createElement("span");
      icon.textContent = guest.emoji;

      button.appendChild(icon);
      button.appendChild(
        document.createTextNode(guest.name + " ✓")
      );

      fedCount++;

      document.getElementById("progressBar").style.width =
        (fedCount / guests.length * 100) + "%";

      document.getElementById("guestStatus").textContent =
        `${fedCount} / ${guests.length} জন কেক পেয়েছে`;

      showToast(`${guest.name}-কে কেক খাওয়ানো হলো! 🍰`);

      if (fedCount === guests.length) {
        document.getElementById("guestStatus").textContent =
          "সবাই কেক পেয়েছে! এবার শুভেচ্ছা 💖";

        document.getElementById("goMessages")
          .classList.remove("hidden");
      }
    });

    guestGrid.appendChild(button);
  });
}

buildGuests();

document.getElementById("goMessages").addEventListener("click", () => {
  currentMessage = 0;
  showPage(5);
  renderMessage();
});


// ==================================
// BIRTHDAY MESSAGES AND REPLIES
// ==================================

const messages = [
  {
    name: "দাদী",
    emoji: "👵",
    title: "দাদীর দোয়া ও ভালোবাসা 🤍",
    body: "আমার সোনামণি, আল্লাহ তোমাকে সুস্থ রাখুন, নেক হায়াত দান করুন এবং সব বিপদ থেকে হেফাজত করুন। তোমার জীবন ভরে উঠুক রহমত, বরকত আর আনন্দে। সবসময় ভালো থেকো মা। অনেক দোয়া ও আদর রইল।",
    replies: [
      "দাদী, অনেক ভালোবাসি ❤️",
      "দোয়া কইরো, আমি ভালো মানুষ হবো 🤍"
    ]
  },
  {
    name: "দাদা",
    emoji: "👴",
    title: "দাদার অনেক আশীর্বাদ 🌟",
    body: "শুভ জন্মদিন, মা! তোমার জীবন হোক জ্ঞান, সততা আর সাফল্যে ভরা। নিজের স্বপ্নের পেছনে লেগে থেকো, মানুষের সঙ্গে ভালো ব্যবহার করো। তুমি যেন সবসময় পরিবারের মুখ উজ্জ্বল করতে পারো। অনেক আশীর্বাদ রইল।",
    replies: [
      "দাদা, তোমার দোয়াই আমার শক্তি 💗",
      "আমি চেষ্টা করব, কথা দিলাম! 😊"
    ]
  },
  {
    name: "নানী",
    emoji: "👵🏻",
    title: "নানীর আদর 🩷",
    body: "আমার আদরের নাতনি, তোমার প্রতিটি সকাল নতুন আশা নিয়ে আসুক, আর প্রতিটি রাত নিয়ে আসুক শান্তি। সুস্থ থেকো, হাসিখুশি থেকো, নিজের স্বপ্নগুলোকে যত্ন করে আগলে রেখো। আল্লাহ তোমাকে সুখে রাখুন। অনেক আদর ও দোয়া।",
    replies: [
      "নানী, অনেক আদর তোমার জন্য 💕",
      "তোমার কাছে আরও কেক খাবো! 😋"
    ]
  },
  {
    name: "নানা",
    emoji: "👴🏻",
    title: "নানার শুভকামনা ✨",
    body: "শুভ জন্মদিন, মা! তোমার জীবনে ভালো মানুষ, সুন্দর সুযোগ আর ভালো খবরের অভাব না হোক। নিজের ওপর বিশ্বাস রেখো, মন দিয়ে পড়াশোনা করো। তোমার সুন্দর ভবিষ্যতের জন্য সবসময় দোয়া রইল।",
    replies: [
      "নানা, আমার জন্য দোয়া রেখো 🤍",
      "পড়াশোনায় মন দেব, ইনশাআল্লাহ 📚"
    ]
  },
  {
    name: "আম্মু",
    emoji: "👩",
    title: "আম্মুর ভালোবাসা 💗",
    body: "আমার আদরের মেয়ে, তোমার জীবনটা হোক শান্তি, সুস্থতা আর অফুরন্ত আনন্দে ভরা। তোমার প্রতিটি ভালো স্বপ্ন পূরণ হোক। সবসময় নিজের যত্ন নিও, ভালো থেকো, আর মনে রেখো—তুমি আমাদের অনেক আদরের।",
    replies: [
      "আম্মু, তোমাকে অনেক ভালোবাসি ❤️",
      "আমার জন্য সবসময় দোয়া কোরো 🥹"
    ]
  },
  {
    name: "আব্বু",
    emoji: "👨",
    title: "আব্বুর শুভকামনা 🌙",
    body: "জন্মদিনে তোমার জন্য অনেক দোয়া। তুমি যেন ভালো মানুষ হও, নিজের দায়িত্ব বুঝতে শেখো, আর সাহস নিয়ে স্বপ্নের পথে এগিয়ে যাও। জীবনের প্রতিটি ধাপে সততা ও আত্মবিশ্বাস তোমার সঙ্গী হোক। আল্লাহ তোমাকে সুখে রাখুন।",
    replies: [
      "আব্বু, চেষ্টা করে যাবো ❤️",
      "দোয়া কোরো যেন স্বপ্ন পূরণ হয় 🌟"
    ]
  },
  {
    name: "আনারস 🍍",
    emoji: "🍍",
    title: "আনারসের মহান ভাষণ 😂",
    body: "শুভ জন্মদিন! 😎 আজকে তোমার দিন বলে তোমার সব নাটক মাফ... তবে শুধু আজকেই! 😂 কেকের সবচেয়ে বড় টুকরোটা আমার নামে রেখে দিও। এটা কোনো আবদার না, এটা আনারসের সাংবিধানিক অধিকার! 🍍 যাই হোক, অনেক ভালো থেকো আর হাসিখুশি থেকো।",
    replies: [
      "কেকের টুকরো? আগে ট্রিট দাও! 😂",
      "ধন্যবাদ আনারস সাহেব 🍍😌"
    ]
  },
  {
    name: "বান্ধবীরা",
    emoji: "👯‍♀️",
    title: "বান্ধবীদের ভালোবাসা 💅",
    body: "হ্যাপি বার্থডে, পাগলি! 🎉 আজকে তোর সব আবদার মঞ্জুর। কিন্তু কাল থেকে আবার আগের মতো খোঁচাখুঁচি চলবে! তোর জীবনে কেক, সুন্দর ছবি, আড্ডা আর গসিপের অভাব না হোক। আর হ্যাঁ, জন্মদিন মানেই ট্রিট—এই নিয়ম কিন্তু পরিবর্তন হবে না! 😂💖",
    replies: [
      "তোদের ছাড়া জন্মদিন অসম্পূর্ণ 💕",
      "ট্রিট হবে, কিন্তু বিল ভাগাভাগি! 😭😂"
    ]
  }
];

let currentMessage = 0;

function renderMessage() {
  const message = messages[currentMessage];

  document.getElementById("avatar").textContent = message.emoji;
  document.getElementById("speaker").textContent = message.name;
  document.getElementById("messageTitle").textContent = message.title;
  document.getElementById("messageBody").textContent = message.body;

  document.getElementById("messageCount").textContent =
    `শুভেচ্ছা ${currentMessage + 1} / ${messages.length}`;

  const options = document.getElementById("replyOptions");
  options.innerHTML = "";

  message.replies.forEach((reply, index) => {
    const button = document.createElement("button");

    button.className = "btn " + (index === 0 ? "primary" : "secondary");
    button.textContent = reply;

    button.addEventListener("click", () => {
      options.querySelectorAll("button").forEach(btn => {
        btn.disabled = true;
      });

      showToast("রিপ্লাইটা দারুণ! 💌");

      setTimeout(() => {
        currentMessage++;

        if (currentMessage >= messages.length) {
          showPage(6);
        } else {
          renderMessage();
        }
      }, 500);
    });

    options.appendChild(button);
  });
}


// ==================================
// RESTART
// ==================================

function restart() {
  song.pause();
  song.currentTime = 0;

  fedCount = 0;
  currentMessage = 0;

  clearInterval(typingTimer);

  musicDisc.classList.remove("playing");

  document.getElementById("cake").classList.remove("cut");

  document.getElementById("cakeHint").textContent =
    "🎂 কেকটায় ট্যাপ করো";

  document.getElementById("goCake").classList.add("hidden");
  document.getElementById("goGuests").classList.add("hidden");
  document.getElementById("goMessages").classList.add("hidden");

  document.getElementById("letter").classList.add("hidden");
  document.getElementById("typedWish").textContent = "";

  document.getElementById("progressBar").style.width = "0%";
  document.getElementById("guestStatus").textContent =
    "০ / ৮ জন কেক পেয়েছে";

  buildGuests();
  showPage(1);
}

document.getElementById("restart").addEventListener("click", restart);