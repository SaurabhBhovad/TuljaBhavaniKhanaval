import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="order-success">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <h1>Order Placed Successfully!</h1>
        <p>Your tiffin order has been submitted and is waiting for owner approval.</p>
        <p className="info-text">The owner will review your order and confirm the delivery.</p>
        
        <div className="action-buttons">
          <button onClick={() => navigate('/')} className="btn-primary">
            Back to Home
          </button>
          <button onClick={() => navigate('/profile')} className="btn-secondary">
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
