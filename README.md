# E-commerce Platform
<img src="./frontend/public/logo.jpg" height="40px">
By, Subhadip Maity

## Description
This is an **e-commerce platform** built with the **MERN stack** (MongoDB, Express, React, Node.js). The platform includes features such as **cart management** and **order placement**, aiming to provide a basic framework for building an **online shopping application**.

## Table of Contents
- [Installation](#installation)
- [Setup Environment Variables](#setup-environment-variables)
- [Running the Application](#running-the-application)
- [Images](#images)
- [Usage](#usage)
- [Features](#features)
- [Future Updates](#future-updates)
- [Technologies Used](#technologies-used)
- [Contact](#contact)

## Installation
To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/SontuCoder/E-commerce-Platform.git
   ```
2. Navigate to the project directory:
   ```bash
   cd E-commerce-Platform
   ```
3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
4. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

## Setup Environment Variables
Create a `.env` file in the **backend** directory and add the following variables:

```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

## Running the Application
Start the backend server:
```bash
cd backend
nodemon start
```

Start the frontend development server:
```bash
cd frontend
cd src
npm run start
```

Open your browser and go to:
```bash
http://localhost:3000
```
to view the application.

## Images

- 1. Login Page
<img src="./frontend/public/Macbook-Air-localhost (1).png" height="350px">

- 2. Home Page
<img src="./frontend/public/Screenshot 2025-03-06 212012.png" height="350px">


## Usage
- Create an account or log in using existing credentials.
- Browse through the product catalog.
- Add items to the cart.
- Place orders with the desired products.
- Admin can View and manage your orders from the user dashboard.

## Features
- User authentication and authorization (Login/Register)
- Add items to the cart and place orders
- View and manage orders

## Future Updates
- Create an **admin panel** to view and manage orders.
- Implement a **car booking page**.
- Add product management functionality in the admin panel.
- Migrate product data from JSON format to **MongoDB Cloud Database**.
- Enhance the **UI/UX** of the application.
- Integrate **online payment** functionalities.

## Technologies Used
- MongoDB
- Express.js
- React.js
- Node.js
- Tailwind CSS
- JWT Authentication

## Contact
- Email: [subhadipmaity792@gmail.com](mailto:subhadipmaity792@gmail.com)
- GitHub: [SontuCoder](https://github.com/SontuCoder)

