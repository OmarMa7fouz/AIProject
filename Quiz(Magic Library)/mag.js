/* ================================
   FILE: mag.js (Complete Game)
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

// Greedy Algorithm Tracking
let currentLevel = "easy"; // easy, medium, hard
let currentGroup = "e1";   // e1, e2, e3...
let wtotalPoints = 0;       // Accumulates value for current game session
let pointsSavedThisSession = 0; // Track points already saved to prevent double-counting
let savedTotalPoints = 0;   // Total points from localStorage (all previous games)

// Greedy Values
const groupValues = {
    e1: 3, e2: 2, e3: 1,
    m1: 3, m2: 2, m3: 1,
    h1: 3, h2: 2, h3: 1,
};

/* --- 2. QUIZ DATA --- */
const quizData = {
  e1: [
    { question: "A network is defined as:", choices: ["A single computer", "Connected hardware and software components", "Only wireless devices", "Only servers"], answer: 1 },
    { question: "Which of the following is a benefit of networking?", choices: ["Increases file duplication", "Limits communication", "Easy sharing of resources", "No need for administrators"], answer: 2 },
    { question: "Which is a network component?", choices: ["Keyboard", "Operating system only", "Network devices", "PDF reader"], answer: 2 },
    { question: "LAN stands for:", choices: ["Large Area Network", "Local Area Network", "Linked Access Network", "Line Access Node"], answer: 1 },
    { question: "Which topology uses a central device?", choices: ["Bus", "Mesh", "Star", "Ring"], answer: 2 },
    { question: "A device used to extend network distance by amplifying the signal is:", choices: ["Switch", "Router", "Repeater", "NIC"], answer: 2 },
    { question: "Simplex transmission means data flows:", choices: ["Both directions", "One direction only", "Two-way but not simultaneously", "Over wireless only"], answer: 1 },
    { question: "Fiber optic cable transmits data using:", choices: ["Electricity", "Radio waves", "Light signals", "Heat"], answer: 2 },
    { question: "A server is a device that:", choices: ["Requests resources", "Provides services to clients", "Creates wireless signals only", "Stores only videos"], answer: 1 },
    { question: "A peer-to-peer network:", choices: ["Requires a central server", "Is more complex than client-server", "All devices share equal roles", "Uses only fiber cables"], answer: 2 }
  ],
  e2: [
    { question: "Which device connects computers to a network?", choices: ["Mouse", "NIC", "Printer", "Monitor"], answer: 1 },
    { question: "A PAN network usually covers:", choices: ["A campus", "A whole country", "A person's personal space", "A building"], answer: 2 },
    { question: "Which is an example of wired media?", choices: ["Wi-Fi", "Twisted-pair", "Bluetooth", "Infrared"], answer: 1 },
    { question: "A router is mainly used to connect:", choices: ["Devices inside one room", "Different networks", "USB devices", "Cameras only"], answer: 1 },
    { question: "The Internet evolved from:", choices: ["LAN", "MAN", "ARPANET", "WAN"], answer: 2 },
    { question: "The OSI model has how many layers?", choices: ["5", "6", "7", "8"], answer: 2 },
    { question: "The physical layer deals with:", choices: ["Frames", "Bits", "Packets", "Messages"], answer: 1 },
    { question: "Which layer is responsible for encryption?", choices: ["Session", "Presentation", "Network", "Physical"], answer: 1 },
    { question: "The transport layer provides:", choices: ["Hop-to-hop delivery", "Process-to-process delivery", "Bit movement", "Routing"], answer: 1 },
    { question: "IP protocol works at the:", choices: ["Network layer", "Transport layer", "Application layer", "Data link layer"], answer: 0 }
  ],
  e3: [
    { question: "MAC addresses belong to which layer?", choices: ["Network", "Data link", "Transport", "Session"], answer: 1 },
    { question: "Which of the following is an application layer protocol?", choices: ["TCP", "UDP", "FTP", "IP"], answer: 2 },
    { question: "The device used at the physical layer is:", choices: ["Switch", "Router", "Repeater", "Firewall"], answer: 2 },
    { question: "The network layer handles:", choices: ["Frames", "Packets", "Segments", "Bits"], answer: 1 },
    { question: "TCP belongs to which layer?", choices: ["Network", "Data link", "Transport", "Session"], answer: 2 },
    { question: "The session layer is responsible for:", choices: ["Dialog control", "Encryption", "Routing", "Bit transmission"], answer: 0 },
    { question: "A datagram at the transport layer is called:", choices: ["Block", "Frame", "Segment", "Packet"], answer: 2 },
    { question: "The application layer provides services to:", choices: ["Network devices", "Users", "Routers", "Switches"], answer: 1 },
    { question: "Logical addressing is done at the:", choices: ["Physical layer", "Data-link layer", "Network layer", "Transport layer"], answer: 2 },
    { question: "Port numbers belong to the:", choices: ["Network layer", "Transport layer", "Data link layer", "Session layer"], answer: 1 }
  ],
  m1: [
    { question: "Which of the following is an example of a network application?", choices: ["SNMP", "Windows Player", "Camera app", "Antivirus"], answer: 0 },
    { question: "Which component prepares and sends data over the network cable?", choices: ["Switch", "NIC", "Router", "Hub"], answer: 1 },
    { question: "MAN covers which area?", choices: ["A single home", "A whole country", "A city-sized region", "One office"], answer: 2 },
    { question: "A hub operates in which mode?", choices: ["Full duplex", "Wireless", "Half duplex", "Simplex"], answer: 2 },
    { question: "Bus topology uses:", choices: ["A central device", "Multiple paths", "A single backbone cable", "Fiber-only connections"], answer: 2 },
    { question: "Intranet is used:", choices: ["By the public", "By company employees only", "Between different companies only", "As a public Wi-Fi system"], answer: 1 },
    { question: "Which device forwards data to all ports?", choices: ["Switch", "Router", "Hub", "Firewall"], answer: 2 },
    { question: "Half-duplex transmission means:", choices: ["Two-way communication simultaneously", "One-way only", "Two-way but one direction at a time", "Wireless only"], answer: 2 },
    { question: "Twisted-pair cables are used in:", choices: ["Cable TV networks", "LAN connections", "Satellite communication", "Fiber-optic networks only"], answer: 1 },
    { question: "Which network type includes multiple LANs connected in a university campus?", choices: ["WAN", "PAN", "MAN", "CAN"], answer: 3 }
  ],
  m2: [
    { question: "Coaxial cables contain:", choices: ["Light fibers", "A thick central copper conductor", "Only plastic", "No insulation"], answer: 1 },
    { question: "Which network architecture uses a central server?", choices: ["Peer-to-peer", "Client-server", "Ad-hoc", "Hybrid topology"], answer: 1 },
    { question: "Full-duplex communication allows data to travel:", choices: ["In one direction", "In both directions but alternately", "In both directions at the same time", "Only via cables"], answer: 2 },
    { question: "A switch forwards data based on:", choices: ["IP address", "MAC address", "Cable type", "User name"], answer: 1 },
    { question: "An active hub requires:", choices: ["Wireless signals", "No electricity", "Electrical power to regenerate signals", "Only coaxial cables"], answer: 2 },
    { question: "Encapsulation adds headers at:", choices: ["Only the physical layer", "Each layer", "Only at the transport layer", "Only at the application layer"], answer: 1 },
    { question: "Which layer breaks messages into smaller segments?", choices: ["Network", "Application", "Transport", "Session"], answer: 2 },
    { question: "Frames are created at the:", choices: ["Data link layer", "Network layer", "Application layer", "Transport layer"], answer: 0 },
    { question: "Which address changes from hop to hop?", choices: ["IP address", "Port address", "MAC address", "Session ID"], answer: 2 },
    { question: "IP header size ranges from:", choices: ["10to20 bytes", "20to60 bytes", "60to100 bytes", "100to150 bytes"], answer: 1 }
  ],
  m3: [
    { question: "The device that uses IP to route packets is:", choices: ["Switch", "Router", "Repeater", "NIC"], answer: 1 },
    { question: "Hop-to-hop delivery is handled by:", choices: ["Network layer", "Data link layer", "Session layer", "Application layer"], answer: 1 },
    { question: "The presentation layer handles all except:", choices: ["Compression", "Encryption", "Translation", "Segmentation"], answer: 3 },
    { question: "UDP provides:", choices: ["Reliable delivery", "Connection-oriented services", "Fast, connectionless transport", "Error correction"], answer: 2 },
    { question: "A frame contains:", choices: ["MAC addresses", "IP addresses", "Port numbers", "Messages only"], answer: 0 },
    { question: "Which protocol runs at the transport layer?", choices: ["SMTP", "UDP", "DNS", "HTTP"], answer: 1 },
    { question: "The 'node-to-node' communication occurs at:", choices: ["Session layer", "Transport layer", "Data link layer", "Application layer"], answer: 2 },
    { question: "The OSI layer responsible for routing is:", choices: ["Session", "Transport", "Network", "Physical"], answer: 2 },
    { question: "A message at the application layer becomes a ______ at the network layer.", choices: ["Frame", "Segment", "Datagram", "Bitstream"], answer: 2 },
    { question: "The TCP/IP model has how many layers?", choices: ["7", "5", "3", "6"], answer: 1 }
  ],
  h1: [
    { question: "The device that regenerates and retransmits the signal is:", choices: ["Router", "Passive hub", "Active hub", "NIC"], answer: 2 },
    { question: "Which statement about mesh topology is true?", choices: ["Uses a single cable", "Requires a central device", "Offers multiple communication paths", "Works only in wireless systems"], answer: 2 },
    { question: "A switch provides:", choices: ["One collision domain", "Multiple collision domains", "No filtering", "Only wireless connections"], answer: 1 },
    { question: "WAN networks usually use:", choices: ["Ethernet only", "City-level connections", "Country-to-country links", "Only optical cables"], answer: 2 },
    { question: "Routers operate mainly at:", choices: ["Physical layer", "Transport layer", "Data link layer", "Network layer"], answer: 3 },
    { question: "Which media type offers the highest speed?", choices: ["Coaxial", "Twisted pair", "Fiber optic", "Wireless radio"], answer: 2 },
    { question: "VPN uses which technique for secure communication?", choices: ["Duplex", "Tunneling", "Broadcasting", "Repeating"], answer: 1 },
    { question: "A hybrid hub supports:", choices: ["Only one cable type", "Many different cable types", "Wireless only", "Fiber optic only"], answer: 1 },
    { question: "Switches reduce collisions by:", choices: ["Increasing bandwidth", "Creating dedicated communication paths", "Sending data to all ports", "Slowing down traffic"], answer: 1 },
    { question: "In wireless communication, frequencies are measured in:", choices: ["Joules", "Bits", "Hertz", "Decibels"], answer: 2 }
  ],
  h2: [
    { question: "Fiber optic communication uses which principle?", choices: ["Electric conduction", "Radio wave reflection", "Total internal reflection", "Heat conversion"], answer: 2 },
    { question: "Which network type requires the highest infrastructure cost?", choices: ["PAN", "LAN", "WAN", "CAN"], answer: 2 },
    { question: "In mesh topology, reliability increases because:", choices: ["There is always one central path", "All devices share the same cable", "There are multiple redundant paths", "It uses wireless"], answer: 2 },
    { question: "NAPs (Network Access Points) are used to connect:", choices: ["Local computers", "International ISPs", "Printers only", "Wireless devices"], answer: 1 },
    { question: "A router determines the best path using:", choices: ["Physical cabling", "Routing tables", "Hub signals", "Signal amplification"], answer: 1 },
    { question: "During encapsulation, the network layer adds:", choices: ["MAC header", "IP header", "TCP header", "Application data only"], answer: 1 },
    { question: "Which layer ensures reliable communication using sequencing and ACKs?", choices: ["Network", "Data link", "Transport", "Presentation"], answer: 2 },
    { question: "The session layer is responsible for:", choices: ["End-to-end transmission", "Synchronization and checkpointing", "Routing algorithms", "Data formatting"], answer: 1 },
    { question: "The device operating at layer 3 of OSI is:", choices: ["Hub", "Router", "Switch", "Repeater"], answer: 1 },
    { question: "Which layer interacts directly with the user?", choices: ["Transport", "Network", "Presentation", "Application"], answer: 3 }
  ],
  h3: [
    { question: "During transmission, which addresses remain constant end-to-end?", choices: ["MAC", "Logical (IP)", "Physical", "Cable IDs"], answer: 1 },
    { question: "TCP performs segmentation based on:", choices: ["Process size", "Maximum segment size", "Physical bandwidth", "IP options"], answer: 1 },
    { question: "In the OSI model, data encryption occurs:", choices: ["Before data link processing", "After session layer", "Within presentation layer", "Only in routers"], answer: 2 },
    { question: "The device associated with data link forwarding is a:", choices: ["Router", "Hub", "Switch", "Firewall"], answer: 2 },
    { question: "Tier-1 ISPs:", choices: ["Buy connectivity from larger ISPs", "Have full Internet access without paying others", "Serve only small regions", "Provide only wireless services"], answer: 1 },
    { question: "Logical addressing solves:", choices: ["Physical collision", "Device identification across networks", "Error checking", "Cable issues"], answer: 1 },
    { question: "A packet traveling through multiple networks changes its:", choices: ["IP address", "Port number", "MAC address", "Process number"], answer: 2 },
    { question: "Which layer handles multiplexing/demultiplexing?", choices: ["Data link", "Transport", "Network", "Physical"], answer: 1 },
    { question: "TCP/IP's network layer corresponds to ______ in OSI.", choices: ["Transport", "Session", "Application", "Network"], answer: 3 },
    { question: "In encapsulation, the correct order from sender is:", choices: ["Frame → Packet → Segment → Message", "Segment → Frame → Packet → Message", "Message → Segment → Packet → Frame → Bits", "Bits → Frame → Segment → Message"], answer: 2 }
  ]
};

