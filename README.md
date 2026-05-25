# आई तुळजाभवानी खानावळ - Tiffin Service Web Application

## Overview
A responsive MERN stack web application for **आई तुळजाभवानी खानावळ** tiffin service. This platform allows users to order tiffin meals online while giving complete control to the owner for managing food items, prices, and delivery approvals.

## Features

### User Features
- Browse menu without login
- User registration and login
- Request tiffin service with location details
- Track order status
- Responsive design for mobile and desktop

### Admin Features
- Dashboard for managing orders
- Add/Edit/Delete food items
- Update food prices
- Approve or reject tiffin delivery requests
- View customer details and locations
- Daily menu management

## Daily Menu

### Morning (9 AM - 12 PM)
- Shira
- Pohe
- Misal Pav

### Afternoon (12 PM - 5 PM)
- Veg Maharashtrian Thali
- Non-Veg Maharashtrian Thali

### Evening (5 PM - 9 PM)
- Veg Maharashtrian Thali
- Non-Veg Maharashtrian Thali

### Night (9 PM - 12 AM)
- Veg Maharashtrian Thali
- Non-Veg Maharashtrian Thali

## Hotel Timing
**9 AM - 12 AM (Midnight)**

## Tech Stack

- **Frontend**: React.js, React Router, Axios, Responsive CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Setup

1. Clone the repository
```bash
git clone https://github.com/SaurabhBhovad/TuljaBhavaniKhanaval.git
cd TuljaBhavaniKhanaval
```

2. Install dependencies
```bash
npm install
cd client && npm install && cd ..
```

3. Create .env file
```bash
cp .env.example .env
```

4. Update .env with your MongoDB URI and JWT secret

5. Start the application
```bash
npm run dev
```

The application will run on:
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

## Project Structure
```
TuljaBhavaniKhanaval/
├── server.js
├── .env.example
├── package.json
├── routes/
│   ├── auth.js
│   ├── foodItems.js
│   └── orders.js
├── models/
│   ├── User.js
│   ├── FoodItem.js
│   └── Order.js
├── middleware/
│   └── auth.js
├── controllers/
│   ├── authController.js
│   ├── foodController.js
│   └── orderController.js
└── client/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login
- GET `/api/auth/profile` - Get user profile (protected)

### Food Items
- GET `/api/food-items` - Get all food items
- GET `/api/food-items/:id` - Get food item details
- POST `/api/food-items` - Create food item (admin only)
- PUT `/api/food-items/:id` - Update food item (admin only)
- DELETE `/api/food-items/:id` - Delete food item (admin only)

### Orders
- POST `/api/orders` - Create tiffin order (user)
- GET `/api/orders` - Get all orders (admin)
- GET `/api/orders/:id` - Get order details
- PUT `/api/orders/:id/status` - Update order status (admin)

## Contributing
Contributions are welcome! Please create a pull request with your changes.

## License
ISC
