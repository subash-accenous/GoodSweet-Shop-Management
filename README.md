# Sweet Shop Management System

A full-stack web application to manage sweets inventory and allow users to purchase sweets online. Admins can edit, delete, and restock sweets. The project uses React + Vite for the frontend, Node.js + Express for the backend, and MongoDB as the database.

---

## Technologies Used

- Frontend: React, Vite, React Router DOM
- Backend: Node.js, Express, MongoDB, Mongoose
- Authentication: JWT
- Styling: CSS (custom), responsive design
- Deployment: Netlify (frontend)

---

## Features

- User authentication (login & registration)
- View available sweets with categories
- Purchase sweets with quantity selection
- Admin panel:
  - Edit sweet name and price
  - Delete sweets
  - Restock sweets
- Responsive design for mobile and desktop
- Interactive UI with styled buttons, forms, and navbar

---

## Setup Instructions

### Backend

1. Navigate to the backend folder:
->cd Backend
->Install dependencies:
  npm install
->Create .env file (copy .env.example) and set your MongoDB URL:
  db_Url=<your_mongodb_connection_string>
  JWT_SECRET=<your_secret_key>

2.Start the backend server:
   node server.js
   Backend will run at http://localhost:3000

###Frontend
->cd Frontend/sweetsshop-management-system
->npm install
->npm run dev
....Frontend is live now check http://localhost:5173/

##all available sweets ui
![img alt](https://github.com/panathulamanoj/sweet-shop-management-system/blob/master/Screenshot%202025-12-14%20001027.png?raw=true)