/* --- 3. AUDIO & DOM SETUP --- */
const boomSound = new Audio("boom.mp3");
const laughSound = new Audio("laugh.mp3");
const frogSound = new Audio("frog.mp3");
const startSound = new Audio("start.mp3");
const boilSound = new Audio("boil.mp3");
boilSound.loop = true;

const questionText = document.getElementById("question-text");
const questionContainer = document.getElementById("question-container");
const choicesContainer = document.getElementById("choices");

const choiceButtons = [
    document.querySelector(".Choice1"),
    document.querySelector(".Choice2"),
    document.querySelector(".Choice3"),
    document.querySelector(".Choice4")
];

const choiceTexts = [
    document.querySelector(".Choice1 .choice-text"),
    document.querySelector(".Choice2 .choice-text"),
    document.querySelector(".Choice3 .choice-text"),
    document.querySelector(".Choice4 .choice-text")
];

const cauldron = document.getElementById("cauldron");
const cauldronr = document.getElementById("cauldronr");
const cauldronf = document.getElementById("cauldronf");
const witch = document.getElementById("witch");
const frog = document.getElementById("frog");
const cloud = document.getElementById("cloud");
const rich = document.getElementById("rich");
const money = document.getElementById("money");

const rulesScreen = document.getElementById("rules-screen");
const rulesText = document.querySelectorAll(".rule-text");
const startBtn = document.getElementById("start-game-btn");

