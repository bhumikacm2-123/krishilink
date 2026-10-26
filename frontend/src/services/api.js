// KrishiLink API Client Service
// Configured to connect to deployed Flask backend via VITE_API_BASE_URL

const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL;
  if (envUrl && envUrl.trim() !== '') {
    const clean = envUrl.trim().replace(/\/+$/, '');
    return clean.endsWith('/api') ? clean : `${clean}/api`;
  }
  // Production fallback to deployed Render backend
  if (import.meta.env.PROD) {
    return 'https://krishilink-api-vltr.onrender.com/api';
  }
  // Local development fallback to Vite proxy
  return '/api';
};

export const API_BASE = getApiBaseUrl();

// Safe JSON parser to handle Render spin-up delays or non-JSON HTTP responses
const parseResponse = async (res) => {
  try {
    const text = await res.text();
    return text ? JSON.parse(text) : {};
  } catch (err) {
    return { 
      error: `Server returned non-JSON response (${res.status}). The backend may be waking up. Please retry in a few seconds.` 
    };
  }
};

const getHeaders = (isJson = true) => {
  const headers = {};
  if (isJson) {
    headers['Content-Type'] = 'application/json';
  }
  const token = localStorage.getItem('krishilink_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const api = {
  // Health
  checkHealth: async () => {
    try {
      const res = await fetch(`${API_BASE}/health`);
      return await parseResponse(res);
    } catch (e) {
      return { status: 'offline', error: 'Backend unreachable' };
    }
  },

  // Auth
  login: async (email, password) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email, password })
      });
      const data = await parseResponse(res);
      if (res.ok && data.token) {
        localStorage.setItem('krishilink_token', data.token);
        localStorage.setItem('krishilink_user', JSON.stringify(data.user));
      }
      return { ok: res.ok, status: res.status, data };
    } catch (err) {
      return { 
        ok: false, 
        status: 0, 
        data: { error: 'Unable to connect to authentication server. Please check your internet connection.' } 
      };
    }
  },

  register: async (userData) => {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(userData)
      });
      const data = await parseResponse(res);
      if (res.ok && data.token) {
        localStorage.setItem('krishilink_token', data.token);
        localStorage.setItem('krishilink_user', JSON.stringify(data.user));
      }
      return { ok: res.ok, status: res.status, data };
    } catch (err) {
      return { 
        ok: false, 
        status: 0, 
        data: { error: 'Registration failed. Backend server may be offline.' } 
      };
    }
  },

  getProfile: async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/profile`, {
        headers: getHeaders()
      });
      return await parseResponse(res);
    } catch (err) {
      return { error: 'Could not fetch user profile.' };
    }
  },

  logout: () => {
    localStorage.removeItem('krishilink_token');
    localStorage.removeItem('krishilink_user');
  },

  getCurrentUser: () => {
    try {
      const saved = localStorage.getItem('krishilink_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  },

  // Crop Recommendation
  recommendCrop: async (params) => {
    try {
      const res = await fetch(`${API_BASE}/recommend-crop`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(params)
      });
      return await parseResponse(res);
    } catch (err) {
      return { 
        error: 'Failed to contact recommendation engine. The cloud server might be spinning up; please wait a moment and retry.' 
      };
    }
  },

  // Plant Disease Detection
  detectDisease: async (payload) => {
    try {
      let res;
      if (payload instanceof FormData) {
        res = await fetch(`${API_BASE}/detect-disease`, {
          method: 'POST',
          headers: getHeaders(false),
          body: payload
        });
      } else {
        res = await fetch(`${API_BASE}/detect-disease`, {
          method: 'POST',
          headers: getHeaders(true),
          body: JSON.stringify(payload)
        });
      }
      return await parseResponse(res);
    } catch (err) {
      return { 
        success: false, 
        error: 'Diagnostic API connection failed. Please ensure your image is valid and try again.' 
      };
    }
  },

  getSampleLeaves: async () => {
    try {
      const res = await fetch(`${API_BASE}/sample-leaves`);
      return await parseResponse(res);
    } catch (err) {
      return { samples: [] };
    }
  },

  // Weather & Advisories
  getWeather: async (city = 'Mandya') => {
    try {
      const res = await fetch(`${API_BASE}/weather?city=${encodeURIComponent(city)}`);
      return await parseResponse(res);
    } catch (err) {
      return { 
        success: false, 
        error: 'Could not fetch live weather data for this location.' 
      };
    }
  },

  // Schemes
  getSchemes: async (category = '', search = '') => {
    try {
      let url = `${API_BASE}/schemes?`;
      if (category) url += `category=${encodeURIComponent(category)}&`;
      if (search) url += `search=${encodeURIComponent(search)}`;
      const res = await fetch(url);
      return await parseResponse(res);
    } catch (err) {
      return { total: 0, schemes: [] };
    }
  },

  // Crop Guides
  getCropGuides: async (category = '', search = '') => {
    try {
      let url = `${API_BASE}/crop-guides?`;
      if (category) url += `category=${encodeURIComponent(category)}&`;
      if (search) url += `search=${encodeURIComponent(search)}`;
      const res = await fetch(url);
      return await parseResponse(res);
    } catch (err) {
      return { total: 0, crops: [] };
    }
  },

  // Dashboard
  getDashboard: async () => {
    try {
      const res = await fetch(`${API_BASE}/user/dashboard`, {
        headers: getHeaders()
      });
      return await parseResponse(res);
    } catch (err) {
      return { error: 'Could not load dashboard records.' };
    }
  },

  deleteSavedRec: async (id) => {
    try {
      const res = await fetch(`${API_BASE}/user/saved-recommendations/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      return await parseResponse(res);
    } catch (err) {
      return { success: false };
    }
  },

  toggleBookmark: async (schemeId) => {
    try {
      const res = await fetch(`${API_BASE}/user/bookmarks`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ scheme_id: schemeId })
      });
      return await parseResponse(res);
    } catch (err) {
      return { error: 'Bookmark update failed' };
    }
  },

  getUserBookmarks: async () => {
    try {
      const res = await fetch(`${API_BASE}/user/bookmarks`, {
        headers: getHeaders()
      });
      return await parseResponse(res);
    } catch (err) {
      return { bookmarked_scheme_ids: [] };
    }
  },

  // Contact
  submitContact: async (inquiry) => {
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(inquiry)
      });
      return await parseResponse(res);
    } catch (err) {
      return { 
        success: false, 
        error: 'Failed to submit inquiry. Please check your network and retry.' 
      };
    }
  }
};
