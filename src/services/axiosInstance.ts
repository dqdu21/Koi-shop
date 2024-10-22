import axios from "axios";


export const axiosInstance = axios.create({
  baseURL: 'https://koifarmshop.online/api', 
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});
