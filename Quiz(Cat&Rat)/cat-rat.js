//==============================
// Full Quiz Game JS (Updated: Animated Obstacles) - FIXED with Greedy Algorithm
// ==============================

// 1. GREEDY ALGORITHM TRACKING (مرة واحدة فقط)
let currentLevel = "easy";
let currentGroup = "e1";
let totalPoints = 0;

// Greedy Values
const groupValues = {
    e1: 3, e2: 2, e3: 1,
    m1: 3, m2: 2, m3: 1,
    h1: 3, h2: 2, h3: 1,
};

// ============================================================
// 2. QUIZ DATA - PARALLEL COMPUTING SUBJECT
// ============================================================
const quizData = {
    e1: [
        { question: "What is parallel computing?", choices: ["Using one processor", "Using multiple computing resources at the same time", "Storing data only", "A type of database"], answer: 1 },
        { question: "Concurrency means:", choices: ["Tasks happen one after another", "Multiple tasks make progress seemingly at the same time", "Only one task runs forever", "No tasks run"], answer: 1 },
        { question: "Parallelism means:", choices: ["One CPU switches between tasks", "Multiple CPUs run tasks at exactly the same time", "Tasks start then stop", "Memory is shared"], answer: 1 },
        { question: "In distributed systems, components:", choices: ["Run on one computer only", "Are located in different places", "Do not communicate", "Cannot fail"], answer: 1 },
        { question: "HPC stands for:", choices: ["High Power Computer", "High Performance Computing", "High Parallel Code", "High Processing Core"], answer: 1 },
        { question: "HTC focuses on:", choices: ["One big task", "Many smaller parallel tasks", "No computation", "Sequential work"], answer: 1 },
        { question: "Cloud computing offers:", choices: ["Offline resources", "On-demand internet-based resources", "Only storage", "No scalability"], answer: 1 },
        { question: "Public cloud example:", choices: ["Gmail", "Private university server", "Local hard drive", "BIOS system"], answer: 0 },
        { question: "SISD stands for:", choices: ["Single Instruction Single Data", "Simple Instruction Single Device", "Single Input Shared Data", "Shared Instruction Single Device"], answer: 0 },
        { question: "SIMD executes:", choices: ["Different instructions, same data", "Same instruction, multiple data", "Only one core", "No instructions"], answer: 1 },
    ],

    e2: [
        { question: "MIMD means:", choices: ["Multiple instructions, multiple data", "Many inputs, many devices", "Mixed memory", "Multi-interconnected devices"], answer: 0 },
        { question: "PRAM is a model of:", choices: ["Sequential computing", "Parallel computing", "Cloud systems", "Storage devices"], answer: 1 },
        { question: "Shared memory systems allow:", choices: ["Each processor to use its own memory only", "All processors to access common memory", "Only one processor to work", "No communication"], answer: 1 },
        { question: "Message passing is used in:", choices: ["Shared memory systems", "Distributed memory systems", "SISD", "GPU only"], answer: 1 },
        { question: "Distributed systems are known for:", choices: ["High fault tolerance", "No communication", "Slow performance", "Single CPU"], answer: 0 },
        { question: "Amdahl's law is used to measure:", choices: ["Memory size", "Speedup of parallel execution", "File transfer speed", "Power usage"], answer: 1 },
        { question: "Speedup =", choices: ["T(1) / T(N)", "T(N) × T(1)", "1 + T(N)", "T(N) / T(1)"], answer: 0 },
        { question: "Efficiency =", choices: ["Speedup / processors", "Speedup × processors", "Memory / processors", "CPU × RAM"], answer: 0 },
        { question: "IoT stands for:", choices: ["Internet of Technology", "Internet of Things", "Internal Operating Tools", "International Online Tasks"], answer: 1 },
        { question: "A cluster is:", choices: ["One single PC", "Multiple computers working together", "GPU only", "Memory module"], answer: 1 },
    ],

    e3: [
        { question: "Cloud advantage:", choices: ["High initial cost", "No scalability", "Pay-as-you-go", "Offline access only"], answer: 2 },
        { question: "Distributed systems share:", choices: ["Memory only", "Resources and tasks", "Nothing", "Screens"], answer: 1 },
        { question: "GPU cores are often used for:", choices: ["Sequential work", "Parallel tasks", "RAM expansion", "Storage"], answer: 1 },
        { question: "A thread is:", choices: ["A hardware device", "A lightweight process", "A RAM module", "A data type"], answer: 1 },
        { question: "OpenMP works with:", choices: ["Distributed memory", "Shared memory", "Cloud computing only", "GPU only"], answer: 1 },
        { question: "MPI stands for:", choices: ["Machine Processing Interface", "Message Passing Interface", "Multi Processor Integration", "Memory Processing Instruction"], answer: 1 },
        { question: "Parallelism requires:", choices: ["Only 1 CPU", "Multiple cores or processors", "No threads", "No memory"], answer: 1 },
        { question: "Network latency means:", choices: ["CPU speed", "Delay in message transfer", "Storage speed", "GPU cores"], answer: 1 },
        { question: "Distributed memory systems use:", choices: ["Shared memory", "Local memory per processor", "Cloud storage", "L1 cache only"], answer: 1 },
        { question: "Hybrid systems combine:", choices: ["SISD + MIMD", "Shared + distributed memory", "CPU + GPU", "Cloud + IoT"], answer: 1 },
    ],

    m1: [
        { question: "Which statement best describes a distributed system?", choices: ["A single machine performing all tasks", "Multiple machines working together as one system", "CPUs sharing one RAM chip", "One processor running multiple threads"], answer: 1 },
        { question: "A major disadvantage of distributed systems is:", choices: ["High scalability", "High fault tolerance", "Network complexity and failures", "Easy programming"], answer: 2 },
        { question: "What does a PRAM model assume?", choices: ["Processors use only local memory", "Unlimited shared memory accessible equally", "Only one core exists", "No communication between processors"], answer: 1 },
        { question: "CREW PRAM allows:", choices: ["Only one processor to read", "Multiple processors to write simultaneously", "Multiple reads but exclusive writes", "No memory sharing"], answer: 2 },
        { question: "In CRCW PRAM, which rule chooses one writing processor?", choices: ["Sum rule", "Priority rule", "Multi-write rule", "Timeout rule"], answer: 1 },
        { question: "Shared memory systems require synchronization to avoid:", choices: ["Sequential execution", "Memory corruption", "High storage", "Low bandwidth"], answer: 1 },
        { question: "Locks and semaphores are examples of:", choices: ["Scheduling", "Memory units", "Synchronization mechanisms", "Storage types"], answer: 2 },
        { question: "Message passing requires:", choices: ["Global shared memory", "Send and receive operations", "No communication", "Same CPU"], answer: 1 },
        { question: "In distributed memory systems, communication is done through:", choices: ["Shared arrays", "Network messages", "Shared cache", "Local threads"], answer: 1 },
        { question: "Flynn's MISD architecture is mainly used for:", choices: ["Cloud computing", "Parallel GPUs", "Highly specialized tasks", "General computing"], answer: 2 },
    ],

    m2: [
        { question: "SIMD is commonly used in:", choices: ["Vector processors", "Distributed databases", "Cloud APIs", "Operating systems"], answer: 0 },
        { question: "MIMD systems allow:", choices: ["Same instruction, same data", "Different instructions, different data", "No parallelism", "Only GPU processing"], answer: 1 },
        { question: "Efficiency decreases when:", choices: ["Processors are added", "Overhead increases", "Sequential code decreases", "Memory increases"], answer: 1 },
        { question: "Speedup of 1 means:", choices: ["Perfect performance", "No improvement from parallelization", "Double performance", "Failure"], answer: 1 },
        { question: "Amdahl's law shows that speedup is limited by:", choices: ["Parallel section", "Memory size", "Network latency", "Sequential portion"], answer: 3 },
        { question: "Data parallelism means:", choices: ["Different operations on same data", "Same operation on different data portions", "Only CPU parallelism", "Only one thread"], answer: 1 },
        { question: "A major advantage of HPC systems:", choices: ["Slow computation", "High accuracy in simulations", "No scalability", "Only cloud use"], answer: 1 },
        { question: "HTC is good for:", choices: ["Single huge task", "Many small independent tasks", "GPU acceleration", "Low-power CPUs"], answer: 1 },
        { question: "Cloud computing cost model:", choices: ["Lifetime payment", "Prepaid only", "Pay-as-you-go", "Free always"], answer: 2 },
        { question: "In shared memory, tasks communicate by:", choices: ["Messages", "Global variables", "Networks", "Random numbers"], answer: 1 },
    ],

    m3: [
        { question: "Thread switching is called:", choices: ["Memory isolation", "Context switching", "Data mapping", "Cache flushing"], answer: 1 },
        { question: "OpenMP directives are used to:", choices: ["Replace code", "Add parallelism to shared-memory programs", "Manage cloud services", "Increase GPU cores"], answer: 1 },
        { question: "Message Passing Interface (MPI) is mainly used for:", choices: ["Shared memory programs", "Distributed memory systems", "IoT networks", "Smartphones"], answer: 1 },
        { question: "A pipeline architecture is an example of:", choices: ["SISD", "MISD", "MIMD", "SIMD"], answer: 1 },
        { question: "Crossbar networks provide:", choices: ["No connection", "Full connectivity between processors and memory", "Only one-way communication", "Only local storage"], answer: 1 },
        { question: "Bisection width measures:", choices: ["Memory size", "Communication capacity", "CPU clock rate", "Disk space"], answer: 1 },
        { question: "Hybrid systems combine:", choices: ["SIM + MIS", "Shared and distributed memory", "Cloud + IoT", "RAM + ROM"], answer: 1 },
        { question: "Parallel programs fail mainly due to:", choices: ["High CPU frequency", "Wrong synchronization", "Fast memory", "Cloud pricing"], answer: 1 },
        { question: "Fault tolerance improves when:", choices: ["One node fails → system stops", "System continues despite failures", "All data is local", "No redundancy exists"], answer: 1 },
        { question: "Divide-and-conquer helps parallelism by:", choices: ["Merging data only", "Splitting tasks into independent subtasks", "Reducing memory", "Lowering bandwidth"], answer: 1 },
    ],

    h1: [
        { question: "Which PRAM model allows maximum concurrency?", choices: ["EREW", "CREW", "CRCW", "ERCW"], answer: 2 },
        { question: "In CRCW with 'common rule', writes succeed only when:", choices: ["Values match", "Priority is high", "Processor ID is odd", "Network is idle"], answer: 0 },
        { question: "Which factor most limits speedup in Amdahl's Law?", choices: ["Network bandwidth", "Number of processors", "Sequential fraction", "Thread scheduling"], answer: 2 },
        { question: "If α = 0.9 and p = 4, speedup is close to:", choices: ["1", "2", "3.1", "4"], answer: 2 },
        { question: "Redundancy > 1 means:", choices: ["No overhead", "Extra work due to parallelization", "Full efficiency", "Memory duplication"], answer: 1 },
        { question: "Utilization measures:", choices: ["Memory per processor", "Fraction of operations actually performed", "CPU frequency", "Array size"], answer: 1 },
        { question: "Fine-grained multithreading switches threads:", choices: ["After long operations", "After each instruction", "Only when idle", "On program exit"], answer: 1 },
        { question: "Coarse-grained multithreading switches threads:", choices: ["Constantly", "Only when a stall occurs", "Never", "Randomly"], answer: 1 },
        { question: "Load balancing is important because:", choices: ["It speeds up RAM", "Processors must have equal work", "It increases sequential time", "It prevents cloud costs"], answer: 1 },
        { question: "A distributed shared-memory system (DSM) uses:", choices: ["Hardware-only cache coherence", "Software-based coherence", "No coherence", "Only GPU cores"], answer: 1 },
    ],

    h2: [
        { question: "Interconnection networks improve performance by:", choices: ["Reducing communication slowdown", "Increasing sequential code", "Limiting processor count", "Removing memory"], answer: 0 },
        { question: "A major problem in distributed memory systems is:", choices: ["Shared cache", "Message latency", "Global variables", "No need to synchronize"], answer: 1 },
        { question: "Scalability decreases when:", choices: ["Communication overhead increases", "Threads increase", "Data increases", "Hardware improves"], answer: 0 },
        { question: "MPI programs require:", choices: ["Implicit synchronization", "Explicit send/receive matching", "Shared variables", "No coordination"], answer: 1 },
        { question: "A system is considered MIMD when processors:", choices: ["Execute same instruction only", "Execute different instructions on different data", "Execute data only", "Share the same ALU"], answer: 1 },
        { question: "Cache coherence problems mainly affect:", choices: ["Distributed memory", "Shared memory multiprocessors", "IoT devices", "Cloud storage"], answer: 1 },
        { question: "Bisection width in networks determines:", choices: ["Minimum communication bandwidth when the network is split", "CPU count", "Memory bandwidth", "Cache size"], answer: 0 },
        { question: "Parallel programming becomes harder when:", choices: ["Dependencies increase", "Tasks are independent", "Memory is large", "CPUs are slow"], answer: 0 },
        { question: "Vector processors belong to:", choices: ["SISD", "MIMD", "SIMD", "MISD"], answer: 2 },
        { question: "Amdahl's law assumes:", choices: ["Perfect scaling", "Fixed problem size", "Infinite processors", "Zero overhead"], answer: 1 },
    ],

    h3: [
        { question: "Which system uses uniform memory access?", choices: ["NUMA", "UMA", "Distributed memory", "Cloud clusters"], answer: 1 },
        { question: "NUMA performance decreases when:", choices: ["Memory is local", "Remote memory is accessed", "CPUs are idle", "Cache is full"], answer: 1 },
        { question: "A hybrid MPI + OpenMP model:", choices: ["Forbidden in HPC", "Uses distributed memory between nodes and shared memory inside nodes", "Uses shared only", "Uses distributed only"], answer: 1 },
        { question: "Parallel overhead includes:", choices: ["Synchronization", "Communication", "Load imbalance", "All of the above"], answer: 3 },
        { question: "Tree networks scale:", choices: ["Poorly at high levels", "Perfectly at all sizes", "Only for GPUs", "Only for small arrays"], answer: 0 },
        { question: "Crossbar switches provide:", choices: ["O(n³) cost", "Full non-blocking communication", "Only shared cache", "Only sequential performance"], answer: 1 },
        { question: "Perfect linear speedup means:", choices: ["S(p) = p", "S(p) < p", "S(p) > p", "S(p) constant"], answer: 0 },
        { question: "A pipeline suffers from:", choices: ["Hazards", "No issues at all", "Infinite speed", "Wrong data types"], answer: 0 },
        { question: "HTC systems are preferred when:", choices: ["Tasks are dependent", "Tasks are small and independent", "Memory is central", "Threads are limited"], answer: 1 },
        { question: "A program with zero sequential portion has:", choices: ["Infinite potential speedup", "Speedup = 1", "No parallelism", "No memory usage"], answer: 0 },
    ],
};

