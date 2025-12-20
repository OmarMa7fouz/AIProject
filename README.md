# Quiz Master — Local Quiz Games (Frontend Prototype)


Abstract

This project presents a client-side adaptive quiz system that evaluates users through multiple difficulty levels and ranks them using a Greedy Algorithm. The system dynamically controls exam progression based on user performance and applies a greedy heuristic to compute final rankings. The entire application is implemented using frontend technologies without any backend or database dependency.

Project Description

The AI Quiz System is a browser-based application designed to simulate adaptive assessment systems. Users are evaluated through a structured set of exams organized by difficulty levels. Each decision in the exam flow is made locally based on the user’s current performance.

The project focuses on algorithmic logic, decision-making strategies, and heuristic-based ranking rather than server-side processing.

System Architecture

- Frontend-only application
- No backend server
- No database
- Persistent data stored using Browser Local Storage
- JSON files used for question banks and configuration

Exam Structure

Each subject contains three difficulty levels:

- Easy
- Medium
- Hard

Each difficulty level contains three exams:

- Easy level: e1, e2, e3
- Medium level: m1, m2, m3
- Hard level: h1, h2, h3

Each exam has a predefined weight:

- First exam in level: 3 points
- Second exam in level: 2 points
- Third exam in level: 1 point

Exam Flow Logic

- The user selects a subject.
- The user completes an initial assessment.
- Based on the score, the system assigns the user to a difficulty level.
- Exams within a level are taken sequentially.

If the user passes an exam:

- The score of that exam is added.
- The user advances to the next difficulty level.

If the user fails an exam:

- No score is added.
- The user moves to the next exam within the same level.

Only the first successfully passed exam per level contributes to the final score.

Failed exams are ignored and do not affect scoring.

Scoring Policy

- Each level contributes at most one score.
- Only passed exams are counted.
- Failed exams have no effect on the total score.
- Once the user advances to a higher level, remaining exams in the previous level are skipped.

Greedy Algorithm Application

The Greedy Algorithm is applied after all users complete their exams.

Heuristic Definition

h(n) = total score achieved by the user

Evaluation Function

f(n) = h(n)

The algorithm ranks users by selecting the locally optimal choice, which is the highest total score, without reconsidering previous decisions.

Algorithm Characteristics

- Deterministic behavior
- No backtracking
- Time complexity dominated by sorting: O(n log n)
- Ranking based solely on accumulated score

Local Storage Usage

User data is stored locally in the browser, including:

- Current level
- Current exam
- Exam attempts
- Final score
- Leaderboard ranking

This approach enables offline functionality and eliminates the need for backend services.

Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- JSON
- Browser Local Storage API

Project Structure

FINAL PROJECT/
├── home2.html
├── home2.css
├── home2.js
├── stats.html
├── stats.css
├── stats.js
├── users.json
├── AIQuiz(ROBOT)/
│ ├── ai2.html
│ ├── ai2.css
│ ├── ai2.js
│ └── aisavecode.js
├── Quiz(Cat&Rat)/
│ ├── cat-rat.html
│ ├── cat-rat.css
│ ├── cat-rat.js
│ └── aisavecode.js
└── Quiz(Magic Library)/
├── mag.html
├── mag.css
└── mag.js

Example Scenario

User enters Easy level.

User fails exam e1.

User passes exam e2.

User gains 2 points.

User advances to Medium level.

Exam e3 is skipped.

Final score is used for ranking.

Educational Objectives

This project demonstrates:

- Adaptive exam systems
- Greedy decision-making strategies
- Client-side state management
- Algorithm-based user ranking
- Practical use of heuristic functions

Team Members

Name Student ID Role
Abdulrhman Mohamed Taha 202304470 Core Developer
Yousef Mohamed Gomaa 202304488 Algorithm Specialist
Mohammed Ebrahem Rezk 202304358 UI/UX Developer
Yasmin Mohamed Fayez Tahif 202304466 Frontend Developer
Omar Elsayed Mohamed 202304658 Project Manager
Mohamed Salah Mohamed 202304574 Testing and QA

License

This project is released under the MIT License.

Project Status

- Version 1.0
- Academic submission
- Frontend-only implementation
- Offline-capable system

