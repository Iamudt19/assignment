# 🏆 Feedants - Competition Details Screen (Full-Stack Feature)
A full-stack competition detail screen built for **Feedants**. This application features a pixel-accurate, responsive **React Native (TypeScript)** frontend paired with a modular **Node.js / Express.js (MVC)** backend powered by **MongoDB / Mongoose**.
---
## 🌟 Features & Highlights
### 📱 Frontend (React Native + TypeScript)
- **Header & Language Switcher:** Navigation header with interactive language pills (`ENG` / `हिंदी`).
- **Hero Section:** Dynamic title, registration status badge (`Registered`), topic tags, total prize pool (₹1,500), entry fee (₹99), and live spot progress bar (`Only X spots left`, `Y / Z Booked`).
- **Judge Profile Card:** Judge metadata (*Manju Dubey*, 12+ Yrs Kathak Exponent) and Intro Video launcher action.
- **Live Urgency Clock:** Custom React hook (`useCountdown.ts`) driving a real-time registration countdown (`01d : 06h : 28m : 32s`).
- **Milestones Dates Grid:** 4-box key milestone dates grid (Register Before, Submission Starts, Submission Ends, Result Date).
- **Previous Winners Carousel:** Horizontal scrollable cards with winner rank badges & video play overlay.
- **Tabbed Accordion Content:** Interactive 3-tab content section (About, Judging Criteria, Rules) with expandable `View More / View Less` accordion toggle.
- **Rewards Distribution List:** Ranked prize money allocations table (1st to 6th).
- **Informational & Referral Banners:** Disclaimer notice banner, info tiles (prize payouts, refunds, Razorpay), and working clipboard copy referral box.
- **Bottom Sticky Action Bar:** Reactive action bar showing `Register & Pay ₹99` when unregistered, automatically transforming to `Upload Submission` with `✓ You are registered` subtitle upon registration.
- **Persistent Bottom Navigation Bar Mockup:** Standard Feedants navigation bar (Home, Explore, +, Competitions, Profile).
- **Centralized Design System:** Styled using brand tokens defined in `src/theme/theme.ts` (Brand Teal `#007A78`, slate text hierarchy, gold/silver rank badges).
### ⚡ Backend (Node.js + Express + Mongoose)
- **Modular MVC Architecture:** Clean separation of schemas, routes, controllers, and services.
- **Atomic Concurrency Control:** Implements MongoDB `findOneAndUpdate` with `{ $inc: { bookedSpots: 1 } }` conditioned on `{ bookedSpots: { $lt: totalSpots } }` to guarantee zero overbooking under heavy concurrent user registrations when spots reach 20/20.
- **User State Synchronization:** `GET /api/competitions/:id?userId=...` dynamically evaluates user registration records and attaches `isUserRegistered: boolean` to drive client UI states.
- **Offline Mock Fallback:** Graceful fallback mechanism allowing the backend API server to respond with in-memory seed data even when local MongoDB daemon service is offline.
- **Database Seeder (`seed.js`):** Standalone script to populate MongoDB with realistic competition mock data matching the reference design layout.
---
## 🛠️ Technology Stack
| Layer | Technology |
| :--- | :--- |
| **Frontend** | React Native, TypeScript, Expo, React Hooks |
| **Backend** | Node.js, Express.js (MVC) |
| **Database** | MongoDB, Mongoose ORM |
| **Design System** | Custom Centralized Token System (`theme.ts`) |
---
## 📂 Project Structure
c:\Users\iamud\OneDrive\Desktop\Assignment
├── README.md # Documentation ├── .gitignore # Git ignore configuration ├── backend/ # Node.js / Express Backend │ ├── config/ │ │ └── db.js # MongoDB Mongoose connection setup │ ├── models/ │ │ ├── Competition.js # Competition Mongoose Schema │ │ └── Registration.js # User Registration Mongoose Schema │ ├── controllers/ │ │ └── competitionController.js # Controllers & atomic registration logic │ ├── routes/ │ │ └── competitionRoutes.js # Express REST API routes │ ├── seed.js # Seed script matching reference design │ ├── server.js # Express server entry point │ └── package.json └── frontend/ # React Native / Expo Frontend ├── App.tsx # Entry component ├── package.json ├── tsconfig.json # TypeScript configuration └── src/ ├── theme/ │ └── theme.ts # Centralized color palette & typography ├── types/ │ └── index.ts # TypeScript interfaces ├── hooks/ │ └── useCountdown.ts # Custom live countdown timer hook ├── components/ │ ├── Header.tsx # Top header & language toggle │ ├── HeroMetrics.tsx # Title, tags, prize pool, spot progress │ ├── JudgeCard.tsx # Judge avatar & video action │ ├── UrgencyBanner.tsx # Registration countdown banner │ ├── DatesGrid.tsx # 4-box key milestone dates grid │ ├── PreviousWinners.tsx # Horizontal winners carousel │ ├── TabbedContent.tsx # Accordion view more/less tabs │ ├── RewardsList.tsx # Ranked prize money distribution │ ├── InfoAndReferral.tsx # Disclaimer, info tiles & clipboard copy │ ├── StickyFooter.tsx # Dynamic sticky registration CTA │ └── BottomNavBar.tsx # Persistent navigation bar mockup └── screens/ └── CompetitionDetailScreen.tsx # Main screen orchestrator



---
## 🚀 Quick Start & Local Setup
### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (Optional - Backend runs in-memory fallback if MongoDB daemon is not running locally)
---
### 1. Backend Setup & Run
1. Navigate to the backend directory:
   ```bash
   cd backend
Install dependencies:
bash


npm install
(Optional) Seed the database with mock data:
bash


npm run seed
Start the Express API server:
bash


npm start
The backend server will launch at http://localhost:5000.
2. Frontend Setup & Run
Open a new terminal and navigate to the frontend directory:
bash


cd frontend
Install dependencies:
bash


npm install
Start the Expo development server:
bash


npx expo start
Choose your preferred platform preview:
Press w in the terminal to view in Web Browser (http://localhost:8081).
Scan the terminal QR code with the Expo Go app on iOS / Android.
🔌 API Documentation
1. Get Competition Details
Endpoint: GET /api/competitions/:id
Query Parameters: userId (optional)
2. Register for Competition (Atomic Concurrency Endpoint)
Endpoint: POST /api/competitions/:id/register
