import React, { useState, useEffect } from 'react';
import { foodAPI } from '../services/authService';
import './Menu.css';

const Menu = ({ addToCart }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFoodItems();
  }, [selectedCategory]);

  const fetchFoodItems = async () => {
    try {
      setLoading(true);
      const filters = {};
      if (selectedCategory) filters.category = selectedCategory;
      filters.isAvailable = 'true';
      
      const response = await foodAPI.getAllFoodItems(filters);
      setFoodItems(response.data.foodItems);
      setError(null);
    } catch (err) {
      setError('Failed to load menu');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Morning', 'Afternoon', 'Evening', 'Night'];

  return (
    <div className="menu">
      <h1>Our Menu</h1>
      
      <div className="category-filters">
        <button 
          className={`category-btn ${selectedCategory === '' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('')}
        >
          All Items
        </button>
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {loading && <p className="loading">Loading menu...</p>}
      {error && <p className="error">{error}</p>}

      <div className="food-grid">
        {foodItems.length > 0 ? (
          foodItems.map(item => (
            <div key={item._id} className="food-card">
              {item.image && <img src={item.image} alt={item.name} className="food-image" />}
              <div className="food-info">
                <h3>{item.name}</h3>
                <p className="food-category">{item.category} - {item.type}</p>
                {item.description && <p className="food-description">{item.description}</p>}
                <div className="food-footer">
                  <span className="price">₹{item.price}</span>
                  <button 
                    onClick={() => addToCart(item)}
                    className="add-to-cart-btn"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading && <p className="no-items">No items available</p>
        )}
      </div>
    </div>
  );
};

export default Menu;
