import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// GET with params
const getData = async (endpoint, params = {}) => {
  try {
    const token = localStorage.getItem("authToken");
    const res = await API.get(endpoint, {
      params,
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    });
    return res.data;
  } catch (error) {
    console.error(error, `error - getData in ${endpoint} route`);
    throw error;
  }
};

// GET all
const getAllData = async (endpoint) => {
  try {
    const res = await API.get(endpoint);
    return res.data;
  } catch (error) {
    console.error(error, `error - getAllData in ${endpoint} route`);
    throw error;
  }
};

// POST
const postData = async (endpoint, body = {}, config = {}) => {
  try {
    const token = localStorage.getItem("authToken");
    const headers = {
      ...config.headers,
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }), 
    };
    const res = await API.post(endpoint, body, { ...config, headers });
    return res.data;
  } catch (error) {
    console.error(error, `error - postData in ${endpoint} route`);
    throw error;
  }
};

// PATCH
const patchData = async (endpoint, body = {}, config = {}) => {
  try {
    const token = localStorage.getItem("authToken");
    const headers = {
      ...config.headers,
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
    const res = await API.patch(endpoint, body, { ...config, headers });
    return res.data;
  } catch (error) {
    console.error(error, `error - patchData in ${endpoint} route`);
    throw error;
  }
};

// DELETE
const deleteData = async (endpoint) => {
  try {
    const res = await API.delete(endpoint);
    return res.data;
  } catch (error) {
    console.error(error, `error - deleteData in ${endpoint} route`);
    throw error;
  }
};

export { API, getData, getAllData, postData, patchData, deleteData };

