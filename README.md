# Ecommerce-platform

Stripe Checkout with MERN Stack
📌 Project Overview

This project is a simple e-commerce checkout application built using the MERN Stack that allows users to browse products, add them to a cart, and complete payments using Stripe Checkout.
The application demonstrates end-to-end payment flow, order tracking, and webhook-based status updates.


🛠️ Tech Stack

Frontend: React.js
Backend: Node.js, Express.js
Database: MongoDB
Payments: Stripe API
Version Control: Git & GitHub


⚙️ Environment Variables

I have included .env file as mentioned in the task although its shared 

PORT=5000
MONGO_URI=mongodb+srv://satyam_db_user:taskmanager123@cluster0.ae7h9wo.mongodb.net/taskmanager?appName=Cluster0
STRIPE_SECRET_KEY=sk_test_51S3BUzIhv7xmcWu7oTbJLxwz6mic2bikupTf78ngJQ0EldbJcZ6pUIY7Y7s27nZ3IVgmSBbfZqAHi7o6diX7aNAo00dAma7uPs
STRIPE_PUBLISHABLE_KEY=pk_test_51S3BUzIhv7xmcWu7Pw0Uo9uhHrFwTgCUB3O1zyedKjHem2ivZNN0G06GD1Geob60AzBpTuHiizmP4HBXGBT8r0wG00lFMPHXL4
CLIENT_URL=http://localhost:5173

▶️ How to Run the Project

1️⃣ Clone the Repository
https://github.com/satyamcode-ai/Ecommerce-Platform

2️⃣ Backend Setup
cd backend
npm install
npm run dev

3️⃣ Frontend Setup
cd frontend
npm install
npm start

🧪 Payment Flow Example

User selects products
Adds items to cart
Enters email address
Clicks Proceed to Checkout
Redirected to Stripe Checkout
Payment completed

User redirected to:

✅ Payment Success page
❌ Payment Failed page

Order saved in database

📄 Documentation & Deliverables

Complete source code in a single GitHub repository
Proper separation of frontend and backend
README file with setup instructions
.env example file

Video demonstration with voice narration (as required)

✅ Status

✔ Application runs successfully
✔ Stripe payments integrated
✔ Orders tracked in database

🙌 Acknowledgment

This project is created as part of a checkout and payment integration assignment using Stripe in Node.js with MERN Stack.
