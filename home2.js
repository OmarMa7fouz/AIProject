// =========================================
// Quiz Master - Core Logic
// =========================================

// ----------------------------
// 1. CONFIGURATION
// ----------------------------
// إعدادات افتراضية بسيطة للتطبيق
const defaultConfig = {
    logo_text: "Quiz Master",
};

// ----------------------------
// 1.a SIMPLE USER "DATABASE" (LOCALSTORAGE)
// ----------------------------
// We keep users in localStorage as JSON so data survives page refresh.
const USERS_KEY = "quizUsers";

function loadUsers() {
    try {
        const raw = localStorage.getItem(USERS_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        console.error("Failed to parse users from localStorage", e);
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function registerUser(username, email, password) {
    const users = loadUsers();
    const exists = users.find(
        (u) => u.username.toLowerCase() === username.toLowerCase()
    );
    if (exists) {
        return { success: false, message: "Username already exists." };
    }
    const newUser = {
        username,
        email,
        password,
        createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    saveUsers(users);
    return { success: true, message: "Account created. Welcome to Quiz Master!" };
}

function loginUser(username, password) {
    const users = loadUsers();
    const found = users.find(
        (u) =>
            u.username.toLowerCase() === username.toLowerCase() &&
            u.password === password
    );
    if (!found) {
        return { success: false, message: "Invalid username or password." };
    }
    localStorage.setItem("currentUser", JSON.stringify(found));
    return { success: true, message: `Welcome back, ${found.username}!` };
}

// ----------------------------
// 2. HELPER FUNCTIONS
// ----------------------------

// Neon toast popup (replaces boring alert)
function showToast(message, type = "success") {
    const container = document.getElementById("toastContainer");
    if (!container) {
        alert(message);
        return;
    }

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    const icon = document.createElement("div");
    icon.className = "toast-icon";
    icon.textContent = type === "error" ? "⚠️" : "✅";

    const msg = document.createElement("div");
    msg.className = "toast-message";
    msg.textContent = message;

    const closeBtn = document.createElement("button");
    closeBtn.className = "toast-close";
    closeBtn.textContent = "×";
    closeBtn.addEventListener("click", () => {
        toast.style.animation = "toastOut 0.2s ease-in forwards";
        setTimeout(() => toast.remove(), 180);
    });

    toast.appendChild(icon);
    toast.appendChild(msg);
    toast.appendChild(closeBtn);

    container.appendChild(toast);

    setTimeout(() => {
        if (!toast.isConnected) return;
        toast.style.animation = "toastOut 0.2s ease-in forwards";
        setTimeout(() => toast.remove(), 180);
    }, 3500);
}

// Scroll to top of page (used for logo and Home button)
// دالة مساعدة لإعادة الصفحة إلى الأعلى بسلاسة
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Scroll to subjects section
// دالة للتمرير لأسفل حتى الوصول لقسم المواد (Subjects Section)
function scrollToSubjects() {
    const subjectsSection = document.querySelector('.subjects-section');
    if (subjectsSection) {
        subjectsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// ----------------------------
// 3. NAVIGATION EVENT LISTENERS
// ----------------------------

// Logo click → scroll to top
// عند النقر على شعار الموقع، يتم الصعود لأعلى الصفحة
const siteLogo = document.getElementById('siteLogo');
if (siteLogo) {
    siteLogo.addEventListener('click', scrollToTop);
}

// Home button → scroll to top
// زر "الرئيسية" في القائمة: يمنع إعادة التحميل ويصعد لأعلى الصفحة
const navHome = document.getElementById('navHome');
if (navHome) {
    navHome.addEventListener('click', (e) => {
        e.preventDefault(); // prevent page reload
        scrollToTop();
    });
}

// Login button → login/logout toggle
// زر تسجيل الدخول: يفتح النافذة المنبثقة أو يسجل خروج المستخدم
const navLogin = document.getElementById("navLogin");
if (navLogin) {
    navLogin.addEventListener("click", (e) => {
        e.preventDefault();
        const currentRaw = localStorage.getItem("currentUser");
        if (currentRaw) {
            // Logout
            localStorage.removeItem("currentUser");
            showToast("You have been logged out.", "success");
            navLogin.textContent = "LOGIN";
            renderUserStats();
        } else {
            openAuthPopup();
            switchTab('login');
        }
    });
}

// Quizzes nav → scroll to dropdown section
// زر "الكويزات": يقوم بالتمرير لأسفل إلى القائمة المنسدلة لاختيار المادة
const navQuizzes = document.getElementById("navQuizzes");
if (navQuizzes) {
    navQuizzes.addEventListener("click", (e) => {
        e.preventDefault();
        const dropdown = document.querySelector('.custom-select-wrapper');
        if (dropdown) {
            dropdown.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ----------------------------
// 4. BUTTONS EVENT LISTENERS
// ----------------------------

// Chatbot button → scroll to chatbot section
// زر الروبوت: يمرر الصفحة لقسم الشات بوت
const chatbotBtn = document.getElementById('chatbotBtn');
if (chatbotBtn) {
    chatbotBtn.addEventListener('click', () => {
        document.querySelector('.chatbot-section').scrollIntoView({ behavior:
'smooth' });
    });
}

// Start Game button → scroll to subjects
// زر "ابدأ اللعبة": يمرر الصفحة لقسم المواد
const startBtn = document.getElementById('startBtn');
if (startBtn) {
    startBtn.addEventListener('click', () => {
        document.querySelector('.subjects-section').scrollIntoView({ behavior:
'smooth' });
    });
}

// Tutorial button → scroll to difficulty section
// زر "التعليمات": يمرر الصفحة لقسم اختيار الصعوبة
const learnBtn = document.getElementById('learnBtn');
if (learnBtn) {
    learnBtn.addEventListener('click', () => {
        document.querySelector('.difficulty-section').scrollIntoView({ behavior:
'smooth' });
    });
}

// 3D Tilt effect on hero title
// تأثير إمالة ثلاثي الأبعاد لعنوان الصفحة الرئيسي بناءً على حركة الماوس
const title = document.querySelector('.hero-title');
if (title) {
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 50;
        const y = (window.innerHeight / 2 - e.pageY) / 50;
        title.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
    });
}

// ----------------------------
// 5. MISSION CONTROL: CUSTOM DROPDOWN LOGIC
// ----------------------------
// تعريف عناصر القائمة المنسدلة (Dropdown) الخاصة باختيار المواد
const wrapper = document.querySelector('.custom-select-wrapper');
const trigger = document.getElementById('dropdownTrigger');
const triggerText = document.getElementById('triggerText');
const options = document.querySelectorAll('.custom-option');
const hiddenInput = document.getElementById('questSelector');
const launchBtn = document.getElementById('launchBtn');

// Toggle dropdown open/close
// فتح وإغلاق القائمة عند النقر عليها
if (trigger) {
    trigger.addEventListener('click', function(e) {
        e.stopPropagation();
        wrapper.classList.toggle('open');
    });
}

// Option selection
// التعامل مع اختيار عنصر من القائمة
options.forEach(option => {
    option.addEventListener('click', function() {
        // تحديث النص الظاهر باسم المادة المختارة وتغيير لونه
        triggerText.textContent = this.textContent.trim();
        triggerText.style.color = "#00f2ff";
        triggerText.style.fontWeight = "bold";

        // تخزين القيمة المختارة (مثل ai, web, para) في حقل مخفي
        hiddenInput.value = this.getAttribute('data-value');

        // إغلاق القائمة وإزالة التحديد من الخيارات الأخرى
        wrapper.classList.remove('open');
        options.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');

        // إعادة ضبط حدود القائمة
        trigger.style.borderColor = "rgba(255, 255, 255, 0.15)";
        trigger.style.boxShadow = "none";
    });
});

// Close dropdown if clicked outside
// إغلاق القائمة إذا نقر المستخدم في أي مكان خارجها
document.addEventListener('click', function(e) {
    if (wrapper && wrapper.classList.contains('open')) {
        if (!wrapper.contains(e.target)) {
            wrapper.classList.remove('open');
        }
    }
});

// Launch button → go to Game according to the selectedCourse
// زر التشغيل (Launch) للانتقال للامتحان الأولي
launchBtn.addEventListener('click', () => {
    const selectedSubject = hiddenInput.value;

    if (!selectedSubject) {
        trigger.style.borderColor = '#ff0055';
        trigger.style.boxShadow = '0 0 20px #ff0055';
        trigger.classList.add('shake-anim');
        setTimeout(() => trigger.classList.remove('shake-anim'), 500);
        return;
    }

    console.log(`🚀 Launching course: ${selectedSubject}`);
    localStorage.setItem("selectedCourse", selectedSubject);

    // تغيير النص للتحميل
    launchBtn.innerText = "CONNECTING...";
    launchBtn.style.opacity = "0.8";
    launchBtn.style.cursor = "wait";

    setTimeout(() => {
    // تحديد الصفحة حسب المادة
    let targetPage = "";
    if (selectedSubject === "web") targetPage = "Quiz(Magic Library)/mag.html";
    else if (selectedSubject === "para") targetPage =
"Quiz(Cat&Rat)/cat-rat.html";
    else if (selectedSubject === "ai") targetPage = "AIQuiz(ROBOT)/ai2.html";

    window.location.href = targetPage;
}, 1200);

});


// ----------------------------
// 6. CHATBOT SEQUENTIAL ANIMATION
// ----------------------------
// ----------------------------
// CHATBOT SEQUENTIAL MESSAGES (Repeating every 5s)
// ----------------------------
// عناصر رسائل الشات بوت
const msgWelcome = document.getElementById("chatbotWelcome");
const msgInstruction = document.getElementById("chatbotInstruction");
const missionControl = document.querySelector(".mission-control");

// Hide initially
// إخفاء العناصر مبدئياً
[msgWelcome, msgInstruction, missionControl].forEach(el => {
    if (el) el.style.opacity = 0;
});

// Function to show messages sequentially
// دالة لعرض الرسائل بالتتابع (واحدة تلو الأخرى)
function showSequentialMessages() {
    if (!msgWelcome || !msgInstruction || !missionControl) return;

    // Reset all to invisible
    // إعادة الإخفاء للبدء من جديد
    [msgWelcome, msgInstruction, missionControl].forEach(el => el.style.opacity
= 0);

    // Show Welcome
    // إظهار رسالة الترحيب بعد نصف ثانية
    setTimeout(() => { msgWelcome.style.opacity = 1; }, 500);

    // Show Instruction after Welcome
    // إظهار التعليمات بعد ثانيتين
    setTimeout(() => { msgInstruction.style.opacity = 1; }, 2000);

    // Show Mission Control after Instruction
    // إظهار لوحة التحكم (Mission Control) بعد 3.5 ثانية
    setTimeout(() => { missionControl.style.opacity = 1; }, 3500);
}

// Run the sequence immediately
// تشغيل الدالة فوراً
showSequentialMessages();

// Repeat every 5 seconds
// تكرار عرض الرسائل كل 15 ثانية
const chatInterval = setInterval(() => {
    showSequentialMessages();
}, 15000);

// ----------------------------
// 7. AUTH POPUP LOGIC
// ----------------------------

// Open authentication popup
// دالة لفتح نافذة تسجيل الدخول/التسجيل المنبثقة
function openAuthPopup() {
    const popup = document.getElementById("authPopup");
    if (popup) {
        popup.style.display = "flex";
        setTimeout(() => { popup.style.opacity = "1"; }, 10);
    }
}

// Close authentication popup
// دالة لإغلاق النافذة المنبثقة
function closeAuthPopup() {
    const popup = document.getElementById("authPopup");
    if (popup) {
        popup.style.opacity = "0";
        setTimeout(() => { popup.style.display = "none"; }, 400);
    }
}

// Switch between login and register tabs
// دالة للتبديل بين "تسجيل الدخول" و "إنشاء حساب جديد" داخل النافذة
function switchTab(tab) {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const loginTab =
document.querySelector(".auth-tab[onclick=\"switchTab('login')\"]");
    const registerTab =
document.querySelector(".auth-tab[onclick=\"switchTab('register')\"]");

    if (tab === "login") {
        loginForm.classList.add("active");
        registerForm.classList.remove("active");
        loginTab.classList.add("active");
        registerTab.classList.remove("active");
    } else {
        loginForm.classList.remove("active");
        registerForm.classList.add("active");
        loginTab.classList.remove("active");
        registerTab.classList.add("active");
    }
}

// Handle LOGIN form submit
const loginFormEl = document.getElementById("loginForm");
if (loginFormEl) {
    loginFormEl.addEventListener("submit", (e) => {
        e.preventDefault();
        const usernameInput = document.getElementById("loginUsername");
        const passwordInput = document.getElementById("loginPassword");
        if (!usernameInput || !passwordInput) return;

        const result = loginUser(usernameInput.value.trim(), passwordInput.value);
        showToast(result.message, result.success ? "success" : "error");
        if (result.success) {
            closeAuthPopup();
            const navLoginLink = document.getElementById("navLogin");
            if (navLoginLink) {
                navLoginLink.textContent = "LOGOUT";
            }
            renderUserStats();
        }
    });
}

// Handle REGISTER form submit
const registerFormEl = document.getElementById("registerForm");
if (registerFormEl) {
    registerFormEl.addEventListener("submit", (e) => {
        e.preventDefault();
        const usernameInput = document.getElementById("registerUsername");
        const emailInput = document.getElementById("registerEmail");
        const passwordInput = document.getElementById("registerPassword");
        if (!usernameInput || !emailInput || !passwordInput) return;

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!username || !email || !password) {
            showToast("Please fill in all fields.", "error");
            return;
        }

        const result = registerUser(username, email, password);
        showToast(result.message, result.success ? "success" : "error");
        if (result.success) {
            switchTab("login");
        }
    });
}

// Open login button
// ربط زر فتح الدخول بالدالة
const loginBtn = document.getElementById("openLoginBtn");
if (loginBtn) {
    loginBtn.addEventListener("click", openAuthPopup);
}

// ----------------------------
// 9. USER STATS PANEL
// ----------------------------
function renderUserStats() {
    const card = document.getElementById("userCard");
    if (!card) return;

    const raw = localStorage.getItem("currentUser");
    if (!raw) {
        card.textContent = "Login to track your matches and see your achievements.";
        return;
    }

    const user = JSON.parse(raw);
    const matches = user.matches || [];

    if (!matches.length) {
        card.innerHTML = `Welcome, <strong>${user.username}</strong>!<br>No matches yet. Start a game to earn your first achievement.`;
        return;
    }

    const totalGames = matches.length;
    const totalScore = matches.reduce((sum, m) => sum + (m.score || 0), 0);
    const totalQuestions = matches.reduce((sum, m) => sum + (m.total || 0), 0);
    const bestMatch = matches.reduce((best, m) => {
        if (!best) return m;
        return (m.score || 0) > (best.score || 0) ? m : best;
    }, null);

    const lastMatches = matches.slice(-3).reverse();

    // Derive XP/level from stored fields or recompute from matches
    const totalXpFromMatches = matches.reduce((sum, m) => sum + (m.xpEarned || 0), 0);
    const xp = typeof user.xp === "number" ? user.xp : totalXpFromMatches;
    const level = typeof user.level === "number" ? user.level : (1 + Math.floor(xp / 100));

    // Simple achievements
    const achievements = [];
    if (matches.length >= 1) achievements.push("First Blood – played your first match");
    const perfectRun = matches.some(m => m.total && m.score === m.total);
    if (perfectRun) achievements.push("Perfectionist – completed a perfect run");
    const highStreak = matches.some(m => (m.bestStreak || 0) >= 3);
    if (highStreak) achievements.push("Combo Hunter – 3+ correct answers in a row");

    const lastList = lastMatches.map(m =>
        `<li>${m.game} - <strong>${m.score}/${m.total}</strong>${m.bestStreak ? ` (streak ${m.bestStreak})` : ""}</li>`
    ).join("");

    const achievementsHtml = achievements.length
        ? `<ul style="margin-top:6px; padding-left:18px; list-style: disc;">
                ${achievements.map(a => `<li>${a}</li>`).join("")}
           </ul>`
        : `<div>No achievements yet. Play more to unlock titles!</div>`;

    card.innerHTML = `
        <div><strong>Player:</strong> ${user.username}</div>
        <div><strong>Level:</strong> ${level} &nbsp;&nbsp; <strong>XP:</strong> ${xp}</div>
        <div><strong>Total matches:</strong> ${totalGames}</div>
        <div><strong>Total score:</strong> ${totalScore} / ${totalQuestions}</div>
        ${bestMatch ? `<div><strong>Best run:</strong> ${bestMatch.game} (${bestMatch.score}/${bestMatch.total})</div>` : ""}
        <div style="margin-top:10px;"><strong>Recent matches:</strong></div>
        <ul style="margin-top:6px; padding-left:18px; list-style: disc;">
            ${lastList}
        </ul>
        <div style="margin-top:10px;"><strong>Achievements:</strong></div>
        ${achievementsHtml}
    `;
}

// Initialize UI based on stored user on page load
document.addEventListener("DOMContentLoaded", () => {
    const navLoginLink = document.getElementById("navLogin");
    const currentRaw = localStorage.getItem("currentUser");
    if (navLoginLink) {
        navLoginLink.textContent = currentRaw ? "LOGOUT" : "LOGIN";
    }
    renderUserStats();

    // Secret admin shortcut: Ctrl+Shift+U → download users.json (no visible UI)
    document.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.shiftKey && (e.key === "u" || e.key === "U")) {
            e.preventDefault();
            const users = loadUsers();
            const data = JSON.stringify({ users }, null, 2);
            const blob = new Blob([data], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "users.json";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            console.log("users.json downloaded via secret shortcut (Ctrl+Shift+U).");
        }
    });
});

// ----------------------------
// 8. SHAKE ANIMATION FOR DROPDOWN
// ----------------------------
// إنشاء كود CSS ديناميكي لحركة الاهتزاز (تستخدم عند نسيان اختيار مادة)
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
}
.shake-anim { animation: shake 0.3s ease-in-out; }
`;
document.head.appendChild(styleSheet);

// ----------------------------
// 10. LOG
// ----------------------------
console.log("Game Mode Activated 🚀");
