/* ================================
   AI ROBOT RUN GAME (EXACT SAME AS MAG.JS)
================================ */

/* --- 1. GAME VARIABLES --- */
let currentQuestion = 0;
let score = 0;
let q;
let currentStreak = 0;
let bestStreak = 0;
let questionsAnswered = 0;
let questionsCorrect = 0;
let questionStartTime = null;
let fastestAnswerMs = null;

// Greedy Algorithm Tracking - من الماجيك
let currentLevel = "easy"; // easy, medium, hard
let currentGroup = "e1";   // e1, e2, e3...
let totalPoints = 0;       // Accumulates value

// Greedy Values - من الماجيك
const groupValues = {
    e1: 3, e2: 2, e3: 1,
    m1: 3, m2: 2, m3: 1,
    h1: 3, h2: 2, h3: 1,
};

/* --- 2. QUIZ DATA - AI QUESTIONS --- */
const quizData = {
  e1: [
    { question: "AI stands for:", choices: ["Artificial Input", "Artificial Intelligence", "Automatic Interaction", "Advanced Internet"], answer: 1 },
    { question: "Who proposed the Turing Test?", choices: ["Einstein", "Alan Turing", "Newton", "Russell"], answer: 1 },
    { question: "In the Turing Test, communication happens through:", choices: ["Voice", "Images", "Written text", "Gestures"], answer: 2 },
    { question: "Sensors allow an agent to:", choices: ["Think", "Perceive the environment", "Move", "Learn"], answer: 1 },
    { question: "A percept is:", choices: ["The agent's memory", "The agent's action", "The input received at a given time", "The program code"], answer: 2 },
    { question: "Machine Learning is a subset of:", choices: ["Databases", "Artificial Intelligence", "Robotics", "Mathematics"], answer: 1 },
    { question: "Hands and legs of a human agent are:", choices: ["Sensors", "Actuators", "Percepts", "Controllers"], answer: 1 },
    { question: "Goal of a rational agent is to:", choices: ["Do random actions", "Do the right thing", "Copy humans", "Store data"], answer: 1 },
    { question: "PEAS is used to describe:", choices: ["Programming languages", "Task environments", "Neural networks", "Human psychology"], answer: 1 },
    { question: "Taxi driving is:", choices: ["Single-agent", "Multi-agent", "Unobservable", "Static"], answer: 1 },
  ],
  e2: [
    { question: "The main goal of an intelligent agent is to:", choices: ["Look pretty", "Act randomly", "Act to maximize performance", "Store big data"], answer: 2 },
    { question: "An agent perceives the environment using:", choices: ["Actuators", "GPS", "Sensors", "Screens"], answer: 2 },
    { question: "In the vacuum world, 'Suck' is an example of:", choices: ["Percept", "Sensor", "Actuator action", "Memory"], answer: 2 },
    { question: "The agent program runs on:", choices: ["The physical architecture", "A textbook", "A table", "The internet"], answer: 0 },
    { question: "Simple reflex agents are:", choices: ["Using long-term memory", "Stateless", "Goal-based", "Utility-based"], answer: 1 },
    { question: "A condition-action rule belongs to:", choices: ["Goal-based agents", "Reflex agents", "Utility agents", "Learning agents"], answer: 1 },
    { question: "Model-based agents maintain:", choices: ["No memory", "Internal state", "Only goals", "Utility functions"], answer: 1 },
    { question: "A goal describes:", choices: ["Sensors", "Desired situations", "History of percepts", "Utility values"], answer: 1 },
    { question: "Utility-based agents choose actions based on:", choices: ["Randomness", "Emotions", "Utility function", "Sound waves"], answer: 2 },
    { question: "Problem-solving agents are a type of:", choices: ["Model-based agents", "Reflex agents", "Goal-based agents", "Utility-based agents"], answer: 2 },
  ],
  e3: [
    { question: "The initial state represents:", choices: ["The goal", "The state where the agent begins", "The transition rules", "The path cost"], answer: 1 },
    { question: "The function that checks if a state is the goal is called:", choices: ["Successor function", "Goal test", "Path cost", "Transition model"], answer: 1 },
    { question: "Path cost measures:", choices: ["The number of states", "The total cost of a sequence of actions", "The heuristic estimate", "The number of goals"], answer: 1 },
    { question: "A well-defined problem consists of how many components?", choices: ["Two", "Three", "Five", "Seven"], answer: 2 },
    { question: "The set of all possible states reachable from the start is:", choices: ["State graph", "State space", "Path", "Goal space"], answer: 1 },
    { question: "Humans do not use exhaustive search because:", choices: ["It is too slow", "It is impossible", "They use heuristics", "They avoid goals"], answer: 2 },
    { question: "In the Romania example, the initial state is:", choices: ["Bucharest", "Sibiu", "Arad", "Zerind"], answer: 2 },
    { question: "Tree search may fail because it:", choices: ["Stores too many states", "Allows repeated states", "Uses heuristics", "Has no frontier"], answer: 1 },
    { question: "In TREE-SEARCH, the algorithm starts by:", choices: ["Expanding all nodes", "Choosing a leaf", "Initializing the frontier", "Checking the goal"], answer: 2 },
    { question: "The agent's performance measure is given by the:", choices: ["Actuators", "Sensors", "Environment", "Programmer"], answer: 2 },
  ],
  m1: [
    { question: "Thinking humanly focuses on:", choices: ["Logic only", "Mimicking human thought", "Physical actions", "Perfect inference"], answer: 1 },
    { question: "Which of the following is required to pass the Turing Test?", choices: ["Strong muscles", "Knowledge representation", "Flight control", "Weather prediction"], answer: 1 },
    { question: "Robotic agents sense the world using:", choices: ["Cameras and infrared", "Keyboards", "Microphones only", "No sensors"], answer: 0 },
    { question: "Fully observable means the agent:", choices: ["Can see everything relevant", "Has no sensors", "Can act randomly", "Predicts the future"], answer: 0 },
    { question: "Taxi driving is stochastic because:", choices: ["Cars never move", "Traffic is unpredictable", "All actions are fixed", "Sensors don't work"], answer: 1 },
    { question: "An episodic environment means:", choices: ["Every episode is independent", "Decisions depend on history", "It must be dynamic", "It uses learning"], answer: 0 },
    { question: "A deterministic environment is one where:", choices: ["Everything is random", "Next state depends fully on current state + action", "Agent has no control", "Multi-agent only"], answer: 1 },
    { question: "The agent function maps:", choices: ["Actions → percepts", "Internal state → sensors", "Percept sequence → actions", "Utilities → goals"], answer: 2 },
    { question: "A table-driven agent is considered infeasible because:", choices: ["It uses sensors", "Table becomes huge", "It learns from mistakes", "It uses actuators"], answer: 1 },
    { question: "Simple reflex vacuum agent works if:", choices: ["Current percept is enough", "It has full percept history", "It knows the goal", "It has utility functions"], answer: 0 },
  ],
  m2: [
    { question: "Model-based agents require knowledge about:", choices: ["Weather", "How the world changes", "Who programmed them", "Internet speed"], answer: 1 },
    { question: "Goal-based agents need:", choices: ["Only current percept", "A goal description", "No memory", "No sensors"], answer: 1 },
    { question: "Utility-based agents help in:", choices: ["Rule expansion", "Making tradeoff decisions", "Avoiding sensors", "Eliminating goals"], answer: 1 },
    { question: "Learning agents include a performance element which:", choices: ["Gives feedback", "Suggests random actions", "Selects actions", "Stores goals"], answer: 2 },
    { question: "Problem generator helps learning agents by:", choices: ["Hiding mistakes", "Suggesting exploratory actions", "Cleaning memory", "Increasing percept rate"], answer: 1 },
    { question: "Simple reflex agents fail when:", choices: ["Rules are many", "Current percept is insufficient", "Sensors are strong", "Environment is static"], answer: 1 },
    { question: "An internal state is updated using:", choices: ["Goals only", "World-change knowledge", "Actuators only", "Utility functions"], answer: 1 },
    { question: "Heuristics help reduce:", choices: ["Goal testing", "State space search", "Initial state", "Path cost"], answer: 1 },
    { question: "Expanding a node means:", choices: ["Removing all paths", "Generating successor nodes", "Restarting the search", "Finding all goal states"], answer: 1 },
    { question: "The explored set is used to:", choices: ["Prevent repeated states", "Speed up path cost", "Generate heuristics", "Test optimality"], answer: 0 },
  ],
  m3: [
    { question: "The transition model describes:", choices: ["The cost of each path", "What actions do to states", "The final goal", "The entire search tree"], answer: 1 },
    { question: "In the 8-queens problem, actions involve:", choices: ["Moving any queen", "Removing a queen", "Adding a queen to an empty square", "Changing the board size"], answer: 2 },
    { question: "The objective of the Traveling Salesman Problem is to:", choices: ["Visit only the nearest cities", "Minimize the total travel distance", "Visit each city twice", "Use the least number of actions"], answer: 1 },
    { question: "In 8-puzzle, path cost is:", choices: ["Number of misplaced tiles", "Number of moves", "Heuristic value", "Depth of the goal"], answer: 1 },
    { question: "Completeness of a search strategy means:", choices: ["It finds the optimal cost", "It always terminates", "It finds a solution if one exists", "It uses minimum memory"], answer: 2 },
    { question: "In tree search, if the chosen leaf is a goal, the algorithm:", choices: ["Restarts", "Returns the solution", "Ignores it", "Removes the frontier"], answer: 1 },
    { question: "Graph search improves tree search by:", choices: ["Expanding more states", "Ignoring the frontier", "Keeping an explored set", "Removing the initial state"], answer: 2 },
    { question: "For a problem-solving agent, the first step before searching is:", choices: ["Expanding nodes", "Formulating the goal and problem", "Testing the goal", "Calculating path cost"], answer: 1 },
  ],
  h1: [
    { question: "Which approach focuses on humans' actual cognitive processes?", choices: ["Acting rationally", "Thinking humanly", "Thinking rationally", "Acting humanly"], answer: 1 },
    { question: "Why is acting rationally more scientific?", choices: ["Does not depend on human behavior", "Uses magic", "Ignores data", "Works only with robots"], answer: 0 },
    { question: "A vacuum agent is rational if:", choices: ["It moves randomly", "It maximizes performance based on environment knowledge", "It ignores dirt", "It has no sensors"], answer: 1 },
    { question: "Chess is deterministic because:", choices: ["Opponent moves are random", "Rules define exact next state", "Board is invisible", "Pieces move randomly"], answer: 1 },
    { question: "Main challenge in knowledge representation:", choices: ["Too many robots", "Hard to encode real-world knowledge formally", "Computers can't store data", "No sensors exist"], answer: 1 },
    { question: "In a PEAS model for a taxi, actuators include:", choices: ["Steering and acceleration", "Eyes", "Logic rules", "Neural networks"], answer: 0 },
    { question: "Stochastic environments differ from non-deterministic because:", choices: ["Agents control randomness", "Outcomes involve probabilities", "Everything is known", "Actions never fail"], answer: 1 },
    { question: "Percept sequence is important in sequential tasks because:", choices: ["Past percepts affect future decisions", "Only current percept matters", "No actions are needed", "Environment is episodic"], answer: 0 },
    { question: "Dynamic environments are harder because:", choices: ["They don't change", "Agent must constantly update its actions", "Agent sleeps", "No sensors needed"], answer: 1 },
    { question: "Machine learning helps pass the Turing Test by:", choices: ["Making robots stronger", "Helping AI adapt language patterns", "Removing reasoning", "Ignoring user input"], answer: 1 },
  ],
  h2: [
    { question: "Why is a table-driven agent not scalable?", choices: ["Sensors are weak", "Table size grows exponentially", "Goals are unclear", "Actuators stop working"], answer: 1 },
    { question: "Utility-based agents outperform goal-based agents because:", choices: ["They use random choices", "They evaluate multiple possible desirable states", "They ignore performance measures", "They skip planning"], answer: 1 },
    { question: "In model-based agents, knowing internal state is not enough because:", choices: ["Goals might conflict", "Actions might have multiple outcomes", "Agent needs rules only", "Agent doesn't need sensors"], answer: 1 },
    { question: "Learning agent robustness comes from:", choices: ["Fixed rules", "Ability to improve in unknown environments", "Removing exploration", "Memorizing everything"], answer: 1 },
    { question: "A complete utility agent evaluates:", choices: ["Only goals", "Happiness (utility) of states", "Sensor malfunction", "Memory constraints"], answer: 1 },
    { question: "Goal-based planning differs from reflex action because:", choices: ["Reflex ignores future consequences", "Reflex uses more memory", "Planning has no goal", "Planning is random"], answer: 0 },
    { question: "Model-based agents outperform simple reflex agents in:", choices: ["Fully observable environments", "Partially observable environments", "Static environments only", "Deterministic environments only"], answer: 1 },
    { question: "Exploration vs exploitation in learning agents means:", choices: ["Choosing between random and known-good actions", "Avoiding all new experiences", "Using sensors only", "Ignoring utility"], answer: 0 },
    { question: "Goal-based action selection requires:", choices: ["Utility function", "Search/planning", "Reflex rules", "Internal state only"], answer: 1 },
    { question: "Utility-based agents can solve conflicting goals by:", choices: ["Ignoring goals", "Evaluating utilities of outcomes", "Storing more percepts", "Changing sensors"], answer: 1 },
  ],
  h3: [
    { question: "TSP is NP-hard because:", choices: ["It has only one solution", "It requires checking all permutations in worst case", "It is always optimal", "It uses graphs"], answer: 1 },
    { question: "Without an explored set, search may enter:", choices: ["Optimal paths", "Infinite loops", "Heuristic problems", "Shallow states"], answer: 1 },
    { question: "High time complexity affects algorithms by:", choices: ["Reducing memory", "Making search slow or impossible", "Improving optimality", "Removing repeated states"], answer: 1 },
    { question: "Formal problem formulation requires:", choices: ["Only a start state", "Actions, result model, goal test, cost", "Heuristic rules only", "A complete graph"], answer: 1 },
    { question: "The accuracy of the final solution in informed search depends mainly on:", choices: ["Branching factor", "Heuristic quality", "Goal test", "Number of levels"], answer: 1 },
    { question: "The successor function returns:", choices: ["Only the heuristic value", "Action-state pairs", "The explored set", "The frontier"], answer: 1 },
    { question: "15-puzzle is harder than 8-queens because:", choices: ["It has fewer states", "The state space is much larger", "It has no goal", "It has no transition model"], answer: 1 },
    { question: "Robot navigation differs from board puzzles because:", choices: ["It uses continuous spaces", "It has no actions", "It is easier", "It has no goals"], answer: 0 },
    { question: "Tree search is never optimal unless:", choices: ["All step costs are equal", "Heuristic is perfect", "There is no branching", "Frontier is empty"], answer: 0 },
    { question: "Graph search avoids redundant paths by:", choices: ["Resetting frontier", "Tracking visited states", "Expanding the tree fully", "Removing all costs"], answer: 1 },
  ],
};

