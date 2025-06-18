const greenBtn = document.getElementById("greenDropBtn");
const transparentBtn = document.getElementById("transparentDropBtn");
const whiteBtn = document.getElementById("whiteDropBtn");

const greenCount = document.getElementById("greenCount");
const transparentCount = document.getElementById("transparentCount");
const whiteCount = document.getElementById("whiteCount");
const nextDrop = document.getElementById("nextDrop");
const currentDateTime = document.getElementById("currentDateTime");

const today = new Date().toISOString().split("T")[0];
let data = JSON.parse(localStorage.getItem(today)) || {
  green: [],
  transparent: [],
  white: [],
};

setInterval(() => {
  const now = new Date();
  currentDateTime.textContent = now.toLocaleString("te-IN", {
    dateStyle: "full",
    timeStyle: "medium",
  });
}, 1000);

function updateUI() {
  greenCount.textContent = `${data.green.length} / 2`;
  transparentCount.textContent = `${data.transparent.length} / 2`;
  whiteCount.textContent = `${data.white.length} / 4`;

  greenBtn.disabled = true;
  transparentBtn.disabled = true;
  whiteBtn.disabled = true;

  if (data.green.length < 1) {
    nextDrop.textContent = "మొదటి ఆకుపచ్చ బొట్టు వేయండి";
    greenBtn.disabled = false;
  } else if (data.transparent.length < 1) {
    nextDrop.textContent = "ఇప్పుడు పారదర్శక బొట్టు వేయండి";
    transparentBtn.disabled = false;
  } else if (data.white.length < 4) {
    nextDrop.textContent = "ఇప్పుడు తెలుపు బొట్టు వేయండి";
    whiteBtn.disabled = false;
  } else if (data.green.length < 2) {
    nextDrop.textContent = "ఇప్పుడు రెండవ ఆకుపచ్చ బొట్టు వేయండి";
    greenBtn.disabled = false;
  } else if (data.transparent.length < 2) {
    nextDrop.textContent = "ఇప్పుడు రెండవ పారదర్శక బొట్టు వేయండి";
    transparentBtn.disabled = false;
  } else {
    nextDrop.textContent = "ఈరోజు బొట్లు పూర్తయ్యాయి!";
  }
}

function save() {
  localStorage.setItem(today, JSON.stringify(data));
}

greenBtn.addEventListener("click", () => {
  if (data.green.length < 2) {
    data.green.push(new Date().toLocaleTimeString());
    save();
    updateUI();
  }
});

transparentBtn.addEventListener("click", () => {
  if (data.transparent.length < 2) {
    data.transparent.push(new Date().toLocaleTimeString());
    save();
    updateUI();
  }
});

whiteBtn.addEventListener("click", () => {
  if (data.white.length < 4) {
    data.white.push(new Date().toLocaleTimeString());
    save();
    updateUI();
  }
});

document.getElementById("refreshBtn").addEventListener("click", () => {
  if (confirm("మీరు నిజంగా రీసెట్ చేయాలనుకుంటున్నారా?")) {
    data = {
      green: [],
      transparent: [],
      white: [],
    };
    save();
    updateUI();
  }
});

updateUI();