// Score display elements - will be set after DOM loads
let totalScoreDisplay = null;
let currentLevelDisplay = null;

// Initialize score display on page load
function initializeScoreDisplay() {
    // Query elements
    totalScoreDisplay = document.getElementById("total-score");
    currentLevelDisplay = document.getElementById("current-level-display");
    
    if (!totalScoreDisplay || !currentLevelDisplay) {
        console.error("Score display elements not found in DOM!");
        console.log("Looking for #total-score:", document.getElementById("total-score"));
        console.log("Looking for #current-level-display:", document.getElementById("current-level-display"));
        // Try again after a short delay
        setTimeout(initializeScoreDisplay, 100);
        return;
    }
    
    loadSavedTotalScore();
    updateScoreDisplay();
    console.log("Score display initialized successfully");
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initializeScoreDisplay();
        // Also ensure score board is visible
        const scoreBoard = document.querySelector(".score-board");
        if (scoreBoard) {
            scoreBoard.style.display = "block";
            scoreBoard.style.visibility = "visible";
        }
    });
} else {
    // DOM already loaded
    setTimeout(function() {
        initializeScoreDisplay();
        // Also ensure score board is visible
        const scoreBoard = document.querySelector(".score-board");
        if (scoreBoard) {
            scoreBoard.style.display = "block";
            scoreBoard.style.visibility = "visible";
        }
    }, 50);
}

