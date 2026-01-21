import api from "./axiosConfig";

// Sends login request with username and password
export async function loginUser(email, password) {
  const res = await api.post("/login", {
    email,
    password,
  });
  return res.data;
}

// Fetches logged in user data
export async function fetchLoggedInUser() {
    const res = await api.get("/me");
    return res.data
}


// Registers a new user with given username and password
// TODO: pass on more detais of new user (name, email,..)
export async function registerUser(username, passowrd) {
  const res = await api.post("/register", {
    username,
    password,
  });
}
