import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
});
// GET with params
const getData = async (endpoint, params = {}) => {
  try {
    const res = await API.get(endpoint, { params });
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

export { API, getData, getAllData, postData };
