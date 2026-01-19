import axios from "axios";

//TODO: update deployed project URL
const API_BASE_URL = "";
const API_BASE_URL_DEV = "http://127.0.0.1:5003";

const api = axios.create({
  baseURL: API_BASE_URL_DEV,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api