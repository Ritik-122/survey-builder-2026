# 🚀 Survey Builder – Full Stack Web Application

A **production-style Survey Builder platform** inspired by tools like Google Forms and Typeform. Users can create dynamic surveys, publish them via shareable links, collect responses, and view analytics — all built with a clean, functionality-first approach.

This project was built to demonstrate **real-world full-stack engineering skills**, including authentication, API design, database modeling, frontend–backend integration, and scalable architecture.

---

## 🧠 Why This Project?

Most demo projects stop at CRUD. This one goes further:

* Inline editing with auto-save (real SaaS behavior)
* Role-based access (creator vs public user)
* Public sharing without authentication
* Backend validation handling & optimistic UI updates
* Clean, interview-ready architecture

> 📌 Built as part of my 2026 Full-Stack Developer job transition journey.

---

## ✨ Features

### 🔐 Authentication

* User registration & login
* JWT-based authentication
* Protected routes for creators

### 🛠️ Survey Builder (Creator)

* Create surveys
* Inline editable survey title (auto-save)
* Add question types:

  * Text
  * Multiple Choice (MCQ)
  * Rating
* Inline editable questions & MCQ options
* Publish / Unpublish surveys

### 🌍 Public Survey

* Shareable public survey link
* No login required to submit responses
* Dynamic rendering based on survey schema

### 📊 Analytics

* Total response count per survey
* Creator-only analytics access

### 🎨 UI/UX

* Dark, minimal, clean UI
* Functionality-first design
* Responsive layout

---

## 🧱 Tech Stack

### Frontend

* React.js
* Tailwind CSS
* React Router
* Axios (with JWT interceptor)

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication

### Tools & Practices

* RESTful API design
* MVC architecture
* Git & GitHub
* Postman / Thunder Client

---

## 🗂️ Project Structure

```
survey-builder-2026
├── survey-backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   └── server.js
│
├── survey-frontend
│   ├── pages
│   ├── components
│   ├── api
│   └── App.js
│
└── README.md
```

---

## 🔄 Application Flow

1. User signs up / logs in
2. Creates a new survey (default: *Untitled Survey*)
3. Edits survey title inline (auto-saved)
4. Adds questions dynamically
5. Publishes the survey
6. Shares public link
7. Respondents submit answers
8. Creator views analytics

---

## ⚙️ Local Setup

### 1️⃣ Clone Repository

```
git clone https://github.com/<your-username>/survey-builder-2026.git
cd survey-builder-2026
```

### 2️⃣ Backend Setup

```
cd survey-backend
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

Run backend:

```
npm run dev
```

### 3️⃣ Frontend Setup

```
cd ../survey-frontend
npm install
npm start
```

Frontend runs on: `http://localhost:3000`
Backend runs on: `http://localhost:5000`

---

## 🧪 Key Engineering Highlights

* **Inline editing with PATCH APIs**
* **Optimistic UI updates** for smooth UX
* **Mongoose subdocument validation handling**
* **Protected & public API separation**
* **Scalable schema design for dynamic forms**

---

## 📸 Screenshots (Optional)

> Add screenshots of:

* Dashboard
* Survey Builder
* Public Survey
* Analytics

---

## 🚀 Future Enhancements

* Drag & reorder questions
* Delete questions
* Export responses (CSV/Excel)
* Conditional logic (skip questions)
* Charts-based analytics
* Deployment (Vercel + Render)

---

## 👨‍💻 About Me

**Ritik Sharma**
Full-Stack Developer (MERN)

* 🎓 B.Tech in Information Technology (2023)
* 💼 Experience in React, Node.js, APIs, MongoDB
* 🎯 Actively seeking Full-Stack / SDE roles

📧 Email: [bharadwajritik1@gmail.com](mailto:bharadwajritik1@gmail.com)
🔗 LinkedIn: [https://linkedin.com/in/ritiksharma122](https://linkedin.com/in/ritiksharma122)

---

⭐ If you like this project, feel free to star the repo!