/* --- 4. RULES & START --- */
let ruleIndex = 0;
function showNextRule() {
    if (ruleIndex < rulesText.length) {
        const rule = rulesText[ruleIndex];
        rule.style.opacity = "1";

        rule.animate([
            { transform: "translateX(-50%) translateY(0) scale(0.5)", opacity: 0 },
            { transform: "translateX(-50%) translateY(-100px) scale(1.5)", opacity: 1 },
            { transform: "translateX(-50%) translateY(-200px) scale(2)", opacity: 0 }
        ], { duration: 3000, easing: "ease-out", fill: "forwards" });

        ruleIndex++;
        setTimeout(showNextRule, 1500);
    }
}
showNextRule();

startBtn.addEventListener("click", () => {
    startSound.currentTime = 0;
    startSound.play().catch(e => console.log("Audio error:", e));
    rulesScreen.style.display = "none";
    boilSound.currentTime = 0;
    boilSound.play().catch(e => console.log("Audio error:", e));
    
    // Ensure score board is visible
    const scoreBoard = document.querySelector(".score-board");
    if (scoreBoard) {
        scoreBoard.style.display = "block";
        scoreBoard.style.visibility = "visible";
        scoreBoard.style.opacity = "1";
    }
    
    loadSavedTotalScore(); // Load total score from localStorage
    updateScoreDisplay(); // Update the display
    loadQuestion();
});

