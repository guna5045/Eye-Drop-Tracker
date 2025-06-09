// Elements
const whiteBtn = document.getElementById("whiteDropBtn");
const transparentBtn = document.getElementById("transparentDropBtn");
const whiteCount = document.getElementById("whiteCount");
const transparentCount = document.getElementById("transparentCount");
const nextDrop = document.getElementById("nextDrop");
const messageBox = document.getElementById("messageBox");
const currentDateTime = document.getElementById("currentDateTime");

// Setup
const today = new Date().toISOString().split("T")[0];
let data = JSON.parse(localStorage.getItem(today)) || {
  white: [],
  transparent: [],
  lastUsed: null,
};

// Show current time
setInterval(() => {
  const now = new Date();
  currentDateTime.textContent = now.toLocaleString("te-IN", {
    dateStyle: "full",
    timeStyle: "medium",
  });
}, 1000);

// Save to localStorage
function save() {
  localStorage.setItem(today, JSON.stringify(data));
  localStorage.setItem("eyeDropData", JSON.stringify({
    date: today,
    white: data.white,
    transparent: data.transparent,
  }));
}

// Update UI
function updateUI() {
  whiteCount.textContent = `${data.white.length} / 5`;
  transparentCount.textContent = `${data.transparent.length} / 4`;

  const whiteDone = data.white.length >= 5;
  const transparentDone = data.transparent.length >= 4;

  if (whiteDone && transparentDone) {
    nextDrop.textContent = "ఈరోజు అన్ని బొట్లు వాడడం పూర్తైంది!";
    whiteBtn.disabled = true;
    transparentBtn.disabled = true;
    return;
  }

  whiteBtn.disabled = true;
  transparentBtn.disabled = true;

  if (!data.lastUsed) {
    // First time usage - allow both
    if (!whiteDone) whiteBtn.disabled = false;
    if (!transparentDone) transparentBtn.disabled = false;
    nextDrop.textContent = "తదుపరి: మొదటి బొట్టు వాడండి";
    return;
  }

  if (data.lastUsed === "white") {
    if (!transparentDone) {
      nextDrop.textContent = "తదుపరి: పారదర్శక బొట్టు వాడాలి";
      transparentBtn.disabled = false;
    } else if (!whiteDone) {
      nextDrop.textContent = "తదుపరి: తెలుపు బొట్టు వాడాలి";
      whiteBtn.disabled = false;
    }
  } else if (data.lastUsed === "transparent") {
    if (!whiteDone) {
      nextDrop.textContent = "తదుపరి: తెలుపు బొట్టు వాడాలి";
      whiteBtn.disabled = false;
    } else if (!transparentDone) {
      nextDrop.textContent = "తదుపరి: పారదర్శక బొట్టు వాడాలి";
      transparentBtn.disabled = false;
    }
  }
}

// Handlers
whiteBtn.addEventListener("click", () => {
  if (data.white.length < 5) {
    data.white.push(new Date().toLocaleTimeString());
    data.lastUsed = "white";
    save();
    updateUI();
  }
});

transparentBtn.addEventListener("click", () => {
  if (data.transparent.length < 4) {
    data.transparent.push(new Date().toLocaleTimeString());
    data.lastUsed = "transparent";
    save();
    updateUI();
  }
});

// Refresh
const refreshBtn = document.getElementById("refreshBtn");
refreshBtn.addEventListener("click", () => {
  const confirmReset = confirm("డ్రాప్ కౌంట్ రీసెట్ చేయాలా?");
  if (confirmReset) {
    data = {
      white: [],
      transparent: [],
      lastUsed: null,
    };
    save();
    updateUI();
  }
});

// Init
updateUI();
