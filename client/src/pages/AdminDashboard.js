import React, { useState, useEffect } from 'react';
import { foodAPI, orderAPI } from '../services/authService';
import './AdminDashboard.css';

const AdminDashboard = ({ token }) => {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [filter, setFilter] = useState('Pending');

  // Food item form states
  const [newFoodItem, setNewFoodItem] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Morning',
    type: 'Veg'
  });

  // Order status form
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    if (activeTab === 'orders') {
      fetchOrders();
    } else if (activeTab === 'food') {
      fetchFoodItems();
    }
  }, [activeTab, filter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getAllOrders({ status: filter !== 'All' ? filter : '' });
      setOrders(response.data.orders);
      setError(null);
    } catch (err) {
      setError('Failed to load orders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFoodItems = async () => {
    try {
      setLoading(true);
      const response = await foodAPI.getAllFoodItems();
      setFoodItems(response.data.foodItems);
      setError(null);
    } catch (err) {
      setError('Failed to load food items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFoodItem = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await foodAPI.createFoodItem(newFoodItem);
      setSuccess('Food item added successfully!');
      setNewFoodItem({
        name: '',
        description: '',
        price: '',
        category: 'Morning',
        type: 'Veg'
      });
      setTimeout(() => setSuccess(null), 3000);
      fetchFoodItems();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add food item');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFoodItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        setLoading(true);
        await foodAPI.deleteFoodItem(id);
        setSuccess('Food item deleted successfully!');
        setTimeout(() => setSuccess(null), 3000);
        fetchFoodItems();
      } catch (err) {
        setError('Failed to delete food item');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      setLoading(true);
      setError(null);
      const statusData = { status };
      if (status === 'Rejected') {
        statusData.rejectionReason = rejectionReason;
      }
      await orderAPI.updateOrderStatus(orderId, statusData);
      setSuccess(`Order ${status.toLowerCase()} successfully!`);
      setSelectedOrder(null);
      setRejectionReason('');
      setTimeout(() => setSuccess(null), 3000);
      fetchOrders();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          📋 Orders
        </button>
        <button 
          className={`tab-btn ${activeTab === 'food' ? 'active' : ''}`}
          onClick={() => setActiveTab('food')}
        >
          🍽️ Menu
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="admin-section">
          <h2>Tiffin Orders</h2>
          
          <div className="filter-buttons">
            {['All', 'Pending', 'Approved', 'Rejected', 'Delivered'].map(status => (
              <button
                key={status}
                className={`filter-btn ${filter === status ? 'active' : ''}`}
                onClick={() => setFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>

          {loading && <p className="loading">Loading orders...</p>}

          <div className="orders-container">
            {orders.length > 0 ? (
              orders.map(order => (
                <div key={order._id} className="order-card">
                  <div className="order-header">
                    <h3>Order #{order._id.slice(-8)}</h3>
                    <span className={`status-badge status-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="order-details">
                    <p><strong>Customer:</strong> {order.user.name}</p>
                    <p><strong>Email:</strong> {order.user.email}</p>
                    <p><strong>Phone:</strong> {order.user.phone}</p>
                    <p><strong>Address:</strong> {order.deliveryAddress}</p>
                    <p><strong>Delivery Date:</strong> {new Date(order.deliveryDate).toLocaleDateString()}</p>
                    <p><strong>Delivery Time:</strong> {order.deliveryTime}</p>
                  </div>

                  <div className="order-items">
                    <h4>Items:</h4>
                    <ul>
                      {order.foodItems.map((item, idx) => (
                        <li key={idx}>
                          {item.foodItem.name} × {item.quantity} = ₹{item.price * item.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="order-total">
                    <strong>Total: ₹{order.totalPrice}</strong>
                  </div>

                  {order.notes && (
                    <div className="order-notes">
                      <strong>Notes:</strong> {order.notes}
                    </div>
                  )}

                  {order.status === 'Pending' && (
                    <div className="order-actions">
                      <button
                        className="approve-btn"
                        onClick={() => handleUpdateOrderStatus(order._id, 'Approved')}
                        disabled={loading}
                      >
                        ✓ Approve
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => setSelectedOrder(order._id)}
                      >
                        ✕ Reject
                      </button>
                    </div>
                  )}

                  {order.status === 'Approved' && (
                    <div className="order-actions">
                      <button
                        className="deliver-btn"
                        onClick={() => handleUpdateOrderStatus(order._id, 'Delivered')}
                        disabled={loading}
                      >
                        📦 Mark as Delivered
                      </button>
                    </div>
                  )}

                  {order.rejectionReason && (
                    <div className="rejection-reason">
                      <strong>Rejection Reason:</strong> {order.rejectionReason}
                    </div>
                  )}
                </div>
              ))
            ) : (
              !loading && <p className="no-items">No orders found</p>
            )}
          </div>
        </div>
      )}

      {/* Food Items Tab */}
      {activeTab === 'food' && (
        <div className="admin-section">
          <h2>Manage Menu</h2>

          <div className="food-management">
            <div className="add-food-form">
              <h3>Add New Food Item</h3>
              {loading && <p className="loading">Processing...</p>}
              
              <form onSubmit={handleAddFoodItem}>
                <div className="form-group">
                  <label>Food Name *</label>
                  <input
                    type="text"
                    value={newFoodItem.name}
                    onChange={(e) => setNewFoodItem({ ...newFoodItem, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={newFoodItem.description}
                    onChange={(e) => setNewFoodItem({ ...newFoodItem, description: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Price (₹) *</label>
                  <input
                    type="number"
                    value={newFoodItem.price}
                    onChange={(e) => setNewFoodItem({ ...newFoodItem, price: e.target.value })}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Category *</label>
                    <select
                      value={newFoodItem.category}
                      onChange={(e) => setNewFoodItem({ ...newFoodItem, category: e.target.value })}
                    >
                      <option>Morning</option>
                      <option>Afternoon</option>
                      <option>Evening</option>
                      <option>Night</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Type *</label>
                    <select
                      value={newFoodItem.type}
                      onChange={(e) => setNewFoodItem({ ...newFoodItem, type: e.target.value })}
                    >
                      <option>Veg</option>
                      <option>Non-Veg</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="submit-btn">+ Add Food Item</button>
              </form>
            </div>

            <div className="food-list">
              <h3>Current Menu Items</h3>
              {loading && <p className="loading">Loading...</p>}
              
              <div className="food-items-grid">
                {foodItems.length > 0 ? (
                  foodItems.map(item => (
                    <div key={item._id} className="food-item-card">
                      <div className="food-header">
                        <h4>{item.name}</h4>
                        <span className={`availability ${item.isAvailable ? 'available' : 'unavailable'}`}>
                          {item.isAvailable ? '✓ Available' : '✗ Unavailable'}
                        </span>
                      </div>
                      
                      <p className="food-meta">{item.category} - {item.type}</p>
                      {item.description && <p className="food-desc">{item.description}</p>}
                      
                      <div className="food-footer">
                        <span className="food-price">₹{item.price}</span>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteFoodItem(item._id)}
                          disabled={loading}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  !loading && <p className="no-items">No food items yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Reject Order</h3>
            <textarea
              placeholder="Enter rejection reason..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
            <div className="modal-buttons">
              <button
                className="confirm-btn"
                onClick={() => handleUpdateOrderStatus(selectedOrder, 'Rejected')}
                disabled={!rejectionReason || loading}
              >
                Confirm Rejection
              </button>
              <button
                className="cancel-btn"
                onClick={() => setSelectedOrder(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
