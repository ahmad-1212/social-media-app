import axios from "axios";

// Create Base URL
const API_URL = import.meta.env.VITE_API_URL;
const API = axios.create({
  baseURL: `${API_URL}/api/v1/users`,
});

// Set withcreadential to true for saving cookies
API.defaults.withCredentials = true;

// Singup function
export const signup = async ({ name, email, password, confirmPassword }) => {
  const res = await API.post("/signup", {
    name,
    email,
    password,
    passwordConfirm: confirmPassword,
  });

  if (res.data.status !== "success")
    throw new Error("Something went very wrong, Try again!");
  return res;
};

// Login function
export const login = async ({ email, password }) => {
  const res = await API.post("login", {
    email,
    password,
  });
  if (res.data.status !== "success")
    throw Error("Something went very wrong, Try again!");
  return res;
};

// Logout function
export const logout = async () => {
  const res = await API.get("/logout");
  if (res.data.status !== "success")
    throw new Error("Something went very wrong, Try again,");
  return res;
};
