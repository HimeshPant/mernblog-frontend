import axios from 'axios';

// Create an axios instance with the backend URL from the environment variable
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export default API;
