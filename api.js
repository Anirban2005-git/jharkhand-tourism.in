// Frontend API helper for Jharkhand Tourism
class TourismAPI {
  constructor() {
    this.baseURL = 'http://localhost:3000/api';
    this.token = localStorage.getItem('authToken');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    if (this.token) {
      config.headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Public endpoints (no authentication required)
  async getDestinations(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/destinations${queryString ? '?' + queryString : ''}`);
  }

  async getEvents(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/events${queryString ? '?' + queryString : ''}`);
  }

  async getProviders(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/providers${queryString ? '?' + queryString : ''}`);
  }

  async getCertificate(certificateId) {
    return this.request(`/certificates/${certificateId}`);
  }

  // Authentication endpoints
  async login(username, password) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async register(userData) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // Payment endpoints (Razorpay)
  async createOrder(paymentData) {
    return this.request('/payments/create-order', {
      method: 'POST',
      body: JSON.stringify(paymentData)
    });
  }

  async verifyPayment(paymentData) {
    return this.request('/payments/verify-payment', {
      method: 'POST',
      body: JSON.stringify(paymentData)
    });
  }

  // Admin endpoints
  async getDashboardStats() {
    return this.request('/admin/dashboard-stats');
  }

  async getAdminPayments(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/admin/payments${queryString ? '?' + queryString : ''}`);
  }

  async issueCertificate(certificateData) {
    return this.request('/certificates/issue', {
      method: 'POST',
      body: JSON.stringify(certificateData)
    });
  }

  // Utility methods
  isAuthenticated() {
    return !!this.token;
  }

  isAdmin() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      return user.role === 'admin';
    }
    return false;
  }
}

// Create global instance
window.tourismAPI = new TourismAPI();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TourismAPI;
}
