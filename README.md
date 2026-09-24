# 🎮 CodeClash

### Gamified Coding Battle Platform

> **Code. Battle. Level Up.**

CodeClash is a modern gamified coding platform designed to make programming practice more engaging and competitive.

Users can solve coding challenges, earn XP, level up, maintain coding streaks, unlock achievements, participate in coding battles, track their progress, and compete on leaderboards.

---

## 🚀 Features

### 👤 User Accounts

* User registration
* User login
* Individual user profiles
* Separate progress for every user
* Persistent user data using LocalStorage
* Logout functionality

### 💻 Coding Challenges

* Easy, Medium, and Hard challenges
* Multiple DSA categories
* Challenge search
* Difficulty filtering
* Category filtering
* Challenge progress tracking
* Coding arena
* Simulated code execution
* Submission simulation

### ⚔️ Battle Arena

* Quick battles
* Practice battles
* Simulated opponents
* Battle results
* XP rewards
* Rating system
* Battle history

### 🏆 Gamification

* XP system
* Level progression
* Coding streaks
* Achievements
* Badges
* Challenge rewards
* Battle rewards

### 📊 Statistics

* Problems solved
* Difficulty distribution
* XP progress
* Battle statistics
* Coding activity
* Performance tracking

### 🥇 Leaderboard

* Global leaderboard
* XP-based ranking
* Player levels
* Problems solved
* Battle wins
* Current user highlighting

### 🎯 Daily Challenge

* Daily coding challenge
* XP rewards
* Streak tracking
* Challenge completion status

### ⚙️ Settings

* Theme settings
* Notification settings
* Sound settings
* Animation settings
* Reset demo progress

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* HTML5
* CSS3
* React Router

### Data Storage

* LocalStorage
* Mock data

### Planned Backend

* Java
* Spring Boot
* Spring Security
* JWT
* Spring Data JPA
* Hibernate
* MySQL
* REST APIs

---

## 🏗️ Current Architecture

```text
React
   │
   ├── Components
   ├── Pages
   ├── Mock Data
   ├── State Management
   └── LocalStorage
```

### Planned Architecture

```text
React Frontend
       │
       ▼
Spring Boot REST API
       │
       ▼
Spring Security + JWT
       │
       ▼
Spring Data JPA / Hibernate
       │
       ▼
MySQL Database
```

---

## 📂 Project Structure

```text
codeclash/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Navbar/
│   │   ├── Sidebar/
│   │   ├── ChallengeCard/
│   │   ├── AchievementCard/
│   │   ├── Leaderboard/
│   │   ├── ProfileCard/
│   │   ├── XPBar/
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── Home/
│   │   ├── Login/
│   │   ├── Register/
│   │   ├── Dashboard/
│   │   ├── Challenges/
│   │   ├── CodingArena/
│   │   ├── BattleArena/
│   │   ├── Leaderboard/
│   │   ├── Achievements/
│   │   ├── DailyChallenge/
│   │   ├── Statistics/
│   │   ├── Profile/
│   │   └── Settings/
│   │
│   ├── data/
│   │   ├── challenges.js
│   │   ├── achievements.js
│   │   ├── users.js
│   │   └── leaderboard.js
│   │
│   ├── utils/
│   │   ├── storage.js
│   │   ├── xpSystem.js
│   │   └── levelSystem.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── README.md
└── .gitignore
```

---

## 🎮 How It Works

### 1. Register

Create a CodeClash account.

```text
Register
   ↓
Create Account
```

### 2. Login

Login using the registered credentials.

```text
Login
   ↓
Dashboard
```

### 3. Solve Challenges

Choose a coding challenge and enter the Coding Arena.

```text
Challenge
   ↓
Coding Arena
   ↓
Run Code
   ↓
Submit
```

### 4. Earn XP

Users receive XP for completing activities.

| Activity         |   XP |
| ---------------- | ---: |
| Easy Challenge   |  +50 |
| Medium Challenge | +100 |
| Hard Challenge   | +200 |
| Daily Challenge  | +100 |
| Battle Victory   | +250 |

### 5. Level Up

As users earn XP, their level increases.

```text
XP
 ↓
Level Progress
 ↓
Level Up
 ↓
Unlock Achievements
```

### 6. Compete

Users can participate in battles and compete on the leaderboard.

---

## 👥 Multi-User System

CodeClash supports multiple independent users in the frontend prototype.

Each user has separate:

* Account
* XP
* Level
* Challenges
* Achievements
* Streak
* Statistics
* Battle history
* Profile
* Settings

For example:

```text
User A
Level 8
3750 XP

User B
Level 2
650 XP
```

Their progress is completely independent.

---

## 💾 Data Persistence

The current version uses browser **LocalStorage**.

User progress remains available after refreshing the browser.

Stored information includes:

* User account
* Login session
* XP
* Level
* Completed challenges
* Achievements
* Streak
* Battle history
* Statistics
* Settings

> LocalStorage is used only for the frontend prototype. Production authentication and data storage will be implemented using Spring Boot, Spring Security, JWT, and MySQL.

---

## 🖥️ Installation

### Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/codeclash.git
```

### Navigate to the project

```bash
cd codeclash
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

The application will run locally through the Vite development server.

---

## 🔮 Future Improvements

The following features are planned for the Java Full-Stack version:

* Spring Boot backend
* MySQL database
* REST APIs
* Spring Security
* JWT authentication
* Real user accounts
* Real coding submission system
* Online code execution
* Real-time multiplayer battles
* WebSocket-based battles
* Admin dashboard
* Challenge management
* User management
* Email notifications
* Cloud deployment
* Docker support
* API documentation with Swagger
* Unit and integration testing

---

## 🧑‍💻 Future Java Full-Stack Version

```text
                    CODECLASH
                       │
                       ▼
                React Frontend
                       │
                       ▼
               REST API Layer
                       │
                       ▼
              Spring Boot Backend
                       │
             ┌─────────┴─────────┐
             ▼                   ▼
      Spring Security       Spring Data JPA
             │                   │
             ▼                   ▼
            JWT                MySQL
```

---

## 🎯 Project Goals

CodeClash aims to transform traditional coding practice into a more engaging experience by combining:

```text
Coding
   +
Competition
   +
Gamification
   +
Progress Tracking
   +
Achievements
   +
Community
```

---

## 📌 Project Status

### Current Version

**v1.0 — Frontend Prototype**

Implemented:

* React frontend
* User registration
* User login
* Multi-user LocalStorage system
* Dashboard
* Coding challenges
* Coding arena
* XP system
* Level system
* Achievements
* Daily challenge
* Battle arena
* Leaderboard
* Statistics
* Profile
* Settings
* Responsive UI

### Next Version

**v2.0 — Java Full-Stack**

Planned:

```text
React
+
Spring Boot
+
Spring Security
+
JWT
+
MySQL
```

---

## 📄 License

This project is created for learning, portfolio development, and educational purposes.

---

# ⭐ CodeClash

### Code. Battle. Level Up. 🎮