/* --- 5. LOAD AND UPDATE SCORE DISPLAY --- */
function loadSavedTotalScore() {
    try {
        const currentRaw = localStorage.getItem("currentUser");
        const usersRaw = localStorage.getItem("quizUsers");
        
        if (currentRaw) {
            const currentUser = JSON.parse(currentRaw);
            savedTotalPoints = Number(currentUser.wtotalPoints) || 0;
            
            // If wtotalPoints doesn't exist, initialize it
            if (typeof currentUser.wtotalPoints === 'undefined' || currentUser.wtotalPoints === null) {
                currentUser.wtotalPoints = 0;
                savedTotalPoints = 0;
                
                // Update in users array too
                if (usersRaw) {
                    const allUsers = JSON.parse(usersRaw);
                    const userIndex = allUsers.findIndex(u =>
                        u.username && currentUser.username &&
                        u.username.toLowerCase() === currentUser.username.toLowerCase()
                    );
                    if (userIndex !== -1) {
                        allUsers[userIndex].wtotalPoints = 0;
                        localStorage.setItem("quizUsers", JSON.stringify(allUsers));
                        localStorage.setItem("currentUser", JSON.stringify(currentUser));
                    }
                }
            }
            
            console.log("Loaded saved total score:", savedTotalPoints);
        } else {
            savedTotalPoints = 0;
            console.log("No current user found, initializing score to 0");
        }
    } catch (e) {
        console.error("Error loading saved total score:", e);
        savedTotalPoints = 0;
    }
}

function updateScoreDisplay() {
    // Re-query elements if they're null (in case DOM wasn't ready before)
    if (!totalScoreDisplay) {
        totalScoreDisplay = document.getElementById("total-score");
    }
    if (!currentLevelDisplay) {
        currentLevelDisplay = document.getElementById("current-level-display");
    }
    
    const totalScore = savedTotalPoints + wtotalPoints;
    
    // Debug logging
    console.log("Updating score display:", {
        savedTotalPoints,
        wtotalPoints,
        totalScore,
        totalScoreDisplay: !!totalScoreDisplay,
        currentLevelDisplay: !!currentLevelDisplay
    });
    
    if (totalScoreDisplay) {
        totalScoreDisplay.textContent = totalScore;
        console.log("Score updated to:", totalScore);
    } else {
        console.error("totalScoreDisplay element not found! Trying to find it...");
        // Try to find it again
        const el = document.getElementById("total-score");
        if (el) {
            totalScoreDisplay = el;
            el.textContent = totalScore;
            console.log("Found and updated score element");
        }
    }
    
    // Update level display
    const levelNames = {
        "easy": "Easy",
        "medium": "Medium",
        "hard": "Hard"
    };
    if (currentLevelDisplay) {
        currentLevelDisplay.textContent = levelNames[currentLevel] || "Easy";
    } else {
        console.error("currentLevelDisplay element not found! Trying to find it...");
        const el = document.getElementById("current-level-display");
        if (el) {
            currentLevelDisplay = el;
            el.textContent = levelNames[currentLevel] || "Easy";
            console.log("Found and updated level element");
        }
    }
}

