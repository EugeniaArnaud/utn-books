import axios from "axios";
const devEnv = process.env.NODE_ENV !== "production";
const baseURL = "https://utn-books.herokuapp.com"; 

const axiosClient = axios.create({
  baseURL: `${devEnv ? "http://localhost:3000" : baseURL}`, 
  headers: {
    "Content-Type": "application/json",
  } 
});

// Add a request interceptor
axiosClient.interceptors.request.use(function (config) {
  // Do something before request is sent
  const jwt = localStorage.getItem("jwt");
  config.headers["Authorization"] = `Bearer ${jwt}`;
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


export default axiosClient;