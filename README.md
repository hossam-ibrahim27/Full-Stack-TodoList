# 📝 Full Stack Todo List

A **full-stack Todo List Application** built with **React (TypeScript)** that provides secure authentication, pagination, and full CRUD operations on tasks.  
The backend is powered by **Strapi REST API**, with modern tools like **React Query, TailwindCSS, react-hook-form, and Faker.js**.  

---

## 🚀 Tech Stack  

- **Frontend:** React (TypeScript), TailwindCSS, React Query, react-hook-form  
- **Backend:** Strapi (REST API)  
- **Development Helper:** Faker.js (for generating mock todos during development)  

---

## ✨ Features  

- 🔑 **Authentication**  
  - User registration & login system with validation using `react-hook-form`.  
  - Protected routes: only authenticated users can access todos.  

- 📌 **CRUD Operations**  
  - Add, edit, delete, and view todos.  
  - Fully synced with **Strapi REST API**.  

- 📑 **Pagination**  
  - Todos are displayed with **server-side pagination** for better performance and scalability.  
  - Ensures smooth navigation even with large datasets.  

- ⚡ **State Management**  
  - Efficient API fetching, caching, and synchronization with **React Query**.  

- 🎨 **UI/UX**  
  - Clean, modern, and responsive design powered by **TailwindCSS**.  

- 🧪 **Mock Data (Development Only)**  
  - **Faker.js** was used during **development** to generate sample todos.  
  - This helped simulate real-world data for CRUD operations & pagination.  
  - ⚠️ Not used for testing.  

---

## 📂 Pages  

- **Login Page** → Authenticate existing users.  
- **Register Page** → Create new user accounts.  
- **Home Page** → Overview of the app & authentication status.  
- **Todos Page** → Manage todos (Create, Read, Update, Delete) with **pagination**.  

---

## 🔒 Authentication Flow  

1. User registers or logs in.  
2. An **authentication token** is stored securely.  
3. Access to the **Todos Page** is restricted to authenticated users only.  
4. Unauthorized users are redirected to the **Login Page**.  

---

## 🎯 Outcome  

This project demonstrates a **scalable and maintainable full-stack application** built with **React + TypeScript**, featuring:  

- Secure authentication flow.  
- CRUD operations integrated with a backend API.  
- **Pagination** for efficient task management.  
- Mock todos generated during development with **Faker.js**.  
- Optimized API handling with **React Query**.  
- Professional UI built with **TailwindCSS**.

---
## 🎯 Demo

- View In Varcel: https://front-full-stack-todo.vercel.app/
- View In Netlify : https://full-stack-zonetodo.netlify.app/