/* --- 5. GAME FUNCTIONS --- */
function loadQuestion() {
    // Safety check
    if (!quizData[currentGroup]) {
        alert("Error loading group data.");
        location.reload();
        return;
    }

    q = quizData[currentGroup][currentQuestion]; // ✔ تعريف واحد فقط

    questionText.textContent = q.question;
    q.choices.forEach((text, i) => {
        choiceTexts[i].textContent = text;
    });

    // Visual Reset
    cauldron.style.display = "block";
    witch.style.display = "block";
    questionContainer.style.display = "block";
    if (choicesContainer) choicesContainer.style.display = "block";

    cauldronr.style.display = "none";
    cauldronf.style.display = "none";
    frog.style.display = "none";
    rich.style.display = "none";
    money.style.display = "none";
    cloud.style.display = "none";

    choiceButtons.forEach(btn => {
        btn.style.pointerEvents = "auto";
        btn.style.display = "block";
    });

    const oldContinueBtn = document.getElementById("continue-btn");
    if (oldContinueBtn) oldContinueBtn.remove();

    const oldHomeBtn = document.getElementById("mag-home-button");
    if (oldHomeBtn) oldHomeBtn.style.display = "none";

    questionStartTime = performance.now();
}

choiceButtons.forEach((button, index) => {
    button.addEventListener("click", () => checkAnswer(index));
});

function checkAnswer(selectedIndex) {
    const correct = q.answer;
    questionsAnswered++;
    choiceButtons.forEach(btn => btn.style.pointerEvents = "none");

    cauldron.style.display = "none";
    witch.style.display = "none";
    cloud.style.display = "block";

    setTimeout(() => {
        cloud.style.display = "none";
        boomSound.currentTime = 0;
        boomSound.play().catch(e => console.log("Audio error:", e));

        if (selectedIndex === correct) handleCorrectAnswer();
        else handleWrongAnswer();
    }, 1500);
}

function handleCorrectAnswer() {
    questionsCorrect++;
    score += 1; // كل إجابة صحيحة تضيف نقطة واحدة

    cauldronr.style.display = "block";
    rich.style.display = "block";
    money.style.display = "block";
    laughSound.currentTime = 0;
    laughSound.play().catch(e => console.log("Audio error:", e));

    // Update score display when points are added (after level completion)
    updateScoreDisplay();

    setTimeout(nextQuestion, 4000);
}

function handleWrongAnswer() {
    currentStreak = 0;
    cauldronf.style.display = "block";
    frog.style.display = "block";
    frogSound.currentTime = 0;
    frogSound.play().catch(e => console.log("Audio error:", e));
    setTimeout(nextQuestion, 4000);
}

function nextQuestion() {
    currentQuestion++;
    const questionsInGroup = quizData[currentGroup].length;
    if (currentQuestion < questionsInGroup) {
        loadQuestion();
    } else {
        showResult();
    }
}

/* --- 6. GREEDY ALGORITHM & LEVEL CONTROL --- */
function calculateNextMove() {
    const passed = score > 5;
    let message = "";
    let isVictory = false;
    let isGameOver = false;

    // NOTE: Points are now added in showResult() when level completes
    // This function only determines the next level/state

    // DETERMINE NEXT STATE
    if (currentLevel === "easy") {
        if (passed) {
            currentLevel = "medium";
            currentGroup = "m1";
            message = "Excellent! Moving to Medium Level.";
            updateScoreDisplay(); // Update display when level changes
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
            updateScoreDisplay(); // Update display when level changes
        } else {
            if (currentGroup === "m1") { currentGroup = "m2"; message = "Taking path M2..."; }
            else if (currentGroup === "m2") { currentGroup = "m3"; message = "Taking path M3..."; }
            else { isGameOver = true; message = "Game Over. Failed Medium level."; }
        }
    }
    else if (currentLevel === "hard") {
        if (passed) {
            isVictory = true;
            // Points already saved in showResult(), just update display
            updateScoreDisplay(); // Update display before showing victory
            message = `CONGRATULATIONS! You are the Supreme Witch! Total Value: ${savedTotalPoints + wtotalPoints}`;
        } else {
            if (currentGroup === "h1") { currentGroup = "h2"; message = "Taking path H2..."; }
            else if (currentGroup === "h2") { currentGroup = "h3"; message = "Taking path H3..."; }
            else { isGameOver = true; message = "Game Over. Failed Hard level."; }
        }
    }

    return { message, isVictory, isGameOver };
}

