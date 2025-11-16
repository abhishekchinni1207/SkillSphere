
SkillSphere – Online Learning Platform**

A full-stack online learning platform inspired by Udemy, Coursera, and Skillshare, built using React, Node.js, Express, Supabase, and Stripe.
Users can enroll in courses, watch lessons, track progress, take quizzes, and download certificates.

---

Features

Authentication

* Signup & Login with Supabase Auth
* JWT secured sessions
* Role-based (Student / Instructor) ready

Courses System

* Browse courses
* Course details page
* Instructor name, price, description
* Thumbnail image support

Lessons & Video Playback

* Each course contains multiple lessons
* YouTube embedded videos
* Auto-next lesson on completion
* Custom video player with progress tracking

Progress Tracking

* Automatically updates progress after each lesson
* Progress bar for each course
* Completes at 100%

Quiz Module

* Course-wise quizzes
* Auto scoring
* Pass/fail logic

Certificate Generation

* Auto-issue on course completion
* User can enter name
* Confetti celebration
* Downloadable PDF certificate

Payments (Stripe)

* One-time payments using Stripe Checkout
* Test-mode supported
* Pending → Paid update via webhook
* Enrollments stored in Supabase

Admin / Instructor Ready

* API ready for course creation
* Add lessons via backend
* Add quizzes per course

UI & UX

* Tailwind CSS
* Modern color theme (pink, blue, yellow, white)
* Fully responsive
* Professional navbar + footer

---

Tech Stack

Frontend

* React + Vite
* React Router
* Axios
* Tailwind CSS

Backend

* Node.js
* Express.js
* Supabase (DB + Auth + Storage)
* Stripe Payments

Database (Supabase Tables)

* `profiles`
* `courses`
* `lessons`
* `quizzes`
* `progress`
* `enrollments`
* `certificates`

---

# 📂 **Project Structure**

```
online-learning-platform/
│
├── backend/
│   ├── server.js
│   ├── config/supabaseClient.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── StripeButton.jsx
    │   │   ├── CourseCard.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   └── ProgressBar.jsx
    │   │
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Courses.jsx
    │   │   ├── CourseDetails.jsx
    │   │   ├── CoursePlayer.jsx
    │   │   ├── QuizPage.jsx
    │   │   ├── MyCourses.jsx
    │   │   ├── Certificate.jsx
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   ├── Instructors.jsx
    │   │   └── About.jsx
    │   │
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── index.css
    │   └── App.css
    │
    ├── package.json
    └── vite.config.js
```

---

Backend Setup

Install dependencies

```
cd backend
npm install
```

Add your `.env`

```
SUPABASE_URL=your_url
SUPABASE_KEY=public_key
SUPABASE_SERVICE_ROLE=service_key
STRIPE_SECRET_KEY=sk_test_xxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxx
FRONTEND_URL=http://localhost:5173
```

Run backend

```
npm start
```

---

Frontend Setup

Install dependencies

```
cd frontend
npm install
```

Run frontend

```
npm run dev
```
---

Testing Stripe Webhook**

Run:

```
stripe listen --forward-to localhost:5000/stripe/webhook
```

Simulate payment:

```
stripe trigger checkout.session.completed
```
---
Deployment

Frontend

Deploy on Vercel

Backend

Deploy on Render

Database

Supabase is already hosted automatically.


Author

SkillSphere – Learning Platform**
Built with ❤️ by Abhishek

