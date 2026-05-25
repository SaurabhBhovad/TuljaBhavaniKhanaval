import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="hero">
        <div className="hero-content">
          <h1>आई तुळजाभवानी खानावळ</h1>
          <p>Authentic Maharashtrian Tiffin Service</p>
          <p className="hero-subtitle">Fresh, Delicious, and Delivered to Your Door</p>
          <button onClick={() => navigate('/menu')} className="cta-button">
            Order Now
          </button>
        </div>
      </div>

      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🍽️ Authentic Recipes</h3>
            <p>Traditional Maharashtrian recipes prepared with love</p>
          </div>
          <div className="feature-card">
            <h3>🚚 Quick Delivery</h3>
            <p>Fast and reliable tiffin delivery service</p>
          </div>
          <div className="feature-card">
            <h3>✨ Fresh Ingredients</h3>
            <p>Only the freshest ingredients used daily</p>
          </div>
          <div className="feature-card">
            <h3>🕐 Extended Hours</h3>
            <p>Open from 9 AM to 12 AM for your convenience</p>
          </div>
        </div>
      </section>

      <section className="menu-preview">
        <h2>Daily Menu Highlights</h2>
        <div className="menu-times">
          <div className="time-slot">
            <h3>Morning (9 AM - 12 PM)</h3>
            <ul>
              <li>Shira</li>
              <li>Pohe</li>
              <li>Misal Pav</li>
            </ul>
          </div>
          <div className="time-slot">
            <h3>Afternoon & Evening</h3>
            <ul>
              <li>Veg Maharashtrian Thali</li>
              <li>Non-Veg Maharashtrian Thali</li>
            </ul>
          </div>
          <div className="time-slot">
            <h3>Night (9 PM - 12 AM)</h3>
            <ul>
              <li>Veg Maharashtrian Thali</li>
              <li>Non-Veg Maharashtrian Thali</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
