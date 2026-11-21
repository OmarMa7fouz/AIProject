
# Quiz Master — Adaptive Local Quiz System

<p align="center">
  <strong>A Frontend-Based Adaptive Assessment and Quiz Ranking System</strong>
</p>

---

## 1. Project Overview

**Quiz Master** is a browser-based adaptive quiz system designed to evaluate users across multiple difficulty levels and rank their performance using a Greedy Algorithm.

The system dynamically adjusts exam progression according to each user's performance. It uses a heuristic-based scoring mechanism to determine final rankings.

The application is built entirely with frontend technologies, requiring no backend server or external database. User progress and results are managed locally through the browser's Local Storage API.

## 2. Abstract

This project presents a client-side adaptive quiz system that evaluates users through multiple difficulty levels and ranks them using a Greedy Algorithm.

The system dynamically controls exam progression based on user performance and applies a greedy heuristic to calculate final rankings.

The project demonstrates algorithmic decision-making, adaptive assessment strategies, heuristic-based optimization, and client-side state management without relying on backend infrastructure.

## 3. Project Objectives

The main objectives of this project are to:

- Develop an adaptive examination system with multiple difficulty levels.
- Implement performance-based exam progression.
- Apply the Greedy Algorithm to rank users based on their accumulated scores.
- Manage user progress and examination results using Local Storage.
- Provide an offline-capable experience without requiring backend services.
- Demonstrate practical applications of heuristic-based decision-making.

## 4. System Architecture

The application follows a frontend-only architecture.

| Component | Description |
|---|---|
| Frontend | HTML, CSS, and Vanilla JavaScript |
| Backend | Not required |
| Database | Not required |
| Data Storage | Browser Local Storage |
| Question Banks | JSON files |
| Execution Environment | Web Browser |

### Architecture Characteristics

- Fully client-side execution.
- No server-side processing.
- No external database dependency.
- Local persistence of user progress and results.
- Offline-capable functionality, subject to browser access to the application files.

## 5. Examination Structure

Each subject is divided into three difficulty levels:

| Level | Exam Sequence | Exam Weights |
|---|---|---|
| Easy | e1, e2, e3 | 3, 2, 1 points |
| Medium | m1, m2, m3 | 3, 2, 1 points |
| Hard | h1, h2, h3 | 3, 2, 1 points |

Each difficulty level contains three sequential examinations.

### Exam Weighting System

Each examination has a predefined weight:

- First exam: **3 points**
- Second exam: **2 points**
- Third exam: **1 point**

The score awarded depends on the examination successfully passed by the user.

## 6. Adaptive Exam Flow

The system determines the user's examination progression based on their performance.

### Examination Process

1. The user selects a subject.
2. The user completes an initial assessment.
3. Based on the assessment result, the system assigns an appropriate difficulty level.
4. The user starts the examinations within the assigned level.
5. Examinations are completed sequentially.
6. The system evaluates the user's result after each examination.

### Passing Conditions

When a user passes an examination:

- The corresponding exam weight is added to the total score.
- The user advances to the next difficulty level.
- Remaining examinations in the current level are skipped.

### Failing Conditions

When a user fails an examination:

- No points are awarded.
- The user proceeds to the next examination within the same difficulty level.
- The system continues evaluating the user's performance until an examination is passed or the available examinations are exhausted.

**Important:** Only the first successfully passed examination in each level contributes to the final score.

## 7. Scoring Policy

The scoring mechanism follows these rules:

- Each difficulty level contributes a maximum of one examination score.
- Only successfully passed examinations are counted.
- Failed examinations do not contribute to the total score.
- Passing an examination immediately advances the user to the next difficulty level.
- Remaining examinations in a completed level are skipped.

The final score is calculated by accumulating the points earned across all successfully completed difficulty levels.

### Example Scoring Scenario

Consider a user who starts at the Easy level:

| Examination | Result | Points |
|---|---|---:|
| e1 | Failed | 0 |
| e2 | Passed | 2 |
| e3 | Skipped | 0 |
| m1 | Passed | 3 |
| h1 | Passed | 3 |

**Final Score: 8 Points**

