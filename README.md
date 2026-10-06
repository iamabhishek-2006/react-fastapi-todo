# 🚀 Taskify - Full-Stack Secure Todo Application

A modern, lightning-fast Full-Stack Todo application built with **React (TypeScript)** on the frontend and **FastAPI (SQLModel + PostgreSQL)** on the backend. It features secure JWT-based authentication, password hashing with Argon2, and a sleek UI styled with Tailwind CSS and SCSS.

---

## 🛠️ Tech Stack

### **Frontend (`/client`)**
* **Framework:** React 19 (Vite + TypeScript)
* **Styling:** Tailwind CSS v4 & Custom SCSS
* **Routing:** React Router DOM
* **Icons:** Lucide React
* **Utilities:** UUID

### **Backend (`/server`)**
* **Framework:** FastAPI (Python)
* **ORM:** SQLModel
* **Database:** PostgreSQL (`psycopg`)
* **Authentication:** PyJWT (JSON Web Tokens)
* **Security:** `pwdlib` (Argon2 Password Hashing)
* **Package Manager:** `uv`

---

## ✨ Features

* 🔐 **Secure Authentication:** User signup and login with JWT tokens and hashed passwords.
* 📝 **CRUD Operations:** Create, read, update, delete, and duplicate tasks seamlessly.
* 🎨 **Modern UI/UX:** Clean design styled using Tailwind CSS and SCSS with loading spinners and interactive components.
* ⚡ **Type-Safe:** Built completely with TypeScript on the frontend and strict Pydantic/SQLModel types on the backend.
* 🛡️ **Protected Routes:** Unauthorized users cannot access or modify todos without valid authentication headers.

---

## 📁 Project Structure

```text
todos/
├── client/              # React + TypeScript Frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # Auth & Todo Context
│   │   ├── hooks/       # Custom React Hooks
│   │   ├── pages/       # Main Pages (Todos, Login, etc.)
│   │   └── styles/      # SCSS stylesheets
│   └── package.json
│
└── server/              # FastAPI Python Backend
    ├── server/
    │   ├── main.py      # FastAPI entry point
    │   ├── auth.py      # Authentication routes & JWT logic
    │   └── user.py      # User models & database schemas
    └── pyproject.toml
