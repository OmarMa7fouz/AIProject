// ==============================
// Quiz Master - Stats Page Logic
// ==============================

const USERS_KEY = "quizUsers";
const CURRENT_USER_KEY = "currentUser";

// ------------------------------
// Load all users
// ------------------------------
function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to load users", e);
    return [];
  }
}

// ------------------------------
// Get currently logged-in user
// ------------------------------
function getCurrentUser() {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error("Failed to load current user", e);
    return null;
  }
}

// ------------------------------
// Render Player Summary
// ------------------------------
function renderPlayerSummary() {
  const box = document.getElementById("playerSummary");
  if (!box) return;

  const user = getCurrentUser();
  if (!user) {
    box.innerHTML = `
      <div style="margin-bottom:10px;">You are not logged in.</div>
      <div>Go back to <a href="home2.html" style="color:#22d3ee; text-decoration:none;">HOME</a> and login.</div>
    `;
    return;
  }

  // Debug logging
  console.log("Stats page - User data:", {
    username: user.username,
    wtotalPoints: user.wtotalPoints,
    wtotalPointsType: typeof user.wtotalPoints,
    matches: user.matches ? user.matches.length : 0
  });

  // Ensure wtotalPoints exists and is a number
  const totalScore = Number(user.wtotalPoints) || 0;
  const level = 1 + Math.floor(totalScore / 7);
  
  console.log("Stats page - Calculated:", {
    totalScore,
    level
  });

  // Get matches count for Magic Library
  const magicLibraryMatches = user.matches ?
    user.matches.filter(match => match.game === "Magic Library").length : 0;

  box.innerHTML = `
    <div class="summary-row">
      <span class="summary-label">Player</span>
      <span class="summary-value"><strong>${user.username}</strong></span>
    </div>
    <div class="summary-row">
      <span class="summary-label">Total Score</span>
      <span class="summary-value">${totalScore} Points</span>
    </div>
    <div class="summary-row">
      <span class="summary-label">Level</span>
      <span class="summary-value">Lv. ${level}</span>
    </div>
    <div class="summary-row">
      <span class="summary-label">Magic Library Games</span>
      <span class="summary-value">${magicLibraryMatches}</span>
    </div>
    <div style="margin-top:14px;"><span class="badge-highlight">LIVE STATS</span></div>
  `;
}

// ------------------------------
// Render Leaderboard
// ------------------------------
function renderLeaderboard() {
  const users = loadUsers();
  const tbody = document.querySelector("#leaderboardTable tbody");
  if (!tbody) return;

  // Calculate total score for each user from all games
  const withStats = users
    .map(u => {
      const username = u.username || "Unknown";
      
      // Get points from all games
      const magicPoints = Number(u.wtotalPoints) || 0;
      const xp = Number(u.xp) || 0;
      const matches = u.matches || [];
      
      // Calculate combined score:
      // - Magic Library uses wtotalPoints directly
      // - AI Robot and Cat&Rat use XP (convert to comparable score: 1 XP = 0.1 points)
      // - Also consider total matches as a tiebreaker
      const totalScore = magicPoints + (xp * 0.1);
      
      return {
        username,
        totalScore,
        wtotalPoints: magicPoints,
        xp: xp,
        matches: matches
      };
    })
    .filter(u => u.totalScore > 0 || (u.matches && u.matches.length > 0)); // Show anyone who played

  // Sort descending by total score
  withStats.sort((a, b) => {
    // Primary sort: total score
    if (b.totalScore !== a.totalScore) {
      return b.totalScore - a.totalScore;
    }
    // Tiebreaker: total matches
    return (b.matches.length || 0) - (a.matches.length || 0);
  });

  if (!withStats.length) {
    tbody.innerHTML = `<tr><td colspan="3">No players with points yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = withStats
    .slice(0, 10)
    .map((u, index) => {
      const rank = index + 1;
      const rankClass = rank === 1 ? "rank-1" :
                      rank === 2 ? "rank-2" :
                      rank === 3 ? "rank-3" : "";

      return `
        <tr>
          <td><span class="rank-pill ${rankClass}">${rank}</span></td>
          <td>${u.username}</td>
          <td>${u.wtotalPoints || 0}</td>
        </tr>
      `;
    })
    .join("");
}

// ------------------------------
// Initialize page with auto-refresh
// ------------------------------
function initStatsPage() {
  renderPlayerSummary();
  renderLeaderboard();

  // Auto-refresh every 5 seconds to show live updates
  setInterval(() => {
    renderPlayerSummary();
    renderLeaderboard();
  }, 5000);
}

window.addEventListener("DOMContentLoaded", initStatsPage);
