import api from "./axiosConfig";

// Sends login request with username and password
export async function loginUser(email, password) {
  const response = await api.post("/api/login", {
    email,
    password,
  });
  return response.data;
}

// Fetches logged in user data
export async function fetchLoggedInUser() {
  const response = await api.get("/api/me");
  return response.data;
}

// Registers a new user with given first name, last name, email and password 
export async function registerUser(userData) {
  const response = await api.post("/api/register", {
    first_name: userData.firstName,
    last_name: userData.lastName,
    email: userData.email,
    password: userData.password,
  });
  return response.data;
}
