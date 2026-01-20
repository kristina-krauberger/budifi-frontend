import api from "./axiosConfig";

// Sends login request with username and password
export async function loginUser(username, password) {
  const res = await api.post("/login", {
    username,
    password,
  });
  return res.data;
}

// Registers a new user with given username and password
// TODO: pass on more detais of new user (name, email,..)
export async function registerUser(username, passowrd) {
  const res = await api.post("/register", {
    username,
    password,
  });
}
