import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import OrderSuccess from './pages/OrderSuccess';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleLogin = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setCart([]);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
  };

  const addToCart = (foodItem) => {
    const existingItem = cart.find(item => item._id === foodItem._id);
    if (existingItem) {
      setCart(cart.map(item =>
        item._id === foodItem._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...foodItem, quantity: 1 }]);
    }
  };

  const removeFromCart = (foodItemId) => {
    setCart(cart.filter(item => item._id !== foodItemId));
  };

  const updateQuantity = (foodItemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(foodItemId);
    } else {
      setCart(cart.map(item =>
        item._id === foodItemId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar token={token} user={user} onLogout={handleLogout} cartCount={cart.length} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} token={token} />} />
            <Route path="/login" element={token ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
            <Route path="/register" element={token ? <Navigate to="/" /> : <Register onLogin={handleLogin} />} />
            <Route path="/profile" element={token ? <Profile token={token} user={user} /> : <Navigate to="/login" />} />
            <Route path="/order-success" element={token ? <OrderSuccess /> : <Navigate to="/login" />} />
            <Route path="/admin" element={token && user?.isAdmin ? <AdminDashboard token={token} /> : <Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
