# Recursive Algorithm Visualizer – Towers of Hanoi

An interactive visualization of the classic Towers of Hanoi problem, designed to demonstrate
recursive problem-solving, algorithmic constraints, and time complexity in an intuitive way.

🔗 Live Demo: https://vemavyshnavi.github.io/TowersOfHanoi/

---

## 📌 Problem Statement

The Towers of Hanoi is a classic recursive problem where the objective is to move `n` disks
from a source rod to a destination rod using an auxiliary rod, following strict rules.

---

## 📜 Rules

1. Only one disk can be moved at a time.
2. Only the top disk of a rod can be moved.
3. A larger disk cannot be placed on a smaller disk.
4. All disks must be moved to the destination rod.

---

## ⚙️ Features

- 🎮 Manual play with rule enforcement and illegal-move detection
- ▶️ Auto play using a recursive algorithm
- ⏸ Pause and resume functionality to inspect recursion
- 🔦 Highlighting of the active disk during each move
- 🧠 Explanation of *why* each disk moves at every step
- 📐 Displays minimum move formula and time complexity
- 🎉 Celebration animation on completion

---

## 🧠 Algorithm Used

The solution uses **recursion**:

1. Move `n-1` disks from source to auxiliary rod
2. Move the largest disk to the destination rod
3. Move `n-1` disks from auxiliary to destination rod

---

## ⏳ Time Complexity

- **Time Complexity:** `O(2^n)`
- **Minimum Moves Formula:** `2^n - 1`

---

## 🛠 Technologies Used

- HTML
- CSS
- Vanilla JavaScript (DOM manipulation & state management)

---

## 📚 What I Learned

- Recursive problem-solving and call-stack behavior
- Managing UI state in JavaScript without frameworks
- Enforcing constraints through logic
- Translating algorithms into visual, interactive systems

---

## 🚀 Future Improvements

- Disk count selector (n = 3 to 6)
- Move counter and efficiency comparison
- Drag-and-drop disk movement
- Animation for disk transitions
