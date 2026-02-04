/**
 * This file sets up a central Axios instance for making HTTP requests to the backend:
 * - Defines the backend base URL (local for development)
 * - Creates an Axios instance with common settings (like JSON headers)
 * - Automatically adds your token from localStorage to every request (if available)
 *
 * You can import this instance anywhere in the app to communicate with the backend API.
 */

import axios from "axios";

// Define base URLs for production and development environments
const API_BASE_URL = "https://buddyfi-backend.onrender.com"; //TODO: update deployed project URL
const API_BASE_URL_DEV = "http://127.0.0.1:5003";

// Create an Axios instance with default configuration
if (
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
) {
  console.log("You are running locally!");
  const api = axios.create({
    baseURL: API_BASE_URL_DEV,
    headers: {
      "Content-Type": "application/json",
    },
  });
} else {
  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// Add a request interceptor to automatically attach the auth token (if available)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
