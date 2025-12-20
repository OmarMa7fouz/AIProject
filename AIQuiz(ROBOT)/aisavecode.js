// ==============================
// Full Quiz Game JS (Fixed: Position B Collision)
// ==============================

// ---------- Questions ----------
const questions = [
  { question: "What is the capital of France?", options: ["London", "Paris",
"Berlin", "Madrid"], correctAnswer: 1 },
  { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correctAnswer: 1
},
  { question: "Which planet is known as the Red Planet?", options: ["Venus",
"Jupiter", "Mars", "Saturn"], correctAnswer: 2 },
  { question: "What is the largest ocean on Earth?", options: ["Atlantic",
"Indian", "Arctic", "Pacific"], correctAnswer: 3 },
  { question: "Who painted the Mona Lisa?", options: ["Leonardo da Vinci",
"Picasso", "Van Gogh", "Monet"], correctAnswer: 0 }
];

// ---------- State ----------
let currentQuestion = 0;
let score = 0;
let answered = false;
let obstacleTimer = null;
let currentPosition = 'A'; // Starts at top
let activeObstacle = null;

// ---------- Robot positions ----------
const robotPositions = {
  A: { y: 0 },   // Top position
  B: { y: 115 }  // Bottom position
};

// ---------- DOM ----------
const character = document.getElementById('character');
const obstacleA = document.getElementById('obstacleA');
const obstacleB = document.getElementById('obstacleB');

const quizPanel = document.getElementById('quiz-panel');
const questionText = document.getElementById('question-text');
const optionsGrid = document.getElementById('options-grid');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const scoreSpan = document.getElementById('score');
const finalScoreSpan = document.getElementById('final-score');
const totalQuestionsResultSpan =
document.getElementById('total-questions-result');
const performanceMessage = document.getElementById('performance-message');
const restartButton = document.getElementById('restart-button');

const resultsScreen = document.getElementById('results-screen');

const rulesScreen = document.getElementById('rules-screen');
const readyScreen = document.getElementById('ready-screen');
const countdownScreen = document.getElementById('countdown-screen');
const countdownNumber = document.getElementById('countdown-number');
const nextButton = document.getElementById('next-button');
const yesButton = document.getElementById('yes-button');
const gameContainer = document.getElementById('game-container');

// ---------- Sounds ----------
const jumpSound = new Audio('jump.mp3');
const hitSound = new Audio('hit.mp3');
const countdownAudio = new Audio('roboticcd.mp3');

jumpSound.volume = 1.0;
hitSound.volume = 1.0;
countdownAudio.volume = 1.0;

// ---------- Init ----------
function init() {
  totalQuestionsSpan.textContent = questions.length;
  totalQuestionsResultSpan.textContent = questions.length;
  scoreSpan.textContent = score;

  restartButton.addEventListener('click', restartGame);
  nextButton.addEventListener('click', showReady);
  yesButton.addEventListener('click', startCountdown);

  obstacleA.style.display = 'none';
  obstacleB.style.display = 'none';

  // Ensure consistent movement
  character.style.transition = "transform 0.5s ease-in-out";

  showRules();
}

// ---------- Screens ----------
function showRules() {
  rulesScreen.style.display = 'flex';
}

function showReady() {
  rulesScreen.style.display = 'none';
  readyScreen.style.display = 'flex';
}

function startCountdown() {
  readyScreen.style.display = 'none';
  countdownScreen.style.display = 'flex';
  let count = 3;
  countdownAudio.currentTime = 0;
  countdownAudio.play().catch(()=>{});

  function countdown() {
    countdownNumber.textContent = count;
    count--;
    if (count >= 0) {
      setTimeout(countdown, 1000);
    } else {
      countdownNumber.textContent = 'Gooo!';
      setTimeout(() => {
        countdownScreen.style.display = 'none';
        gameContainer.style.display = 'block';
        startRunning();
        startQuestion();
      }, 1000);
    }
  }
  countdown();
}

// ---------- Quiz ----------
function startQuestion() {
  if (currentQuestion >= questions.length) {
    showResults();
    return;
  }

  answered = false;
  currentQuestionSpan.textContent = currentQuestion + 1;
  showQuiz();
  showObstacle();

  // Time limit
  obstacleTimer = setTimeout(() => {
    if (!answered) handleTimeout();
  }, 3500);
}

function showQuiz() {
  const q = questions[currentQuestion];
  questionText.textContent = q.question;
  optionsGrid.innerHTML = '';

  q.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.className = 'option-button';
    btn.textContent = option;
    btn.addEventListener('click', () => handleAnswer(index, btn));
    optionsGrid.appendChild(btn);
  });

  quizPanel.style.display = 'block';
}

function showObstacle() {
  obstacleA.style.display = 'none';
  obstacleB.style.display = 'none';
  obstacleA.style.animation = 'none';
  obstacleB.style.animation = 'none';

  activeObstacle = currentPosition === 'A' ? obstacleA : obstacleB;
  activeObstacle.style.display = 'block';
  void activeObstacle.offsetWidth; // Trigger reflow
  activeObstacle.style.animation = 'obstacleMove 5s linear forwards';
}