/* --- 3. DOM ELEMENTS --- */
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
const totalQuestionsResultSpan = document.getElementById('total-questions-result');
const performanceMessage = document.getElementById('performance-message');
const restartButton = document.getElementById('restart-button');
const homeButton = document.getElementById('home-button');
const resultsScreen = document.getElementById('results-screen');
const rulesScreen = document.getElementById('rules-screen');
const readyScreen = document.getElementById('ready-screen');
const countdownScreen = document.getElementById('countdown-screen');
const countdownNumber = document.getElementById('countdown-number');
const nextButton = document.getElementById('next-button');
const yesButton = document.getElementById('yes-button');
const gameContainer = document.getElementById('game-container');

/* --- 4. AUDIO --- */
const jumpSound = new Audio('jump.mp3');
const hitSound = new Audio('hit.mp3');
const countdownAudio = new Audio('roboticcd.mp3');
jumpSound.volume = 1.0;
hitSound.volume = 1.0;
countdownAudio.volume = 1.0;

/* --- 5. GAME STATE --- */
let currentPosition = 'A';
let obstacleTimer = null;
let activeObstacle = null;
let answered = false;

// Robot positions
const robotPositions = {
  A: { y: 0 },   // Top position
  B: { y: 115 }  // Bottom position
};

/* --- 6. INITIALIZATION --- */
function init() {
  if (!character || !quizPanel || !questionText || !optionsGrid) {
    console.error("Critical DOM elements missing!");
    return;
  }

  const currentQuestions = quizData[currentGroup] || [];
  totalQuestionsSpan.textContent = currentQuestions.length;
  totalQuestionsResultSpan.textContent = currentQuestions.length;
  scoreSpan.textContent = score;

  restartButton.addEventListener('click', restartGame);
  if (homeButton) {
    homeButton.addEventListener('click', () => {
      window.location.href = "../home2.html";
    });
  }

  nextButton.addEventListener('click', showReady);
  yesButton.addEventListener('click', startCountdown);

  obstacleA.style.display = 'none';
  obstacleB.style.display = 'none';
  character.style.transition = "transform 0.5s ease-in-out";

  showRules();
}