// ---------- State ----------
let currentQuestion = 0;
let score = 0;
let answered = false;
let obstacleTimer = null;
let currentPosition = 'A'; // Starts at top
let activeObstacle = null;
let obstacleAnimInterval = null; // NEW: Variable for obstacle frame animation

// Combo / stats state
let currentStreak = 0;
let bestStreak = 0;
let questionsAnswered = 0;
let questionsCorrect = 0;
let questionStartTime = null;
let fastestAnswerMs = null;

// Current question object
let q;

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

// ---------- Sounds ----------
const jumpSound = new Audio('jump.mp3');
const hitSound = new Audio('hit.mp3');
const countdownAudio = new Audio('countdown2.mp3');

jumpSound.volume = 1.0;
hitSound.volume = 1.0;
countdownAudio.volume = 1.0;

// ============================================================
// 3. GREEDY ALGORITHM FUNCTIONS (مرة واحدة فقط)
// ============================================================

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

            message = `CONGRATULATIONS! You mastered Parallel Computing! Total Value: ${totalPoints}`;
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
        // عرض رسالة المستوى الجديد
        alert(`✅ ${result.message}\n\nالمجموعة الجديدة: ${currentGroup}\nالمستوى: ${currentLevel}`);

        // إعادة تعيين كل المتغيرات
        score = 0;
        currentQuestion = 0;
        questionsAnswered = 0;
        questionsCorrect = 0;
        currentStreak = 0;
        bestStreak = 0;
        questionStartTime = null;
        fastestAnswerMs = null;
        answered = false;
        currentPosition = 'A';

        // إخفاء شاشة النتائج
        if (resultsScreen) resultsScreen.style.display = 'none';

        // تحديث معلومات الصفحة
        const currentQuestions = quizData[currentGroup] || [];
        if (totalQuestionsSpan) totalQuestionsSpan.textContent = currentQuestions.length;
        if (totalQuestionsResultSpan) totalQuestionsResultSpan.textContent = currentQuestions.length;
        if (scoreSpan) scoreSpan.textContent = score;

        // إعادة الروبوت للموضع A
        if (character) {
            character.classList.remove('colliding');
            moveCharacterTo('A');
        }

        // إزالة زر Continue Journey القديم
        const oldBtn = document.getElementById('continue-btn');
        if (oldBtn) oldBtn.remove();

        // البدء من جديد
        startQuestion();
    }
}

