// Elements
const whiteBtn = document.getElementById("whiteDropBtn");
const whiteCount = document.getElementById("whiteCount");
const messageBox = document.getElementById("messageBox");
const currentDateTime = document.getElementById("currentDateTime");

// Setup
const today = new Date().toISOString().split("T")[0];
let data = JSON.parse(localStorage.getItem(today)) || {
  white: [],
};

// Show date & time
setInterval(() => {
  const now = new Date();
  currentDateTime.textContent = now.toLocaleString("te-IN", {
    dateStyle: "full",
    timeStyle: "medium",
  });
}, 1000);

// Update UI
function updateUI() {
  whiteCount.textContent = `${data.white.length} / 4`; // Updated to show the correct count

  if (data.white.length >= 4) {
    messageBox.textContent = "ఈరోజు తెలుపు బొట్లు పూర్తయ్యాయి!";
    whiteBtn.disabled = true;
  } else {
    messageBox.textContent = "";
    whiteBtn.disabled = false;
  }
}

// Save
function save() {
  localStorage.setItem(today, JSON.stringify(data));
  localStorage.setItem("eyeDropData", JSON.stringify({
    date: today,
    white: data.white,
  }));
}

// Button Handler
whiteBtn.addEventListener("click", () => {
  if (data.white.length < 4) {
    data.white.push(new Date().toLocaleTimeString());
    save();
    updateUI();
  }
});

// Refresh Button
const refreshBtn = document.getElementById("refreshBtn");
refreshBtn.addEventListener("click", () => {
  const confirmReset = confirm("డ్రాప్ కౌంట్ రీసెట్ చేయాలా?");
  if (confirmReset) {
    data = {
      white: [],
    };
    save();
    updateUI();
  }
});

// Init
updateUI();
