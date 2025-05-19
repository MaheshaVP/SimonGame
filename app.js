let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let startStopBtn = document.getElementById("startStopBtn");

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => btn.classList.remove("userflash"), 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);

  gameSeq.push(randColor);
  gameFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game over! Your score was <b>${level}</b><br/>Press "Start" to play again.`;
    document.body.style.backgroundColor = "red";
    setTimeout(() => (document.body.style.backgroundColor = "white"), 150);
    stopGame();
  }
}

function btnPress() {
  if (!started) return;

  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function startGame() {
  started = true;
  level = 0;
  gameSeq = [];
  userSeq = [];
  h2.innerText = "Game started!";
  startStopBtn.innerText = "Stop";
  levelUp();
}

function stopGame() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
  startStopBtn.innerText = "Start";
}

startStopBtn.addEventListener("click", () => {
  if (!started) {
    startGame();
  } else {
    stopGame();
    h2.innerText = `Game stopped! Press "Start" to play again.`;
  }
});
