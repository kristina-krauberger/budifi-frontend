# Buddy.Fi Frontend

This is the **frontend** for *Buddy.Fi* – a microlearning finance app inspired by Duolingo, designed to make learning about ETFs, investing, and financial literacy fun and interactive.

The app guides users through short lessons, embedded videos, quizzes, and summaries – all presented in a clean and motivating user interface.

This frontend is built with **React**, **Vite**, and **Tailwind CSS**, and communicates with a **Flask-based backend** via REST API.


## Features

- Responsive and clean user interface with Tailwind CSS
- Smooth navigation through React Router
- Video-based learning for each lesson
- Interactive quiz with feedback after each lesson
- Final summary screen to reinforce key concepts
- Audio feedback using sound effects (Pixabay)

---

## Dynamic Learning Experience

Courses and lessons are dynamically rendered from backend data fetched via REST API.

Features include:

- Course metadata (title, description, order)
- Associated lessons
- User-specific completion tracking
- Dynamic routing via `/course/:courseId`
- Persistent learning progress

This architecture allows new courses and lessons to be added through the backend without requiring frontend changes.

---

## Tech Stack

- React 18
- Vite
- React Router
- Axios
- Tailwind CSS
- Context API (for global user state management)
- Deployed via Vercel

---

## Project Structure

<pre>
budifi-frontend/
│
├── public/
│
├── src/
│   ├── api/                    # API communication layer
│   │   ├── auth.api.js 
│   │   └── axiosConfig.js
│   │   ├── course.api.js
│   │   ├── lesson_progress.api.js
│   │   └── moneyCompass.api.js
│   │
│   ├── assets/                 # Images & media files
│   │   ├── logo.png
│   │   └── hero1.png
│   │
│   ├── components/             # Reusable UI components
│   │   ├── CourseCard/
│   │   ├── LessonCard/
│   │   ├── ButtonAnswer/
│   │   ├── LessonNavbar/
│   │   └── …
│   │
│   ├── context/                # Global state management
│   │   ├── LoggedInUserContext.jsx
│   │   └── LoggedInUserProvider.jsx
│   │
│   ├── layouts/                # Public & Private layout structure
│   │   ├── PublicLayout.jsx
│   │   └── PrivateLayout.jsx
│   │
│   ├── pages/                  # Main route components
│   │   ├── LandingPage/
│   │   ├── Login/
│   │   ├── RegisterUser/
│   │   ├── Dashboard/
│   │   ├── Course/
│   │   └── Lesson/
│   │   └── …  
│   │
│   ├── App.jsx                 # Main routing configuration
│   └── main.jsx                # Entry point
│
├── index.html
├── package.json
└── README.md
</pre>

---

## State Management

The application uses React Context for global user state management and local component state for lesson-specific logic.

Key concepts:

- React Context API for authenticated user data
- localStorage for session persistence
- Local component state for lesson flow and UI interactions
- Centralized Axios configuration
- Clean separation between UI and API communication

This architecture improves scalability and avoids excessive prop drilling.

---

## Routing & Navigation

The app uses React Router with a structured layout approach:

- Public routes (Landing, Login, Register)
- Private routes (Dashboard, Course, Lesson)
- Protected access via `PrivateLayout`
- Dynamic route parameters (`:courseId`, `:lessonId`)
- Nested routes inside Lesson (`video`, `quiz`, `summary`)

Navigation logic ensures a smooth learning experience:
- Automatic transition from video → quiz → summary
- Intelligent next lesson logic
- Seamless flow similar to Duolingo-style microlearning

---

## API Communication

The frontend communicates with multiple backend services via Axios.

### Buddy.Fi Backend

- POST `/api/login`
- POST `/api/register`
- GET `/api/me`
- GET `/api/courses`
- GET `/api/user/<id>/progress`
- PUT `/api/user/<id>/progress`

### Money Compass API

- POST `/api/ai-coach`
- GET `/api/ai-coach/welcome`

The AI service is consumed through a dedicated API layer and rendered as part of the Buddy.Fi learning experience.

Axios is configured centrally through reusable API service modules.

---

## Deployment

Frontend:
https://buddyfi-2.vercel.app/

---

## Local Development

```bash
npm install
npm run dev
```

The application runs locally at:

```text
http://localhost:5173
```

Required services:

- Buddy.Fi Backend API
- Money Compass API

Both services must be running locally or deployed for full functionality.

---

## Media & Assets

**Sound Effects** are licensed under [Pixabay Free License](https://pixabay.com/service/license-summary/):
- Free for commercial use
- No attribution required

All images and audio are either self-made or sourced from royalty-free platforms (Pixabay, Unsplash, etc.).