The user earns 2 points from Easy, 3 points from Medium, and 3 points from Hard.

## 8. Greedy Algorithm Implementation

The Greedy Algorithm is applied during the final ranking process after users complete their examinations.

Its purpose is to rank users according to their accumulated scores.

### 8.1 Heuristic Function

The heuristic function represents the total score achieved by each user.

\[
h(n) = \text{Total Score of User } n
\]

### 8.2 Evaluation Function

The evaluation function is defined as:

\[
f(n) = h(n)
\]

Therefore, the evaluation value is determined entirely by the user's accumulated examination score.

### 8.3 Ranking Strategy

The system applies a greedy selection strategy by prioritizing users with the highest total scores.

The ranking process:

1. Retrieves the final scores of all users.
2. Compares their accumulated scores.
3. Sorts users in descending order.
4. Places users with higher scores at the top of the leaderboard.

### 8.4 Algorithm Characteristics

- **Deterministic:** The same scores produce the same score-based ranking.
- **No Backtracking:** Previous examination decisions are not reconsidered.
- **Greedy Selection:** Users with higher accumulated scores receive higher ranking positions.
- **Time Complexity:** \(O(n \log n)\) for comparison-based sorting, where \(n\) represents the number of users.
- **Ranking Criterion:** Total accumulated examination score.

## 9. Local Storage Management

The application uses the browser's Local Storage API to maintain user information and examination progress.

### Stored Information

The system stores:

- Current difficulty level.
- Current examination.
- Examination attempts.
- Final accumulated score.
- User progress.
- Leaderboard ranking data.

This approach allows the application to maintain user progress between browser sessions without requiring a backend server.

## 10. Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | Styling and responsive interface |
| Vanilla JavaScript | Application logic and algorithm implementation |
| JSON | Question banks and configuration data |
| Local Storage API | Client-side data persistence |

## 11. Project Structure

The project is organized into separate files and dedicated directories for each quiz module.

```text
FINAL PROJECT/
│
├── home2.html
├── home2.css
├── home2.js
│
├── stats.html
├── stats.css
├── stats.js
│
├── users.json
│
├── AIQuiz (ROBOT)/
│   ├── ai2.html
│   ├── ai2.css
│   ├── ai2.js
│   └── aisavecode.js
│
├── Quiz (Cat & Rat)/
│   ├── cat-rat.html
│   ├── cat-rat.css
│   ├── cat-rat.js
│   └── aisavecode.js
│
└── Quiz (Magic Library)/
    ├── mag.html
    ├── mag.css
    └── mag.js
```

### Main Components

| Component | Description |
|---|---|
| Home Page | Main application entry point |
| Statistics | Displays project statistics |
| Users Data | Contains user-related JSON data |
| AI Quiz (Robot) | Robot-themed quiz module |
| Cat & Rat Quiz | Interactive Cat & Rat quiz module |
| Magic Library Quiz | Magic Library-themed quiz module |

## 12. Educational Outcomes

This project demonstrates practical knowledge of:

- Adaptive examination systems.
- Greedy algorithm implementation.
- Heuristic functions and evaluation strategies.
- Algorithmic decision-making.
- Client-side state management.
- Browser-based data persistence.
- Frontend application development.
- Score calculation and leaderboard ranking.

## 13. Team Members

| Name | Student ID | Role |
|---|---|---|
| Abdulrhman Mohamed Taha | 202304470 | Core Developer |
| Yousef Mohamed Gomaa | 202304488 | Algorithm Specialist |
| Mohammed Ebrahem Rezk | 202304358 | UI/UX Developer |
| Yasmin Mohamed Fayez Tahif | 202304466 | Frontend Developer |
| Omar Elsayed Mohamed | 202304658 | Project Manager |
| Mohamed Salah Mohamed | 202304574 | Testing and QA |

## 14. Project Status

| Attribute | Details |
|---|---|
| Version | 1.0 |
| Status | Academic Submission |
| Implementation | Frontend Only |
| Backend Dependency | None |
| Database Dependency | None |
| Offline Capability | Supported |

## 15. License

This project is released under the **MIT License**.

See the `LICENSE` file for more information.
