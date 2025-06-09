// Initial Setup
const today = new Date().toISOString().split("T")[0];
const timeElement = document.getElementById("time");
const whiteCount = document.getElementById("whiteCount");
const transparentCount = document.getElementById("transparentCount");
const nextDrop = document.getElementById("nextDrop");
const whiteBtn = document.getElementById("whiteBtn");
const transparentBtn = document.getElementById("transparentBtn");
const lastUsedDisplay = document.getElementById("lastUsed");

let data = JSON.parse(localStorage.getItem(today)) || {
  date: today,
  white: [],
  transparent: [],
  lastUsed: null
};

// Show current time
setInterval(() => {
  timeElement.textContent = new Date().toLocaleString();
}, 1000);

// Update UI
function updateUI() {
  whiteCount.textContent = `White Drop: ${data.white.length} / 5`;
  transparentCount.textContent = `Transparent Drop: ${data.transparent.length} / 4`;

  if (data.lastUsed) {
    lastUsedDisplay.textContent = `${data.lastUsed} used at ${new Date().toLocaleTimeString()}`;
  } else {
    lastUsedDisplay.textContent = "";
  }

  // Alternating logic
  if (!data.lastUsed || data.lastUsed === "transparent") {
    nextDrop.textContent = "Next Drop: White";
    whiteBtn.disabled = false;
    transparentBtn.disabled = true;
  } else {
    nextDrop.textContent = "Next Drop: Transparent";
    whiteBtn.disabled = true;
    transparentBtn.disabled = false;
  }
}

// Handle White Drop
whiteBtn.addEventListener("click", () => {
  if (data.white.length < 5) {
    data.white.push(new Date().toLocaleTimeString());
    data.lastUsed = "white";
    saveData();
  }
});

// Handle Transparent Drop
transparentBtn.addEventListener("click", () => {
  if (data.transparent.length < 4) {
    data.transparent.push(new Date().toLocaleTimeString());
    data.lastUsed = "transparent";
    saveData();
  }
});

// Save to localStorage
function saveData() {
  localStorage.setItem(today, JSON.stringify(data));
  updateUI();
}

// Refresh Button
document.getElementById("refreshBtn").addEventListener("click", () => {
  const confirmReset = confirm("Do you want to refresh the drop count?");
  if (confirmReset) {
    data = {
      date: today,
      white: [],
      transparent: [],
      lastUsed: null
    };
    localStorage.setItem(today, JSON.stringify(data));
    updateUI();
  }
});

// View History link (optional for future page)
document.getElementById("viewHistory").addEventListener("click", () => {
  window.location.href = "history.html";
});

// Initialize UI
updateUI();