/* --- 9. CUSTOM POPUP MODAL --- */
function showMagicPopup(message, callback) {
    const popup = document.getElementById("magic-popup");
    const popupMessage = document.getElementById("magic-popup-message");
    const popupButton = document.getElementById("magic-popup-ok");
    
    popupMessage.textContent = message;
    popup.style.display = "flex";
    
    // Remove old event listeners by cloning
    const newButton = popupButton.cloneNode(true);
    popupButton.parentNode.replaceChild(newButton, popupButton);
    
    newButton.onclick = function() {
        popup.style.display = "none";
        if (callback) callback();
    };
}

function processNextLevel() {
    const result = calculateNextMove();
    if (result.isVictory || result.isGameOver) {
        showMagicPopup(result.message, function() {
            location.reload();
        });
    } else {
        showMagicPopup(result.message, function() {
            score = 0;
            currentQuestion = 0;
            questionsCorrect = 0;
            // Reload saved total score in case it was updated
            loadSavedTotalScore();
            updateScoreDisplay();
            loadQuestion();
        });
    }
}

/* --- 7. SAVE STATS FUNCTION --- */
function saveGameStats() {
    try {
        const currentRaw = localStorage.getItem("currentUser");
        const usersRaw = localStorage.getItem("quizUsers");

        if (!currentRaw || !usersRaw) {
            console.log("No user data found in localStorage");
            return;
        }

        let currentUser = JSON.parse(currentRaw);
        let allUsers = JSON.parse(usersRaw);

        // Find the current user in the users array
        const userIndex = allUsers.findIndex(u =>
            u.username && currentUser.username &&
            u.username.toLowerCase() === currentUser.username.toLowerCase()
        );

        if (userIndex !== -1) {
            // Ensure wtotalPoints field exists and is a number
            if (typeof allUsers[userIndex].wtotalPoints === 'undefined' || allUsers[userIndex].wtotalPoints === null) {
                allUsers[userIndex].wtotalPoints = 0;
            }
            
            // Update wtotalPoints - only add NEW points from this session
            const currentPoints = Number(allUsers[userIndex].wtotalPoints) || 0;
            const newPointsThisSession = wtotalPoints - pointsSavedThisSession;
            const newPoints = currentPoints + newPointsThisSession;
            
            // Update the saved counter
            pointsSavedThisSession = wtotalPoints;

            // Ensure we're saving a number, not undefined
            allUsers[userIndex].wtotalPoints = Number(newPoints) || 0;
            
            // Update the saved total points for display
            savedTotalPoints = Number(newPoints) || 0;
            
            console.log(`=== SAVING STATS ===`);
            console.log(`Current user: ${allUsers[userIndex].username}`);
            console.log(`currentPoints (from localStorage): ${currentPoints}`);
            console.log(`wtotalPoints (session total): ${wtotalPoints}`);
            console.log(`pointsSavedThisSession (already saved): ${pointsSavedThisSession}`);
            console.log(`newPointsThisSession (to add): ${newPointsThisSession}`);
            console.log(`newPoints (final total): ${newPoints}`);
            console.log(`groupValues[${currentGroup}]: ${groupValues[currentGroup]}`);

            // Add match history
            if (!allUsers[userIndex].matches) {
                allUsers[userIndex].matches = [];
            }

            allUsers[userIndex].matches.push({
                game: "Magic Library",
                level: currentLevel,
                group: currentGroup,
                score: score,
                questionsCorrect: questionsCorrect,
                questionsAnswered: questionsAnswered,
                wtotalPoints: wtotalPoints,
                finishedAt: new Date().toISOString()
            });

            // Calculate level (1 level per 7 points)
            allUsers[userIndex].level = 1 + Math.floor(newPoints / 7);

            // Update both the users array and current user
            localStorage.setItem("quizUsers", JSON.stringify(allUsers));
            localStorage.setItem("currentUser", JSON.stringify(allUsers[userIndex]));

            console.log(`Stats saved for ${allUsers[userIndex].username}: ${newPoints} total points (wtotalPoints=${allUsers[userIndex].wtotalPoints})`);
            
            // Verify the save worked
            const verify = JSON.parse(localStorage.getItem("quizUsers"));
            const verifyUser = verify.find(u => 
                u.username && allUsers[userIndex].username &&
                u.username.toLowerCase() === allUsers[userIndex].username.toLowerCase()
            );
            if (verifyUser) {
                console.log(`✅ Verification: Saved wtotalPoints = ${verifyUser.wtotalPoints} (should be ${newPoints})`);
                if (verifyUser.wtotalPoints !== newPoints) {
                    console.error(`❌ ERROR: Saved value (${verifyUser.wtotalPoints}) doesn't match expected (${newPoints})!`);
                }
            } else {
                console.error(`❌ ERROR: Could not verify save - user not found!`);
            }
            
            // Also verify currentUser
            const verifyCurrent = JSON.parse(localStorage.getItem("currentUser"));
            if (verifyCurrent) {
                console.log(`✅ Current user wtotalPoints = ${verifyCurrent.wtotalPoints}`);
            }
        } else {
            console.log("Current user not found in users array");
        }
    } catch (e) {
        console.error("Error saving game stats:", e);
    }
}