// ---------- Init ----------
function init() {
  // Get current questions for this group
  const currentQuestions = quizData[currentGroup] || [];

  if (totalQuestionsSpan) totalQuestionsSpan.textContent = currentQuestions.length;
  if (totalQuestionsResultSpan) totalQuestionsResultSpan.textContent = currentQuestions.length;
  if (scoreSpan) scoreSpan.textContent = score;

  if (restartButton) restartButton.addEventListener('click', restartGame);
  if (homeButton) {
    homeButton.addEventListener('click', () => {
      window.location.href = "../home2.html";
    });
  }
  if (nextButton) nextButton.addEventListener('click', showReady);
  if (yesButton) yesButton.addEventListener('click', startCountdown);

  if (obstacleA) obstacleA.style.display = 'none';
  if (obstacleB) obstacleB.style.display = 'none';

  // Ensure consistent movement
  if (character) character.style.transition = "transform 0.5s ease-in-out";

  showRules();
}

// ---------- Screens ----------
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
  if (countdownAudio) {
    countdownAudio.currentTime = 0;
    countdownAudio.play().catch(()=>{});
  }

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

// ---------- Obstacle Animation Logic (NEW) ----------
function startObstacleAnim(element) {
    stopObstacleAnim(); // Safety clear

    // Select all images inside the active obstacle div
    const frames = element.querySelectorAll('img');
    if (frames.length === 0) return;

    let frameIndex = 0;

    // Reset: Hide all, show the first frame
    frames.forEach(img => img.style.display = 'none');
    frames[0].style.display = 'block';

    // Cycle frames every 120ms
    obstacleAnimInterval = setInterval(() => {
        // Hide current
        frames[frameIndex].style.display = 'none';

        // Advance index
        frameIndex++;
        if (frameIndex >= frames.length) frameIndex = 0;

        // Show next
        frames[frameIndex].style.display = 'block';
    }, 120);
}

