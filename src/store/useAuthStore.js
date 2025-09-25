import { create } from 'zustand';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isCheckingAuth: false,

  // Register a new user
  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/auth/register`, userData, {
        timeout: 5000,
      });
      set({
        user: res.data.user,
        token: res.data.token,
        isAuthenticated: true,
        isLoading: false,
      });
      localStorage.setItem('authToken', res.data.token);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  // Log in a user
  login: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/auth/login`, userData, {
        timeout: 5000,
      });
      set({
        user: res.data.user,
        token: res.data.token,
        isAuthenticated: true,
        isLoading: false,
      });
      localStorage.setItem('authToken', res.data.token);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  // Handle OAuth user data
  setOAuthUser: ({ user, token }) => {
    console.log('setOAuthUser called with:', { user, token: token ? token.substring(0, 20) + '...' : 'null' });
    localStorage.setItem('authToken', token); // Force set token
    set({
      user,
      token: token || null,
      isAuthenticated: !!token,
      isLoading: false,
      error: null,
    });
  },

  // Check token validity with backend
  checkAuth: async () => {
    if (useAuthStore.getState().isCheckingAuth) return;
    set({ isCheckingAuth: true, isLoading: true });
    const token = localStorage.getItem('authToken');
    if (!token) {
      set({ isCheckingAuth: false, isLoading: false });
      return;
    }
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/auth/check-auth`, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 5000,
      });
      console.log('checkAuth response:', res.data); 
      set({
        user: res.data.user,
        token,
        isAuthenticated: true,
        isCheckingAuth: false,
        isLoading: false,
      });
    } catch (error) {
      console.error('CheckAuth failed:', error.response?.data?.message || error.message);
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isCheckingAuth: false,
        isLoading: false,
        error: error.response?.data?.message || 'Authentication check failed',
      });
      localStorage.removeItem('authToken');
    }
  },

  // Log out a user
  logout: async () => {
    const token = localStorage.getItem('authToken');
    try {
      await axios.post(
        `${BASE_URL}/api/v1/auth/logout`,
        {},
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          timeout: 5000,
        }
      );
    } catch (error) {
      console.warn('Logout failed:', error.response?.data?.message || error.message);
    }
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    localStorage.removeItem('authToken');
  },

  // Error handling actions
  setError: (message) => set({ error: message }),
  clearError: () => set({ error: null }),
}));

export default useAuthStore;