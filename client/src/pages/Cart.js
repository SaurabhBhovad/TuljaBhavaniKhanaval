import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderAPI } from '../services/authService';
import './Cart.css';

const Cart = ({ cart, removeFromCart, updateQuantity, token }) => {
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('09:00');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = async (e) => {
    e.preventDefault();
    
    if (!token) {
      navigate('/login');
      return;
    }

    if (!deliveryAddress || !deliveryDate || !deliveryTime) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const orderData = {
        foodItems: cart.map(item => ({
          foodItem: item._id,
          quantity: item.quantity
        })),
        deliveryAddress,
        deliveryDate,
        deliveryTime,
        notes
      };

      await orderAPI.createOrder(orderData);
      navigate('/order-success');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <p>Start by adding items from our menu</p>
        <button onClick={() => navigate('/menu')} className="cta-button">
          Go to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      
      <div className="cart-content">
        <div className="cart-items">
          <h2>Order Summary</h2>
          {cart.map(item => (
            <div key={item._id} className="cart-item">
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-category">{item.category} - {item.type}</p>
                <p className="item-price">₹{item.price}</p>
              </div>
              
              <div className="item-quantity">
                <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
              </div>
              
              <div className="item-total">₹{item.price * item.quantity}</div>
              
              <button 
                className="remove-btn"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
            </div>
          ))}
          
          <div className="cart-total">
            <h3>Total: ₹{totalPrice}</h3>
          </div>
        </div>

        <div className="checkout-form">
          <h2>Delivery Details</h2>
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleCheckout}>
            <div className="form-group">
              <label>Delivery Address *</label>
              <textarea
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Enter your full delivery address"
                required
              />
            </div>

            <div className="form-group">
              <label>Delivery Date *</label>
              <input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Delivery Time *</label>
              <input
                type="time"
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Special Instructions</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special requests? (optional)"
              />
            </div>

            <button type="submit" disabled={loading} className="checkout-btn">
              {loading ? 'Placing Order...' : `Place Order (₹${totalPrice})`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cart;