/* --- 7. SCREEN TRANSITIONS --- */
function showRules() {
  if (rulesScreen) rulesScreen.style.display = 'flex';
}

function showReady() {
  if (rulesScreen) rulesScreen.style.display = 'none';
  if (readyScreen) readyScreen.style.display = 'flex';
}

function startCountdown() {
  if (readyScreen) readyScreen.style.display = 'none';
  if (countdownScreen) countdownScreen.style.display = 'flex';

  let count = 3;
  countdownAudio.currentTime = 0;
  countdownAudio.play().catch(()=>{});

  function countdown() {
    if (countdownNumber) countdownNumber.textContent = count;
    count--;
    if (count >= 0) {
      setTimeout(countdown, 1000);
    } else {
      if (countdownNumber) countdownNumber.textContent = 'Gooo!';
      setTimeout(() => {
        if (countdownScreen) countdownScreen.style.display = 'none';
        if (gameContainer) gameContainer.style.display = 'block';
        startRunning();
        startQuestion();
      }, 1000);
    }
  }
  countdown();
}

/* --- 8. QUIZ FUNCTIONS --- */
function startQuestion() {
  const currentQuestions = quizData[currentGroup] || [];

  if (currentQuestion >= currentQuestions.length) {
    showResult(); // تم التعديل من showResults إلى showResult
    return;
  }

  answered = false;
  q = currentQuestions[currentQuestion];

  if (currentQuestionSpan) currentQuestionSpan.textContent = currentQuestion + 1;

  questionStartTime = performance.now();
  showQuiz();
  showObstacle();

  obstacleTimer = setTimeout(() => {
    if (!answered) handleTimeout();
  }, 3500);
}

