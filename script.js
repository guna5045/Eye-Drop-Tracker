const greenBtn = document.getElementById("greenDropBtn");
const transparentBtn = document.getElementById("transparentDropBtn");
const whiteBtn = document.getElementById("whiteDropBtn");

const greenCount = document.getElementById("greenCount");
const transparentCount = document.getElementById("transparentCount");
const whiteCount = document.getElementById("whiteCount");

const messageBox = document.getElementById("messageBox");
const currentDateTime = document.getElementById("currentDateTime");
const resetBtn = document.getElementById("customResetBtn");

const today = new Date().toISOString().split("T")[0];

let data = JSON.parse(localStorage.getItem(today)) || {
  green: [],
  transparent: [],
  white: []
};

function saveData() {
  localStorage.setItem(today, JSON.stringify(data));
}

function updateUI() {
  greenCount.textContent = `${data.green.length} / 2`;
  transparentCount.textContent = `${data.transparent.length} / 2`;
  whiteCount.textContent = `${data.white.length} / 4`;

  greenBtn.classList.remove("active");
  transparentBtn.classList.remove("active");
  whiteBtn.classList.remove("active");

  greenBtn.disabled = true;
  transparentBtn.disabled = true;
  whiteBtn.disabled = true;

  const g = data.green.length;
  const t = data.transparent.length;
  const w = data.white.length;

  if (g === 0) {
    greenBtn.disabled = false;
    greenBtn.classList.add("active");
  } else if (g === 1 && t === 0) {
    transparentBtn.disabled = false;
    transparentBtn.classList.add("active");
  } else if (g === 1 && t === 1 && w < 4) {
    whiteBtn.disabled = false;
    whiteBtn.classList.add("active");
  } else if (g === 1 && t === 1 && w === 4) {
    greenBtn.disabled = false;
    greenBtn.classList.add("active");
  } else if (g === 2 && t === 1) {
    transparentBtn.disabled = false;
    transparentBtn.classList.add("active");
  }

  if (g === 2 && t === 2 && w === 4) {
    messageBox.textContent = "ఈరోజు బొట్లు పూర్తయ్యాయి!";
  } else {
    messageBox.textContent = "";
  }
}

greenBtn.addEventListener("click", () => {
  if (data.green.length < 2) {
    data.green.push(new Date().toLocaleTimeString());
    saveData();
    updateUI();
  }
});

transparentBtn.addEventListener("click", () => {
  if (data.transparent.length < 2) {
    data.transparent.push(new Date().toLocaleTimeString());
    saveData();
    updateUI();
  }
});

whiteBtn.addEventListener("click", () => {
  if (data.white.length < 4) {
    data.white.push(new Date().toLocaleTimeString());
    saveData();
    updateUI();
  }
});

resetBtn.addEventListener("click", () => {
  const confirmReset = confirm("రీసెట్ చేయాలా?");
  if (confirmReset) {
    data = { green: [], transparent: [], white: [] };
    saveData();
    updateUI();
  }
});

setInterval(() => {
  const now = new Date();
  currentDateTime.textContent = now.toLocaleString("te-IN", {
    dateStyle: "full",
    timeStyle: "medium"
  });
}, 1000);

updateUI();
