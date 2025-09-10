import axios from 'axios';

const API = axios.create({
  baseURL: 'https://mernblog-backend-5k38.onrender.com'
});

export default API;
