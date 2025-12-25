/* ========= STATE ========= */

let diskCount = 3;
let moveCount = 0;
let gameStarted = false;
let autoPlaying = false;

let rods = [];
let draggedDisk = null;
let sourceRod = null;

const AUTO_DELAY = 4000; // 4 seconds per auto move

/* ========= ELEMENTS ========= */

const startOverlay = document.getElementById("start-overlay");
const startBtn = document.getElementById("start-btn");
const autoBtn = document.getElementById("auto-btn");
const resetBtn = document.getElementById("reset-btn");
const diskSelect = document.getElementById("disk-count");

const messageOverlay = document.getElementById("message-overlay");
const messageTitle = document.getElementById("message-title");
const messageText = document.getElementById("message-text");

const rodsEls = document.querySelectorAll(".rod");
const movesEl = document.getElementById("moves");
const formulaEl = document.getElementById("formula");
const complexityEl = document.getElementById("complexity");

/* ========= INIT ========= */

resetGame();

/* ========= START ========= */

startBtn.onclick = () => {
  gameStarted = true;
  startOverlay.classList.add("hidden");
};

/* ========= RESET ========= */

resetBtn.onclick = resetGame;
diskSelect.onchange = resetGame;

function resetGame() {
  diskCount = Number(diskSelect.value);
  rods = [[], [], []];

  for (let i = diskCount; i >= 1; i--) rods[0].push(i);

  moveCount = 0;
  gameStarted = false;
  autoPlaying = false;
  draggedDisk = null;
  sourceRod = null;

  hideMessage();
  render();
  updateUI();
  startOverlay.classList.remove("hidden");
}

/* ========= RENDER ========= */

function render() {
  rodsEls.forEach(r => r.innerHTML = "");

  rods.forEach((rod, rIndex) => {
    rod.forEach((disk, i) => {
      const el = document.createElement("div");
      el.className = `disk disk-${disk}`;
      el.draggable = (i === rod.length - 1 && gameStarted && !autoPlaying);

      el.addEventListener("dragstart", () => {
        draggedDisk = disk;
        sourceRod = rIndex;
        el.classList.add("dragging");
      });

      el.addEventListener("dragend", () => {
        el.classList.remove("dragging");
      });

      rodsEls[rIndex].appendChild(el);
    });
  });
}

/* ========= DROP LOGIC (MANUAL PLAY) ========= */

rodsEls.forEach((rodEl, targetRod) => {
  rodEl.addEventListener("dragover", e => e.preventDefault());

  rodEl.addEventListener("drop", () => {
    if (!gameStarted || autoPlaying || draggedDisk === null) return;

    if (!isValidMove(sourceRod, targetRod)) {
      showMessage("Invalid Move", "A larger disk cannot be placed on a smaller disk.");
      resetDrag();
      render();
      return;
    }

    rods[sourceRod].pop();
    rods[targetRod].push(draggedDisk);
    moveCount++;

    resetDrag();
    render();
    updateUI();

    showMessage("Valid Move", `Disk placed on rod ${targetRod + 1}`);

    checkWin(); // ✅ MANUAL WELL DONE
  });
});

function resetDrag() {
  draggedDisk = null;
  sourceRod = null;
}

/* ========= RULE ========= */

function isValidMove(from, to) {
  if (rods[to].length === 0) return true;
  return rods[from][rods[from].length - 1] <
         rods[to][rods[to].length - 1];
}

/* ========= UI ========= */

function updateUI() {
  const optimal = Math.pow(2, diskCount) - 1;
  movesEl.textContent = `Moves: ${moveCount}`;
  formulaEl.textContent =
    `Current Moves = ${moveCount} | Optimal = 2ⁿ − 1 = ${optimal}`;
  complexityEl.textContent = "Time Complexity: O(2ⁿ)";
}

/* ========= MESSAGE ========= */

let msgTimer = null;

function showMessage(title, text) {
  clearTimeout(msgTimer);
  messageTitle.textContent = title;
  messageText.textContent = text;
  messageOverlay.classList.remove("hidden");

  msgTimer = setTimeout(hideMessage, 3000);
}

function hideMessage() {
  messageOverlay.classList.add("hidden");
}

/* ========= AUTO DEMO ========= */

autoBtn.onclick = async () => {
  resetGame();
  startOverlay.classList.add("hidden");
  autoPlaying = true;

  await hanoi(diskCount, 0, 2, 1);

  // ✅ FINAL AUTO WELL DONE (guaranteed)
  showMessage(
    "Well Done 🎉",
    "Auto demo completed using the optimal solution (2ⁿ − 1 moves)."
  );

  autoPlaying = false;
};

async function hanoi(n, from, to, aux) {
  if (n === 0 || !autoPlaying) return;

  await hanoi(n - 1, from, aux, to);
  await autoMove(from, to);
  await hanoi(n - 1, aux, to, from);
}

async function autoMove(from, to) {
  await delay(AUTO_DELAY);

  const disk = rods[from].pop();
  rods[to].push(disk);
  moveCount++;

  render();
  updateUI();

  showMessage("Auto Move", `Disk placed on rod ${to + 1}`);
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* ========= MANUAL WIN ========= */

function checkWin() {
  if (rods[2].length === diskCount) {
    gameStarted = false;

    setTimeout(() => {
      showMessage(
        "Well Done 🎉",
        `You completed the puzzle in ${moveCount} moves.\nOptimal: ${Math.pow(2, diskCount) - 1}`
      );
    }, 300);
  }
}
