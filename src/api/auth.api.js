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

// Registers a new user with given first name, last name, email and password.
// Validates if a user with the same email already exists and returns an error if so.
// Returns the response data or an error message.
export async function registerUser(userData) {
  try {
    const response = await api.post("/api/register", {
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
      password: userData.password,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return { error: error.response.data.error };
    }
    return { error: "Something went wrong. Please try again." };
  }
}
