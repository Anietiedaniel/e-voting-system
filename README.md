# E-Voting System

A secure and modern electronic voting system built with **React**, **Node.js**, **Express**, and **MongoDB**. This system allows registered voters to vote in multiple elections while ensuring authentication, security, and real-time results.

---

## Features

- ✅ User Roles: **Admin**, **Chairman**, and **Voter**
- ✅ Admin/Chairman can create and manage elections and candidates
- ✅ Voters can cast votes for active elections only
- ✅ Prevents multiple voting per election per user
- ✅ Real-time results display after elections end
- ✅ Responsive UI built with **TailwindCSS**
- ✅ Authentication and secure password storage
- ✅ Voting history for each voter

---

## Tech Stack

- **Frontend:** React, TailwindCSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT & bcrypt
- **Deployment:** Vercel (frontend) + [Your backend host]

---

## Installation

```bash
# Clone the repository
git clone https://github.com/Anietiedaniel/E-voting-system.git

# Frontend
cd frontend
npm install
npm start

# Backend
cd backend
npm install
npm run dev
