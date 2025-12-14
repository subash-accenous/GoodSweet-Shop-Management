# 🍬 Sweet Shop Management System

A full-stack web application to manage a sweet shop’s inventory and enable users to purchase sweets online. The system supports user authentication, role-based access (Admin & User), inventory management, and a responsive, interactive UI. This project demonstrates clean full-stack architecture, modern web technologies, and responsible AI-assisted development.

---

## 🚨 IMPORTANT – Accessing the Deployed Application

⚠️ **Backend Cold Start Notice (Render – Free Tier)**
The backend is hosted on **Render**, which may take up to **60 seconds** to start on the first request due to cold start.

### ✅ Steps to Access the Application Properly

1. **First**, open the backend URL:
   👉 [https://sweet-shop-management-system-n6ho.onrender.com/](https://sweet-shop-management-system-n6ho.onrender.com/)

2. Wait until the page displays:
   **“API ready”**

3. **Then**, open the frontend application:
   👉 [https://sweetsshopmanagementsystem.netlify.app/](https://sweetsshopmanagementsystem.netlify.app/)

🔁 After the first startup, the application will work **without delay**.

---

## 📌 Project Description

The **Sweet Shop Management System** is designed to efficiently handle a sweet shop’s inventory, sales, and user interactions. Users can register, log in, browse available sweets, and purchase them online. Administrators can add new sweets, edit prices, delete items, and restock inventory.

The project emphasizes:

* Clean coding practices
* Scalable full-stack architecture
* Test-Driven Development (TDD)
* Responsible and transparent use of AI tools

---

## ✨ Key Features

### 1️⃣ User Authentication & Authorization

* User registration and login
* JWT-based authentication for secure APIs
* Role-based access control:

  * **Admin**: Full inventory management
  * **User**: Browse and purchase sweets

### 2️⃣ Sweet Inventory Management

* Add, update, delete sweets (Admin only)
* Each sweet includes:

  * Unique ID
  * Name
  * Category
  * Price
  * Quantity
* Purchase sweets with quantity selection
* Automatic stock reduction on purchase
* Restock functionality for admins

### 3️⃣ Frontend User Interface

* Modern Single Page Application (SPA)
* Built using **React + Vite**
* Sweet listing with categories
* Interactive UI with forms, buttons, and navbar
* Responsive design for mobile and desktop
* Dedicated Admin Panel for inventory control

### 4️⃣ Test-Driven Development (TDD)

* **Backend Testing**: Jest + Supertest
* **Frontend Testing**: Jest + React Testing Library
* Follows the **Red → Green → Refactor** workflow

### 5️⃣ AI Usage (Transparent & Responsible)

* AI tools (e.g., ChatGPT, GitHub Copilot) used for:

  * Initial scaffolding
  * Boilerplate generation
  * Brainstorming and refactoring ideas
* All AI-generated code was:

  * Manually reviewed
  * Customized
  * Tested and validated
* AI usage documented clearly to maintain transparency

---

## 🛠️ Technologies Used

### Frontend

* React
* Vite
* React Router DOM
* Custom CSS (Responsive Design)

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication

* JSON Web Tokens (JWT)

### Testing

* Jest
* Supertest
* React Testing Library

### Deployment

* **Frontend**: Netlify
* **Backend**: Render

---

## ⚙️ Setup & Installation (Run Locally)

### 📂 Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file and add:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:

   ```bash
   npm run dev
   ```

5. Backend will run at:

   ```
   http://localhost:5000
   ```

---

### 💻 Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm run dev
   ```

4. Open the application at:

   ```
   http://localhost:5173
   ```

---

## 🎯 Objective

The objective of this project is to showcase:

* Full-stack development skills
* Secure authentication and authorization
* Inventory and state management
* Test-Driven Development (TDD)
* Clean, maintainable code
* Responsible AI-assisted development

This project serves as a practical demonstration of building a real-world, production-ready web application.

---

## 📄 License

This project is open-source and available for learning and educational purposes.

---

⭐ If you find this project useful, feel free to star the repository and share your feedback!