function stopObstacleAnim() {
    if (obstacleAnimInterval) {
        clearInterval(obstacleAnimInterval);
        obstacleAnimInterval = null;
    }
}

// ---------- Quiz ----------
function startQuestion() {
  const currentQuestions = quizData[currentGroup] || [];

  if (currentQuestion >= currentQuestions.length) {
    showResults();
    return;
  }

  answered = false;
  q = currentQuestions[currentQuestion]; // Get current question

  if (currentQuestionSpan) currentQuestionSpan.textContent = currentQuestion + 1;
  questionStartTime = performance.now();
  showQuiz();
  showObstacle();

  // Time limit
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

  // Determine which obstacle to show based on current character position
  activeObstacle = currentPosition === 'A' ? obstacleA : obstacleB;

  if (activeObstacle) {
    activeObstacle.style.display = 'block';

    // NEW: Start cycling the images inside the obstacle
    startObstacleAnim(activeObstacle);

    void activeObstacle.offsetWidth; // Trigger reflow for CSS animation
    activeObstacle.style.animation = 'obstacleMove 5s linear forwards';
  }
}

// ---------- Answers ----------
function handleAnswer(answerIndex, button) {
  if (answered || !q) return;
  answered = true;
  clearTimeout(obstacleTimer);

  const isCorrect = answerIndex === q.answer;
  const allButtons = optionsGrid ? optionsGrid.querySelectorAll('.option-button') : [];

  // Disable buttons immediately
  allButtons.forEach(b => {
    b.classList.add('disabled');
    b.style.pointerEvents = 'none';
  });

  // Update basic counters
  questionsAnswered++;

  if (isCorrect) {
    // --- CORRECT ---
    questionsCorrect++;

    // Combo scoring: base 1 point + bonus for streak
    currentStreak++;
    if (currentStreak > bestStreak) bestStreak = currentStreak;

    let gained = 1;
    if (currentStreak > 1) {
      gained += currentStreak - 1; // combo bonus
    }

    score += gained;
    if (scoreSpan) scoreSpan.textContent = score;
    button.classList.add('correct');

    if (jumpSound) {
      jumpSound.currentTime = 0;
      jumpSound.play();
    }

    if (currentPosition === 'A') {
      moveCharacterTo('B');
      currentPosition = 'B';
    } else {
      moveCharacterTo('A');
      currentPosition = 'A';
    }

    // Track fastest answer time
    if (questionStartTime != null) {
      const elapsed = performance.now() - questionStartTime;
      if (fastestAnswerMs == null || elapsed < fastestAnswerMs) {
        fastestAnswerMs = elapsed;
      }
    }

  } else {
    // --- WRONG ---
    currentStreak = 0;
    // Delayed collision by 1.7s (simulating timing)
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

  // Wait for next question
  setTimeout(() => {
    if (quizPanel) quizPanel.style.display = 'none';
    if (activeObstacle) {
      activeObstacle.style.display = 'none';
      activeObstacle.style.animation = 'none';
      activeObstacle = null;

      // Stop the obstacle frame animation
      stopObstacleAnim();
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

      // Stop the obstacle frame animation
      stopObstacleAnim();
    }
    currentQuestion++;
    startQuestion();
  }, 3000);
}

// ---------- Robot movement ----------
function moveCharacterTo(target) {
  const pos = robotPositions[target];
  if (character) {
    character.style.transform = `translate(0px, ${pos.y}px)`;
  }
}

// ---------- Character animations ----------
function collideCharacter() {
  if (!character) return;

  character.classList.remove('jumping');

  // 1. Get current Y position
  const currentY = robotPositions[currentPosition].y;

  // 2. DISABLE TRANSITION: Prevents drift
  character.style.transition = 'none';

  // 3. Shake animation
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

  // 4. RESTORE TRANSITION
  animation.onfinish = () => {
    character.style.transition = "transform 0.5s ease-in-out";
    character.style.transform = `translate(0px, ${currentY}px)`;
  };

  // 5. Visual effect
  character.classList.add('colliding');
  setTimeout(() => character.classList.remove('colliding'), 1500);
}

// ---------- Results ----------
function showResults() {
  if (quizPanel) quizPanel.style.display = 'none';

  if (activeObstacle) {
    activeObstacle.style.display = 'none';
    activeObstacle.style.animation = 'none';
    stopObstacleAnim();
  }

  stopRunning();

  const currentQuestions = quizData[currentGroup] || [];
  const totalQ = currentQuestions.length;

  if (finalScoreSpan) finalScoreSpan.textContent = score;

  const accuracy = totalQ ? (questionsCorrect / totalQ) : 0;
  let percentage = Math.round(accuracy * 100);
  let message = "";

  if (accuracy === 1) message = "Perfect Parallel Computing Master! ⚡🏆";
  else if (accuracy >= 0.7) message = "Great parallel knowledge! 🌟";
  else if (accuracy >= 0.5) message = "Good understanding! 👍";
  else message = "Keep learning! 💪";

  const streakLine = `Best streak: ${bestStreak || 0} correct in a row`;
  const timeLine = fastestAnswerMs != null ? `Fastest answer: ${Math.round(fastestAnswerMs)} ms` : "";

  if (performanceMessage) {
    performanceMessage.textContent = [message, streakLine, timeLine]
      .filter(Boolean)
      .join(" • ");
  }

  if (resultsScreen) resultsScreen.style.display = 'flex';

  // ============================================================
  // زر Continue Journey (مرة واحدة فقط)
  // ============================================================

  // أولا: إزالة الزر القديم لو موجود
  const existingBtn = document.getElementById('continue-btn');
  if (existingBtn) existingBtn.remove();

  // ثانياً: إنشاء زر جديد
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
  continueBtn.onclick = function() {
    processNextLevel();
  };

  // ثالثاً: إضافة الزر مرة واحدة فقط
  const resultsContainer = document.querySelector('.results-container');
  if (resultsContainer && !resultsContainer.querySelector('#continue-btn')) {
    resultsContainer.appendChild(continueBtn);
  } else if (resultsScreen && !resultsScreen.querySelector('#continue-btn')) {
    resultsScreen.appendChild(continueBtn);
  }

  // ============================================================
  // حفظ بيانات المستخدم
  // ============================================================
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

        // Simple XP system: more points + accuracy = more XP
        const xpEarned = Math.max(
          5,
          Math.round((score / (totalQ || 1)) * 80 + bestStreak * 5)
        );
        const previousXp = user.xp || 0;
        const newXp = previousXp + xpEarned;
        const newLevel = 1 + Math.floor(newXp / 100);

        const match = {
          game: "Cat & Rat Run",
          course: "parallel",
          level: currentLevel,
          group: currentGroup,
          score,
          total: totalQ,
          accuracy,
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
    console.error("Failed to store Parallel Computing game history", e);
  }
}

// ---------- Restart ----------
function restartGame() {
  const currentQuestions = quizData[currentGroup] || [];

  currentQuestion = 0;
  score = 0;
  answered = false;
  currentPosition = 'A';

  if (scoreSpan) scoreSpan.textContent = score;

  // Reset combo / stats
  currentStreak = 0;
  bestStreak = 0;
  questionsAnswered = 0;
  questionsCorrect = 0;
  questionStartTime = null;
  fastestAnswerMs = null;

  if (resultsScreen) resultsScreen.style.display = 'none';
  if (character) character.classList.remove('colliding');

  stopObstacleAnim(); // Ensure no background interval is running

  moveCharacterTo('A');

  if (totalQuestionsSpan) totalQuestionsSpan.textContent = currentQuestions.length;
  if (totalQuestionsResultSpan) totalQuestionsResultSpan.textContent = currentQuestions.length;

  startQuestion();
}

// ---------- Running sprite (Character) ----------
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

// ---------- Start ----------
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
