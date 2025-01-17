const wordToGuess = "SYNTH";
const maxLives = 3;
let currentLives = maxLives;
let score = 0;
let guessedLetters = [];
let gameRunning = true;

const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit");
const resetButton = document.getElementById("reset");

const letterImages = [
  document.getElementById("s-letter"),
  document.getElementById("y-letter"),
  document.getElementById("n-letter"),
  document.getElementById("t-letter"),
  document.getElementById("h-letter")
]

resetButton.style.visibility = "hidden";

function initializeGame() {
  gameRunning = true;
  for (let i = 0; i < letterImages.length; i++) {
    letterImage = letterImages[i];
    letterImage.style.visibility = "hidden";
  }

  currentLives = maxLives;
  score = 0;
  guessedLetters = [];
  guessInput.value = "";

  updatePlayerData();
}

function updatePlayerData() {
  scoreDisplay.textContent = score;
  livesDisplay.textContent = currentLives;
}

function handleGuess() {
  if (!gameRunning) return;
  resetButton.style.visibility = "visible";

  const guess = guessInput.value.toUpperCase().trim();
  guessInput.value = "";

  if (guess.length === 0) return;

  if (guess.length === 1) {
    if (wordToGuess.includes(guess)) {
      if (!guessedLetters.includes(guess)) {
        guessedLetters.push(guess);
        score += 20;
        updateWordDisplay();
      }
    } else {
      currentLives--;
    }
  } else {
    if (guess === wordToGuess) {
      score = 100;
      gameRunning = false;
      alert("You won!");
      for (let i = 0; i < wordToGuess.length; i++) {
        const letter = wordToGuess[i];
        guessedLetters.push(letter);
      }
      updateWordDisplay();
      updatePlayerData();
      return;
    } else {
      currentLives = 0;
    }
  }

  updatePlayerData();
  checkGameOver();
}

function updateWordDisplay() {
  let won = true;
  for (let i = 0; i < wordToGuess.length; i++) {
    const letter = wordToGuess[i];
    if (guessedLetters.includes(letter)) {
      letterImages[i].style.visibility = "visible";
    } else {
      letterImages[i].style.visibility = "hidden";
      won = false;
    }
  }

  if (won) {
    gameRunning = false;
    alert("You won!");
  }
}

function checkGameOver() {
  if (currentLives <= 0) {
    alert("You lost! The word was: " + wordToGuess);
    gameRunning = false;
  }
}

resetButton.addEventListener("click", initializeGame);
submitButton.addEventListener("click", handleGuess);

initializeGame();
