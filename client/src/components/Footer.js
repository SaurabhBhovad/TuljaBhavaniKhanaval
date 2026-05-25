import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>आई तुळजाभवानी खानावळ</h3>
          <p>Fresh and authentic Maharashtrian tiffin service</p>
        </div>
        <div className="footer-section">
          <h4>Hours</h4>
          <p>9:00 AM - 12:00 AM</p>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: info@tuljabhavani.com</p>
          <p>Phone: +91-XXXXXXXXXX</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 आई तुळजाभवानी खानावळ. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
