/*----- constants -----*/
import WORDS from './words.js'
const MAX_ATTEMPTS = 6;
const WORD_LENGTH = 5;

const huh = new Audio('./assets/audio/huh.mp3');
huh.volume = .5;

const bruh = new Audio('./assets/audio/bruh.mp3');
bruh.volume = .25;

const sadSponge = new Audio('./assets/audio/sadSponge.mp3');
sadSponge.volume = .5;

const yipee = new Audio('./assets/audio/yipee.mp3');
yipee.volume = .5;

const modal = document.getElementById("instructionsModal");
const openModal = document.getElementById("openModal");
const closeButton = document.getElementsByClassName("close-button")[0];
/*----- state variables -----*/
let targetWord = "";
let currentAttempt = 1;
let guessHistory = [];
let guess = "";
let currCellIdx = 0;
let darkMode = false;
/*----- cached elements  -----*/
let gridCells = document.querySelectorAll(".grid-cell");
let keyboardKeys = document.querySelectorAll(".keyboard-key");
let message = document.getElementById("message");
let restartBtn = document.getElementById("restart");
let modeBtn = document.getElementById("input");
/*----- event listeners -----*/
keyboardKeys.forEach((keyEl) => {
  keyEl.addEventListener("click", (event) => {
    if (currentAttempt === 1 && guess.length === 0) {
      message.innerText = "1st Attempt Started";
    }

    const key = keyEl.textContent.trim().toUpperCase();

    if (key === "←") {
      handleBackspace();
    } else if (key === "ENTER") {
      handleEnter();
    } else {
      handleClick(key);
    }
    event.preventDefault();
  });
});

restartBtn.addEventListener("click", () => {
  restartGame();
});

modeBtn.addEventListener("click", () => {
  changeMode();
});
/*----- functions -----*/
init();

function getRandomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
  // return WORDS[0];
}



function init() {
  render();
  restartBtn.style.display = "none";
  keyboardKeys.forEach((key) => {
    key.style.backgroundColor = "";
  });
  gridCells.forEach((cell) => {
    cell.textContent = "";
    cell.style.backgroundColor = "";
  });
  message.innerText = "Welcome! Make your first Guess";
}

function render() {
  targetWord = getRandomWord().toUpperCase();
}

function handleClick(key) {
  if (guess.length < WORD_LENGTH) {
    gridCells[currCellIdx].textContent = key;

    guess += key;

    currCellIdx++;

  } else {
    message.innerText = "Guess is complete. Click enter to submit";
  }
}

function handleBackspace() {
  if (currCellIdx > 0) {
    currCellIdx--;

    guess = guess.slice(0, -1);

    gridCells[currCellIdx].textContent = "";

  }
}

function checkWord() {
  let letterCount = {};

  for (let letter of targetWord) {
    if (!letterCount[letter]) {
      letterCount[letter] = 0;
    }
    letterCount[letter]++;
  }

  for (let i = 0; i < WORD_LENGTH; i++) {
    const guessedLetter = guess.charAt(i);
    const targetLetter = targetWord.charAt(i);

    if (guessedLetter === targetLetter) {
      updateColor(i, guessedLetter, "green");
      letterCount[targetLetter]--;
    }
  }

  for (let i = 0; i < WORD_LENGTH; i++) {
    const guessedLetter = guess.charAt(i);
    const targetLetter = targetWord.charAt(i);

    if (
      guessedLetter !== targetLetter &&
      targetWord.includes(guessedLetter) &&
      letterCount[guessedLetter] > 0
    ) {
      updateColor(i, guessedLetter, "yellow");
      letterCount[guessedLetter]--;
    } else if (!targetWord.includes(guessedLetter)) {
      updateColor(i, guessedLetter, "gray");
    }
  }
}

function updateColor(index, letter, color) {
  gridCells[currCellIdx - WORD_LENGTH + index].style.backgroundColor = color;

  keyboardKeys.forEach((key) => {
    if (key.textContent.trim().toUpperCase() === letter) {
      key.style.backgroundColor = color;
    }
  });
}

function handleEnter() {
  if (guess.length < WORD_LENGTH) {
    message.innerText = "Word must be 5 letters";
  } else {

    if (guess === targetWord) {
      yipee.play();
      message.innerText = "You win!";
      restartBtn.style.display = "block";
      checkWord();
    } else if (guess.length === WORD_LENGTH) {
      guessHistory.push(guess);
      message.innerText = `Incorrect. Enter guess ${currentAttempt+1}.`;
      if(WORDS.includes(guess.trim().toLowerCase())){
        bruh.play();
        checkWord();
        nextGuess();
      }else {
        message.innerText = "This is not a word";
        huh.play();
      }

    }
  }
}

function nextGuess() {
  if (currentAttempt < MAX_ATTEMPTS) {
    currentAttempt++;
    guess = "";
    currCellIdx = (currentAttempt - 1) * WORD_LENGTH;
  } else {
    sadSponge.play();
    message.innerText = `Game Over! The word was ${targetWord}`;
    restartBtn.style.display = "block";
  }
}

function restartGame() {
  currentAttempt = 1;
  guess = "";
  guessHistory = [];
  currCellIdx = 0;
  init();
}

function goDark() {
  let background = document.getElementById("body");
  
  background.style.backgroundColor = "black";
  document.getElementById("h1").style.color = "lightgray";
  message.style.color = "lightgray";
  darkMode = true;
}

function goLight() {
  let background = document.getElementById("body");

  background.style.backgroundColor = "white";
  document.getElementById("h1").style.color = "black";
  message.style.color = "black";
  darkMode = false;
}

function changeMode() {
  if(!darkMode){
    goDark();
  }else {
    goLight();
  }
}

openModal.onclick = function() {
  modal.style.display = "block";
}

closeButton.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
      modal.style.display = "none";
  }
}