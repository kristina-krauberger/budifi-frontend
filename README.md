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
│   │   ├── course.api.js
│   │   ├── lesson_progress.api.js
│   │   └── axiosConfig.js
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

The application uses React Context to manage the authenticated user globally.

- `LoggedInUserProvider` wraps the application.
- After login, user data is stored in the context.
- Components can access user data without prop drilling.
- Authentication token is stored in `localStorage`.

This ensures consistent session handling across all protected routes.

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

The frontend communicates with the Flask backend via REST API using Axios.

Key interactions:

- `POST /api/login`
- `POST /api/register`
- `GET /api/me`
- `GET /api/courses`
- `GET /api/user/<id>/progress`
- `PUT /api/user/<id>/progress`

Axios is configured centrally in `axiosConfig.js`.

---
## Media & Assets

**Sound Effects** are licensed under [Pixabay Free License](https://pixabay.com/service/license-summary/):
- Free for commercial use
- No attribution required

All images and audio are either self-made or sourced from royalty-free platforms (Pixabay, Unsplash, etc.).