
# E-Commerce Application

## Overview

This is a full-stack e-commerce application built using the MERN stack (MongoDB, Express, React, Node.js). The application allows users to browse products, add items to a shopping cart, and proceed to checkout. The admin panel allows product management, and the application features user authentication, cart management, and order processing.

### Demo Images
Product Page
![image](https://github.com/user-attachments/assets/822cbd83-80c2-45a2-9747-2eb37a0f0d75)
Cart Page
![image](https://github.com/user-attachments/assets/88cee13f-62b8-42e0-8c59-3a62138f7c10)
Login Page
![image](https://github.com/user-attachments/assets/b3e38b9b-d906-47fd-bdf0-c9766d99eac4)


## Features

- **User Authentication**: Login and registration functionality.
- **Product Management**: Admins can add, edit, and delete products.
- **Shopping Cart**: Users can add products to the cart and view the cart contents.
- **Checkout Process**: Users can enter a shipping address and place orders.

## Tech Stack

- **Frontend**: React, TypeScript, Axios, React Router
- **Backend**: Node.js, Express.js,TypeScript, MongoDB, Mongoose, JWT, Multer
- **Database**: MongoDB
- **Others**: Nodemailer for sending emails

## Project Structure

```
e-com-project/
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # React pages
│   │   ├── utils/           # API service
│   │   ├── App.tsx          # Main App component
│   │   ├── index.tsx        # ReactDOM rendering
│   └── public/              # Static files
│
├── backend/
│   ├── src/
│   │   ├── controllers/     # API request handlers
│   │   ├── middlewares/     # Express middlewares
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # Express routes
│   │   ├── utils/           # Utility functions
│   │   └── server.ts           # Main Express app
│
├── .env                     # Environment variables
├── .gitignore               # Git ignore file
├── package.json             # Node.js dependencies
└── tsconfig.json            # TypeScript configuration
```

## Prerequisites

- Node.js
- MongoDB
- NPM or Yarn
- Nodemailer email account setup (e.g., Gmail with app password)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/sudhanshu7352/e-com-node.git
cd e-com-node
```

### 2. Set Up the Backend

1. Navigate to the `backend` directory.

   ```bash
   cd backend
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory with the following environment variables:

   ```plaintext
   MONGO_URI=MONGO_URI
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```

4. Start the backend server.

   ```bash
   npm start
   ```

   The backend server will be running on `http://localhost:5000`.

### 3. Set Up the Frontend

1. Navigate to the `frontend` directory.

   ```bash
   cd frontend
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Create a `.env` file in the `frontend` directory with the following environment variables:

   ```plaintext
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the frontend development server.

   ```bash
   npm start
   ```

   The frontend application will be running on `http://localhost:3000`.

## Usage

### Running the Application

- **Frontend**: Visit `http://localhost:3000` in your web browser.
- **Backend**: The backend API is available at `http://localhost:5000/api`.

### API Endpoints

- **User Authentication**:
  - `POST /auth/register`: Register a new user.
  - `POST /auth/login`: Authenticate a user and retrieve a JWT.

- **Product Management**:
  - `GET /products`: Get a list of products.
  - `POST /products`: Add a new product (admin only).
  - `PUT /products/:id`: Update a product (admin only).
  - `DELETE /products/:id`: Delete a product (admin only).

- **Cart Management**:
  - `GET /cart`: Retrieve the user's cart.
  - `POST /cart`: Add an item to the cart.
  - `POST /cart/checkout`: Checkout and place an order.

### Frontend Components

- **Navbar**: Contains navigation links and a cart button.
- **ProductList**: Displays the list of products.
- **Cart**: Displays the cart contents and allows users to proceed to checkout.
- **Login**: Handles user login.
- **Register**: Handles user registration.

## Troubleshooting

- **Authentication Issues**: Ensure that the JWT secret and email credentials are correctly set in the `.env` files.
- **MongoDB Connection Issues**: Verify that MongoDB is running and the `MONGO_URI` is correct.
- **Frontend Not Loading**: Check the `.env` file in the frontend for the correct API URL.

