// Get elements
const whiteBtn = document.getElementById("whiteDropBtn");
const transparentBtn = document.getElementById("transparentDropBtn");
const whiteCountEl = document.getElementById("whiteCount");
const transparentCountEl = document.getElementById("transparentCount");
const nextDropEl = document.getElementById("nextDrop");
const messageBox = document.getElementById("messageBox");
const timeDisplay = document.getElementById("currentDateTime");

// Limits
const whiteLimit = 5;
const transparentLimit = 4;

// Load data or start fresh
let today = new Date().toLocaleDateString();
let data = JSON.parse(localStorage.getItem("eyeDropData")) || {
  date: today,
  white: [],
  transparent: [],
  lastUsed: null,
};

// Reset daily
if (data.date !== today) {
  data = {
    date: today,
    white: [],
    transparent: [],
    lastUsed: null,
  };
  localStorage.setItem("eyeDropData", JSON.stringify(data));
}

// Update UI
function updateUI() {
  whiteCountEl.textContent = data.white.length;
  transparentCountEl.textContent = data.transparent.length;

  if (data.white.length >= whiteLimit && data.transparent.length >= transparentLimit) {
    nextDropEl.textContent = "✅ All drops done for today!";
    whiteBtn.disabled = true;
    transparentBtn.disabled = true;
    messageBox.textContent = "";
    return;
  }

  // Suggest next drop
  if (!data.lastUsed) {
    nextDropEl.textContent = "Start by selecting a drop.";
  } else if (data.lastUsed === "white") {
    if (data.transparent.length < transparentLimit) {
      nextDropEl.textContent = "Next: Transparent Drop 💧";
      whiteBtn.disabled = true;
      transparentBtn.disabled = false;
    } else {
      nextDropEl.textContent = "Only White Drop left 💧";
      whiteBtn.disabled = false;
      transparentBtn.disabled = true;
    }
  } else if (data.lastUsed === "transparent") {
    if (data.white.length < whiteLimit) {
      nextDropEl.textContent = "Next: White Drop 💧";
      whiteBtn.disabled = false;
      transparentBtn.disabled = true;
    } else {
      nextDropEl.textContent = "Only Transparent Drop left 💧";
      whiteBtn.disabled = true;
      transparentBtn.disabled = false;
    }
  }
}

// Handle drop usage
function useDrop(type) {
  const now = new Date().toLocaleTimeString();
  if (type === "white" && data.white.length < whiteLimit) {
    data.white.push(now);
    data.lastUsed = "white";
    messageBox.textContent = `White Drop used at ${now}`;
  } else if (type === "transparent" && data.transparent.length < transparentLimit) {
    data.transparent.push(now);
    data.lastUsed = "transparent";
    messageBox.textContent = `Transparent Drop used at ${now}`;
  }

  localStorage.setItem("eyeDropData", JSON.stringify(data));
  updateUI();
}

// Event listeners
whiteBtn.addEventListener("click", () => useDrop("white"));
transparentBtn.addEventListener("click", () => useDrop("transparent"));

// Time updater
setInterval(() => {
  const now = new Date();
  timeDisplay.textContent = now.toLocaleString();
}, 1000);

// Initial UI update
updateUI();

document.getElementById("refreshBtn").addEventListener("click", () => {
  const confirmReset = confirm("Do you want to refresh the drop count?");
  if (confirmReset) {
    data = {
      date: today,
      white: [],
      transparent: [],
      lastUsed: null
    };
    updateUI();
    db.collection("drops").doc(today).set(data);
    alert("Drop count has been reset!");
  }
});
