# TuljaBhavaniKhanaval - Installation & Setup Guide

## Prerequisites

Make sure you have the following installed on your system:
- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (local or MongoDB Atlas cloud)
- **Git**

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/SaurabhBhovad/TuljaBhavaniKhanaval.git
cd TuljaBhavaniKhanaval
```

### 2. Install Backend Dependencies

```bash
npm install
```

### 3. Install Frontend Dependencies

```bash
cd client
npm install
cd ..
```

### 4. Setup Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
cp .env.example .env
```

Edit the `.env` file and update with your configuration:

```
MONGODB_URI=mongodb://localhost:27017/tuljabhavani
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secure_secret_key_here
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

### 5. Start MongoDB

If using local MongoDB:
```bash
mongod
```

Or update `MONGODB_URI` in `.env` to use MongoDB Atlas:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tuljabhavani
```

### 6. Run the Application

From the root directory, run both backend and frontend concurrently:

```bash
npm run dev
```

Or run them separately in different terminals:

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

## Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## Creating Admin Account

1. Register a new user account
2. Update the user in MongoDB to set `isAdmin: true`:

```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { isAdmin: true } }
)
```

Or manually in your MongoDB client, find the user and set `isAdmin` to `true`.

## Project Structure

```
TuljaBhavaniKhanaval/
├── server.js                 # Express server entry point
├── package.json             # Backend dependencies
├── .env.example            # Environment variables template
├── models/                 # MongoDB schemas
│   ├── User.js            # User schema with auth
│   ├── FoodItem.js        # Food item schema
│   └── Order.js           # Order schema
├── controllers/           # Business logic
│   ├── authController.js
│   ├── foodController.js
│   └── orderController.js
├── routes/               # API routes
│   ├── auth.js
│   ├── foodItems.js
│   └── orders.js
├── middleware/          # Custom middleware
│   └── auth.js         # JWT authentication
├── client/              # React frontend
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js
│       ├── components/
│       │   ├── Navbar.js
│       │   └── Footer.js
│       ├── pages/
│       │   ├── Home.js
│       │   ├── Menu.js
│       │   ├── Cart.js
│       │   ├── Login.js
│       │   ├── Register.js
│       │   ├── Profile.js
│       │   ├── AdminDashboard.js
│       │   └── OrderSuccess.js
│       ├── services/
│       │   ├── api.js
│       │   └── authService.js
│       └── styles/ (CSS files)
```

## Features

### User Features
- ✅ Browse menu without login
- ✅ User registration and authentication
- ✅ Add items to cart
- ✅ Place tiffin orders with delivery details
- ✅ View order status
- ✅ Manage profile and delivery address

### Admin Features
- ✅ View all pending orders
- ✅ Approve or reject orders
- ✅ Mark orders as delivered
- ✅ Add new food items
- ✅ Edit food prices
- ✅ Delete food items
- ✅ Filter orders by status

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Food Items
- `GET /api/food-items` - Get all food items
- `GET /api/food-items/:id` - Get food item details
- `POST /api/food-items` - Create food item (admin)
- `PUT /api/food-items/:id` - Update food item (admin)
- `DELETE /api/food-items/:id` - Delete food item (admin)

### Orders
- `POST /api/orders` - Create order (user)
- `GET /api/orders/my-orders` - Get user's orders
- `GET /api/orders` - Get all orders (admin)
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update order status (admin)

## Technologies Used

- **Frontend**: React.js, React Router, Axios, CSS3
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env` file
- Verify MongoDB credentials if using Atlas

### Port Already in Use
- Change `PORT` in `.env` file
- Or kill the process: `lsof -ti:5000 | xargs kill -9` (Linux/Mac)

### CORS Error
- Update `CORS` settings in `server.js` if frontend URL is different

## Development Notes

- JWT tokens are stored in localStorage
- Cart is stored in localStorage and persists on refresh
- All API requests include JWT token in Authorization header
- Admin access is controlled by `isAdmin` flag on user

## Future Enhancements

- [ ] Payment integration (Razorpay/Stripe)
- [ ] Email notifications for orders
- [ ] SMS updates for order status
- [ ] Real-time order tracking
- [ ] Customer reviews and ratings
- [ ] Subscription plans
- [ ] Advanced analytics dashboard

## Support

For issues or questions, please create an issue in the GitHub repository.

## License

ISC