// ---------- Answers ----------
function handleAnswer(answerIndex, button) {
  if (answered) return;
  answered = true;
  clearTimeout(obstacleTimer);

  const qObj = questions[currentQuestion];
  const isCorrect = answerIndex === qObj.correctAnswer;
  const allButtons = optionsGrid.querySelectorAll('.option-button');

  // Disable buttons immediately
  allButtons.forEach(b => {
    b.classList.add('disabled');
    b.style.pointerEvents = 'none';
  });

  if (isCorrect) {
    // --- CORRECT ---
    score++;
    scoreSpan.textContent = score;
    button.classList.add('correct');

    jumpSound.currentTime = 0;
    jumpSound.play();

    if (currentPosition === 'A') {
      moveCharacterTo('B');
      currentPosition = 'B';
    } else {
      moveCharacterTo('A');
      currentPosition = 'A';
    }

  } else {
    // --- WRONG ---
    // Delayed collision by 1.7s
    setTimeout(() => {
        button.classList.add('incorrect');
        allButtons[qObj.correctAnswer].classList.add('correct');

        hitSound.currentTime = 0;
        hitSound.play();
        collideCharacter();
    }, 1500);
  }

  // Wait for next question
  setTimeout(() => {
    quizPanel.style.display = 'none';
    if (activeObstacle) {
      activeObstacle.style.display = 'none';
      activeObstacle.style.animation = 'none';
      activeObstacle = null;
    }
    currentQuestion++;
    startQuestion();
  }, 3200);
}

function handleTimeout() {
  answered = true;
  const allButtons = optionsGrid.querySelectorAll('.option-button');
  allButtons.forEach(b => {
    b.classList.add('disabled');
    b.style.pointerEvents = 'none';
  });

  allButtons[questions[currentQuestion].correctAnswer].classList.add('correct');

  hitSound.currentTime = 0;
  hitSound.play();
  collideCharacter();

  setTimeout(() => {
    quizPanel.style.display = 'none';
    if (activeObstacle) {
      activeObstacle.style.display = 'none';
      activeObstacle.style.animation = 'none';
      activeObstacle = null;
    }
    currentQuestion++;
    startQuestion();
  }, 3000);
}

// ---------- Robot movement ----------
function moveCharacterTo(target) {
  const pos = robotPositions[target];
  character.style.transform = `translate(0px, ${pos.y}px)`;
}

// ---------- Character animations (FIXED) ----------
function collideCharacter() {
  character.classList.remove('jumping');

  // 1. Get current Y position (dynamically works for A or B)
  const currentY = robotPositions[currentPosition].y;

  // 2. DISABLE TRANSITION: This prevents the glitch/drift back to top
  character.style.transition = 'none';

  // 3. Play unified JS animation (Shake) at current Y
  const animation = character.animate([
    { transform: `translate(0px, ${currentY}px) rotate(0deg)` },
    { transform: `translate(-10px, ${currentY}px) rotate(-5deg)` },
    { transform: `translate(10px, ${currentY}px) rotate(5deg)` },
    { transform: `translate(-10px, ${currentY}px) rotate(-5deg)` },
    { transform: `translate(10px, ${currentY}px) rotate(5deg)` },
    { transform: `translate(0px, ${currentY}px) rotate(0deg)` }
  ], {
    duration: 500,
    iterations: 3
  });

  // 4. RESTORE TRANSITION: Only after the shake finishes
  animation.onfinish = () => {
    character.style.transition = "transform 0.5s ease-in-out";
    character.style.transform = `translate(0px, ${currentY}px)`;
  };

  // 5. Add 'colliding' class for color/filter effects only
  character.classList.add('colliding');
  setTimeout(() => character.classList.remove('colliding'), 1500);
}

// ---------- Results ----------
function showResults() {
  quizPanel.style.display = 'none';
  if (activeObstacle) {
    activeObstacle.style.display = 'none';
    activeObstacle.style.animation = 'none';
  }

  finalScoreSpan.textContent = score;
  let percentage = score / questions.length;
  let message = "";

  if (percentage === 1) message = "Victory! 🏆";
  else if (percentage >= 0.7) message = "Great job! 🌟";
  else if (percentage >= 0.5) message = "Good effort! 👍";
  else message = "Keep going! 💪";

  performanceMessage.textContent = message;
  resultsScreen.style.display = 'flex';
}

// ---------- Restart ----------
function restartGame() {
  currentQuestion = 0;
  score = 0;
  answered = false;
  currentPosition = 'A';
  scoreSpan.textContent = score;

  resultsScreen.style.display = 'none';
  character.classList.remove('colliding');

  moveCharacterTo('A');

  startQuestion();
}

// ---------- Running sprite ----------
let currentFrame = 1, totalFrames = 3, runningInterval = null;

function startRunning() {
  if (runningInterval) return;
  character.classList.add('running');
  runningInterval = setInterval(() => {
    document.querySelectorAll('#character .frame').forEach(f => f.style.display
= 'none');
    const el = document.querySelector(`#character .frame${currentFrame}`);
    if (el) el.style.display = 'block';
    currentFrame++;
    if (currentFrame > totalFrames) currentFrame = 1;
  }, 120);
}

function stopRunning() {
  clearInterval(runningInterval);
  runningInterval = null;
  character.classList.remove('running');
}

// ---------- Start ----------
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
