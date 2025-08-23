import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/v1",
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
    const res = await API.post(endpoint, body, config);
    return res.data;
  } catch (error) {
    console.error(error, `error - postData in ${endpoint} route`);
    throw error;
  }
};

export { API, getData, getAllData, postData };
