/**
 * This file sets up a central Axios instance for making HTTP requests to the backend:
 * - Defines the backend base URL (local for development)
 * - Creates an Axios instance with common settings (like JSON headers)
 * - Automatically adds your token from localStorage to every request (if available)
 *
 * You can import this instance anywhere in the app to communicate with the backend API.
 */

import axios from "axios";


// Define base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to automatically attach the auth token (if available)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Helper function to dynamically determine the Money Compass API URL
let determinedBaseUrl = null;

const getMoneyCompassBaseUrl = async () => {
  if (determinedBaseUrl) return determinedBaseUrl;

  const localUrl = import.meta.env.VITE_MONEY_COMPASS_API_URL || "http://localhost:5004";
  const deployedUrl = "https://money-compass-api.onrender.com";

  // Check if we are running in a deployed environment (production mode or custom flags, or hosted hostname)
  const isFrontendDeployed =
    import.meta.env.PROD ||
    import.meta.env.VITE_RENDER ||
    (typeof window !== "undefined" &&
      window.location.hostname !== "localhost" &&
      window.location.hostname !== "127.0.0.1");

  if (isFrontendDeployed) {
    determinedBaseUrl = deployedUrl;
    return determinedBaseUrl;
  }

  // If local, check if the local backend is running by pinging the health endpoint
  try {
    await axios.get(`${localUrl}/health`, { timeout: 800 });
    determinedBaseUrl = localUrl;
  } catch (err) {
    // If the local server is not running, fall back to the deployed URL
    determinedBaseUrl = deployedUrl;
  }

  return determinedBaseUrl;
};

// Dedicated axios instance for the Money Compass API (running on a different port/service)
export const moneyCompassApi = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

moneyCompassApi.interceptors.request.use(async (config) => {
  config.baseURL = await getMoneyCompassBaseUrl();
  return config;
});

export default api;
