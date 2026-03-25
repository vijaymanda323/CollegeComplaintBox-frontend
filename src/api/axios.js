import axios from 'axios';

const API_BASE_URL = 'https://ttcollegebackend.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token to headers
api.interceptors.request.use(
  (config) => {
    console.log('📤 API REQUEST:', {
      method: config.method.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      fullURL: config.baseURL + config.url,
      headers: config.headers,
      data: config.data,
    });

    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('✅ Token added to Authorization header');
    } else {
      console.log('⚠️ No token found in localStorage');
    }
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    console.log('✅ API RESPONSE:', {
      status: response.status,
      statusText: response.statusText,
      url: response.config.url,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error('❌ API ERROR RESPONSE:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.response?.config?.url,
      data: error.response?.data,
      message: error.message,
    });

    if (error.response?.status === 401) {
      console.warn('🔒 Unauthorized (401) - Clearing auth and redirecting to login');
      // Token expired or invalid - clear localStorage and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

// Complaints endpoints
export const complaintAPI = {
  // Student endpoints
  getMyComplaints: (page = 0, size = 10) =>
    api.get('/complaints/my', { params: { page, size } }),
  getComplaintById: (id) => api.get(`/complaints/${id}`),
  createComplaint: (data) => api.post('/complaints', data),
  updateComplaint: (id, data) => api.put(`/complaints/${id}`, data),
  deleteComplaint: (id) => api.delete(`/complaints/${id}`),

  // Admin endpoints
  getAllComplaints: (page = 0, size = 10) =>
    api.get('/admin/complaints', { params: { page, size } }),
  updateComplaintStatus: (id, data) =>
    api.put(`/admin/complaints/${id}/status`, data),
  deleteAdminComplaint: (id) => api.delete(`/admin/complaints/${id}`),
};

export default api;
