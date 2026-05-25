import api from './api';

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
};

export const foodAPI = {
  getAllFoodItems: (filters = {}) => api.get('/food-items', { params: filters }),
  getFoodItemById: (id) => api.get(`/food-items/${id}`),
  createFoodItem: (foodData) => api.post('/food-items', foodData),
  updateFoodItem: (id, foodData) => api.put(`/food-items/${id}`, foodData),
  deleteFoodItem: (id) => api.delete(`/food-items/${id}`),
};

export const orderAPI = {
  createOrder: (orderData) => api.post('/orders', orderData),
  getUserOrders: () => api.get('/orders/my-orders'),
  getAllOrders: (filters = {}) => api.get('/orders', { params: filters }),
  getOrderById: (id) => api.get(`/orders/${id}`),
  updateOrderStatus: (id, statusData) => api.put(`/orders/${id}/status`, statusData),
};
