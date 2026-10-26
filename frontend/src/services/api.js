// KrishiLink API Client Service
// In development or unified hosting, uses relative '/api'.
// In separate frontend hosting (Vercel/Netlify), reads VITE_API_URL from environment.
const API_BASE = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api` 
  : '/api';

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
      return await res.json();
    } catch (e) {
      return { status: 'offline' };
    }
  },

  // Auth
  login: async (email, password) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok && data.token) {
      localStorage.setItem('krishilink_token', data.token);
      localStorage.setItem('krishilink_user', JSON.stringify(data.user));
    }
    return { ok: res.ok, status: res.status, data };
  },

  register: async (userData) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(userData)
    });
    const data = await res.json();
    if (res.ok && data.token) {
      localStorage.setItem('krishilink_token', data.token);
      localStorage.setItem('krishilink_user', JSON.stringify(data.user));
    }
    return { ok: res.ok, status: res.status, data };
  },

  getProfile: async () => {
    const res = await fetch(`${API_BASE}/auth/profile`, {
      headers: getHeaders()
    });
    return await res.json();
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
    const res = await fetch(`${API_BASE}/recommend-crop`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(params)
    });
    return await res.json();
  },

  // Plant Disease Detection
  detectDisease: async (payload) => {
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
    return await res.json();
  },

  getSampleLeaves: async () => {
    const res = await fetch(`${API_BASE}/sample-leaves`);
    return await res.json();
  },

  // Weather & Advisories
  getWeather: async (city = 'Mandya') => {
    const res = await fetch(`${API_BASE}/weather?city=${encodeURIComponent(city)}`);
    return await res.json();
  },

  // Schemes
  getSchemes: async (category = '', search = '') => {
    let url = `${API_BASE}/schemes?`;
    if (category) url += `category=${encodeURIComponent(category)}&`;
    if (search) url += `search=${encodeURIComponent(search)}`;
    const res = await fetch(url);
    return await res.json();
  },

  // Crop Guides
  getCropGuides: async (category = '', search = '') => {
    let url = `${API_BASE}/crop-guides?`;
    if (category) url += `category=${encodeURIComponent(category)}&`;
    if (search) url += `search=${encodeURIComponent(search)}`;
    const res = await fetch(url);
    return await res.json();
  },

  // Dashboard
  getDashboard: async () => {
    const res = await fetch(`${API_BASE}/user/dashboard`, {
      headers: getHeaders()
    });
    return await res.json();
  },

  deleteSavedRec: async (id) => {
    const res = await fetch(`${API_BASE}/user/saved-recommendations/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return await res.json();
  },

  toggleBookmark: async (schemeId) => {
    const res = await fetch(`${API_BASE}/user/bookmarks`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ scheme_id: schemeId })
    });
    return await res.json();
  },

  getUserBookmarks: async () => {
    const res = await fetch(`${API_BASE}/user/bookmarks`, {
      headers: getHeaders()
    });
    return await res.json();
  },

  // Contact
  submitContact: async (inquiry) => {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(inquiry)
    });
    return await res.json();
  }
};