function showQuiz() {
  if (!q) return;

  if (questionText) questionText.textContent = q.question;
  if (optionsGrid) {
    optionsGrid.innerHTML = '';

    q.choices.forEach((choice, index) => {
      const btn = document.createElement('button');
      btn.className = 'option-button';
      btn.textContent = choice;
      btn.addEventListener('click', () => handleAnswer(index, btn));
      optionsGrid.appendChild(btn);
    });
  }

  if (quizPanel) quizPanel.style.display = 'block';
}

function showObstacle() {
  if (obstacleA) obstacleA.style.display = 'none';
  if (obstacleB) obstacleB.style.display = 'none';

  if (obstacleA) obstacleA.style.animation = 'none';
  if (obstacleB) obstacleB.style.animation = 'none';

  activeObstacle = currentPosition === 'A' ? obstacleA : obstacleB;
  if (activeObstacle) {
    activeObstacle.style.display = 'block';
    void activeObstacle.offsetWidth; // Trigger reflow
    activeObstacle.style.animation = 'obstacleMove 5s linear forwards';
  }
}

/* --- 9. ANSWER HANDLING --- */
function handleAnswer(answerIndex, button) {
  if (answered || !q) return;
  answered = true;
  clearTimeout(obstacleTimer);

  const isCorrect = answerIndex === q.answer;
  const allButtons = optionsGrid ? optionsGrid.querySelectorAll('.option-button') : [];

  allButtons.forEach(b => {
    b.classList.add('disabled');
    b.style.pointerEvents = 'none';
  });

  questionsAnswered++;

  if (isCorrect) {
    // --- CORRECT ---
    questionsCorrect++;
    currentStreak++;
    if (currentStreak > bestStreak) bestStreak = currentStreak;

    let gained = 1;
    if (currentStreak > 1) gained += currentStreak - 1;
    score += gained;

    if (scoreSpan) scoreSpan.textContent = score;
    button.classList.add('correct');

    if (jumpSound) {
      jumpSound.currentTime = 0;
      jumpSound.play();
    }

    // Move robot
    if (currentPosition === 'A') {
      moveCharacterTo('B');
      currentPosition = 'B';
    } else {
      moveCharacterTo('A');
      currentPosition = 'A';
    }

    // Track fastest answer
    if (questionStartTime != null) {
      const elapsed = performance.now() - questionStartTime;
      if (fastestAnswerMs == null || elapsed < fastestAnswerMs) {
        fastestAnswerMs = elapsed;
      }
    }

  } else {
    // --- WRONG ---
    currentStreak = 0;

    setTimeout(() => {
      button.classList.add('incorrect');
      if (q.answer >= 0 && allButtons[q.answer]) {
        allButtons[q.answer].classList.add('correct');
      }

      if (hitSound) {
        hitSound.currentTime = 0;
        hitSound.play();
      }
      collideCharacter();
    }, 1500);
  }

  setTimeout(() => {
    if (quizPanel) quizPanel.style.display = 'none';
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
  if (!q) return;

  answered = true;
  questionsAnswered++;
  currentStreak = 0;

  const allButtons = optionsGrid ? optionsGrid.querySelectorAll('.option-button') : [];

  allButtons.forEach(b => {
    b.classList.add('disabled');
    b.style.pointerEvents = 'none';
  });

  if (q.answer >= 0 && allButtons[q.answer]) {
    allButtons[q.answer].classList.add('correct');
  }

  if (hitSound) {
    hitSound.currentTime = 0;
    hitSound.play();
  }

  collideCharacter();

  setTimeout(() => {
    if (quizPanel) quizPanel.style.display = 'none';
    if (activeObstacle) {
      activeObstacle.style.display = 'none';
      activeObstacle.style.animation = 'none';
      activeObstacle = null;
    }
    currentQuestion++;
    startQuestion();
  }, 3000);
}

/* --- 10. ROBOT MOVEMENT --- */
function moveCharacterTo(target) {
  const pos = robotPositions[target];
  if (character) {
    character.style.transform = `translate(0px, ${pos.y}px)`;
  }
}

function collideCharacter() {
  if (!character) return;

  character.classList.remove('jumping');
  const currentY = robotPositions[currentPosition].y;
  character.style.transition = 'none';

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

  animation.onfinish = () => {
    character.style.transition = "transform 0.5s ease-in-out";
    character.style.transform = `translate(0px, ${currentY}px)`;
  };

  character.classList.add('colliding');
  setTimeout(() => character.classList.remove('colliding'), 1500);
}

/* --- 11. GREEDY ALGORITHM (من الماجيك) --- */
function calculateNextMove() {
    const passed = score > 5;
    let message = "";
    let isVictory = false;
    let isGameOver = false;

    // 1. ADD POINTS ONLY IF PASSED
    if (passed) {
        totalPoints += groupValues[currentGroup];
    }

    // 2. DETERMINE NEXT STATE
    if (currentLevel === "easy") {
        if (passed) {
            currentLevel = "medium";
            currentGroup = "m1";
            message = "Excellent! Moving to Medium Level.";
        } else {
            if (currentGroup === "e1") { currentGroup = "e2"; message = "Taking path E2..."; }
            else if (currentGroup === "e2") { currentGroup = "e3"; message = "Taking path E3..."; }
            else { isGameOver = true; message = "Game Over. Failed Easy level."; }
        }
    }
    else if (currentLevel === "medium") {
        if (passed) {
            currentLevel = "hard";
            currentGroup = "h1";
            message = "Impressive! Entering Hard Level.";
        } else {
            if (currentGroup === "m1") { currentGroup = "m2"; message = "Taking path M2..."; }
            else if (currentGroup === "m2") { currentGroup = "m3"; message = "Taking path M3..."; }
            else { isGameOver = true; message = "Game Over. Failed Medium level."; }
        }
    }
    else if (currentLevel === "hard") {
        if (passed) {
            isVictory = true;

            message = `CONGRATULATIONS! You mastered AI! Total Value: ${totalPoints}`;

        } else {
            if (currentGroup === "h1") { currentGroup = "h2"; message = "Taking path H2..."; }
            else if (currentGroup === "h2") { currentGroup = "h3"; message = "Taking path H3..."; }
            else { isGameOver = true; message = "Game Over. Failed Hard level."; }
        }
    }

    return { message, isVictory, isGameOver };
}

function processNextLevel() {
    const result = calculateNextMove();
    if (result.isVictory || result.isGameOver) {
        alert(result.message);
        location.reload();
    } else {
        alert(result.message);
        score = 0;
        currentQuestion = 0;
        questionsCorrect = 0;
        restartGame();
    }
}

/* --- 12. SHOW RESULT (من الماجيك مع تعديلات) --- */
function showResult() {
  // إخفاء عناصر اللعبة
  if (quizPanel) quizPanel.style.display = 'none';
  if (activeObstacle) {
    activeObstacle.style.display = 'none';
    activeObstacle.style.animation = 'none';
  }

  stopRunning();

  const currentQuestions = quizData[currentGroup] || [];
  const totalQ = currentQuestions.length;

  // حساب النتائج
  const accuracy = totalQ ? (questionsCorrect / totalQ) : 0;
  const percentage = Math.round(accuracy * 100);

  let title = "AI Beginner 🤖";
  if (accuracy === 1) title = "Perfect AI Master! 🧠🏆";
  else if (accuracy >= 0.7) title = "Great AI knowledge! 🌟";
  else if (accuracy >= 0.5) title = "Good understanding! 👍";
  else title = "Keep learning AI! 💪";

  // عرض النتائج
  if (finalScoreSpan) finalScoreSpan.textContent = score;

  const streakLine = `Best streak: ${bestStreak || 0} correct in a row`;
  const timeLine = fastestAnswerMs != null ? `Fastest answer: ${Math.round(fastestAnswerMs)} ms` : "";
  const accuracyLine = `Accuracy: ${percentage}%`;

  if (performanceMessage) {
    performanceMessage.textContent = [title, streakLine, timeLine, accuracyLine]
      .filter(Boolean)
      .join(" • ");
  }

  // إظهار شاشة النتائج
  if (resultsScreen) resultsScreen.style.display = 'flex';

  // ========== زر Continue Journey (من الماجيك) ==========
  const existingBtn = document.getElementById('continue-btn');
  if (existingBtn) existingBtn.remove();

  const continueBtn = document.createElement("button");
  continueBtn.id = "continue-btn";
  continueBtn.textContent = "Continue Journey ➔";
  continueBtn.style.padding = "10px 20px";
  continueBtn.style.fontSize = "1.2rem";
  continueBtn.style.marginTop = "20px";
  continueBtn.style.cursor = "pointer";
  continueBtn.style.backgroundColor = "#4CAF50";
  continueBtn.style.color = "white";
  continueBtn.style.border = "none";
  continueBtn.style.borderRadius = "5px";
  continueBtn.style.fontWeight = "bold";

  // عند الضغط على الزر
  continueBtn.onclick = function() {
    processNextLevel();
  };

  // إضافة الزر إلى شاشة النتائج
  const resultsContainer = document.querySelector('.results-container');
  if (resultsContainer) {
    resultsContainer.appendChild(continueBtn);
  } else if (resultsScreen) {
    resultsScreen.appendChild(continueBtn);
  }

  // إضافة زر الخروج للصفحة الرئيسية
  const homeBtn = document.getElementById("home-button");
  if (homeBtn) {
    homeBtn.style.display = "block";
    homeBtn.style.marginTop = "10px";
  }

  // ========== حفظ النتائج في localStorage ==========
  try {
    const currentRaw = localStorage.getItem("currentUser");
    const usersRaw = localStorage.getItem("quizUsers");
    if (currentRaw && usersRaw) {
      const current = JSON.parse(currentRaw);
      const users = JSON.parse(usersRaw);
      const idx = users.findIndex(
        (u) => u.username && current.username &&
               u.username.toLowerCase() === current.username.toLowerCase()
      );
      if (idx !== -1) {
        const user = users[idx];
        if (!user.matches) user.matches = [];

        // Simple XP system
        const xpEarned = Math.max(
          5,
          Math.round((score / (totalQ || 1)) * 80 + bestStreak * 5)
        );
        const previousXp = user.xp || 0;
        const newXp = previousXp + xpEarned;
        const newLevel = 1 + Math.floor(newXp / 100);

        const match = {
          game: "AI Robot Run",
          course: "ai",
          level: currentLevel,
          group: currentGroup,
          score,
          total: totalQ,
          accuracy: percentage,
          bestStreak,
          xpEarned,
          fastestAnswerMs,
          totalPoints,
          finishedAt: new Date().toISOString(),
        };
        user.matches.push(match);
        user.xp = newXp;
        user.level = newLevel;
        users[idx] = user;
        localStorage.setItem("quizUsers", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify(user));
      }
    }
  } catch (e) {
    console.error("Failed to store AI game history", e);
  }
}

/* --- 13. RESTART GAME --- */
function restartGame() {
  const currentQuestions = quizData[currentGroup] || [];

  currentQuestion = 0;
  score = 0;
  answered = false;
  currentPosition = 'A';

  if (scoreSpan) scoreSpan.textContent = score;

  // Reset stats
  currentStreak = 0;
  bestStreak = 0;
  questionsAnswered = 0;
  questionsCorrect = 0;
  questionStartTime = null;
  fastestAnswerMs = null;

  if (resultsScreen) resultsScreen.style.display = 'none';
  if (character) character.classList.remove('colliding');

  moveCharacterTo('A');

  if (totalQuestionsSpan) totalQuestionsSpan.textContent = currentQuestions.length;
  if (totalQuestionsResultSpan) totalQuestionsResultSpan.textContent = currentQuestions.length;

  startQuestion();
}

/* --- 14. RUNNING ANIMATION --- */
let currentFrame = 1, totalFrames = 3, runningInterval = null;

function startRunning() {
  if (runningInterval) return;
  if (character) character.classList.add('running');

  runningInterval = setInterval(() => {
    if (!character) return;

    document.querySelectorAll('#character .frame').forEach(f => f.style.display = 'none');
    const el = document.querySelector(`#character .frame${currentFrame}`);
    if (el) el.style.display = 'block';

    currentFrame++;
    if (currentFrame > totalFrames) currentFrame = 1;
  }, 120);
}

function stopRunning() {
  clearInterval(runningInterval);
  runningInterval = null;
  if (character) character.classList.remove('running');
}

/* --- 15. START GAME --- */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