/* --- 8. SHOW RESULT --- */
function showResult() {
    // ADD POINTS IMMEDIATELY when level is completed (if passed)
    const passed = score > 5;
    console.log("showResult called - score:", score, "passed:", passed, "currentGroup:", currentGroup, "wtotalPoints before:", wtotalPoints);
    
    if (passed) {
        // Add points for completing this group
        const pointsToAdd = groupValues[currentGroup] || 0;
        wtotalPoints += pointsToAdd;
        console.log(`Player passed! Adding ${pointsToAdd} points. New wtotalPoints: ${wtotalPoints}`);
    }
    
    // Always save stats when showing result
    // This ensures match history is saved and points are persisted
    console.log("Saving stats with wtotalPoints:", wtotalPoints);
    saveGameStats();
    // Update display after saving
    updateScoreDisplay();

    cauldron.style.display = "none";
    witch.style.display = "none";
    rich.style.display = "none";
    money.style.display = "none";
    frog.style.display = "none";
    cauldronr.style.display = "none";
    cauldronf.style.display = "none";

    choiceButtons.forEach(btn => btn.style.display = "none");
    if (choicesContainer) choicesContainer.style.display = "none";

    const totalAnswered = questionsAnswered || 1; // تجنب القسمة على صفر
    const accuracy = questionsCorrect / totalAnswered;
    const percentage = Math.round(accuracy * 100);

    let title = "Apprentice Witch ✨";
    if (accuracy === 1) title = "Archmage of the Library 🧙‍♀️";
    else if (accuracy >= 0.7) title = "Skilled Spellcaster 🔮";
    else if (accuracy < 0.5) title = "Potion in Training 🧪";

    const totalScore = savedTotalPoints + wtotalPoints;
    questionText.innerText =
`LEVEL COMPLETE!
${title}
Total Greedy Value: ${wtotalPoints}
Total Score: ${totalScore}`;

    let continueBtn = document.createElement("button");
    continueBtn.id = "continue-btn";
    continueBtn.textContent = "Continue Journey ➔";
    continueBtn.onclick = function() { processNextLevel(); };

    let homeBtn = document.getElementById("mag-home-button");
    if (!homeBtn) {
        homeBtn = document.createElement("a");
        homeBtn.id = "mag-home-button";
        homeBtn.textContent = "Exit to Home";
        homeBtn.href = "../home2.html";
        homeBtn.style.display = "block";
        homeBtn.style.marginTop = "10px";
    } else { homeBtn.style.display = "block"; }

    const container = document.getElementById("question-container");
    container.appendChild(continueBtn);
    if (!container.contains(homeBtn)) container.appendChild(homeBtn);
}
