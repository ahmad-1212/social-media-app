import axios from "axios";

// Create Base URL
const API_URL = import.meta.env.VITE_API_URL;
const API = axios.create({
  baseURL: `${API_URL}/api/v1/users`,
});

// Set withcreadential to true for saving cookies
API.defaults.withCredentials = true;

// Get User with ID
export const getUser = async (userId) => {
  const res = await API.get(`getUser/${userId}`);

  return res.data.user;
};

// Read user notification
export const readUserNotification = async () => {
  const res = await API.patch("/readUserNotification");
  return res;
};

// function to get current user
export const getCurrentUser = async () => {
  const res = await API.get("/getCurrentUser");
  if (res.data.status !== "success")
    throw new Error("Something went very wrong, Try again!");
  return res;
};

// function to update user cover photo
export const updateCoverPhoto = async (file) => {
  const form = new FormData();
  form.append("coverPhoto", file);
  const res = await API.post("/updateCoverPhoto", form);
  return res;
};

// Get suggested users
export const getSuggestedUsers = async () => {
  const res = await API.get("/suggestedUsers");
  return res.data;
};

// Follow a user
export const followUser = async (userId) => {
  const res = await API.post(`/${userId}/follow`);
  return res;
};

// unFollow a user
export const unFollowUser = async (userId) => {
  const res = await API.post(`/${userId}/unFollow`);
  return res;
};

// Update User
export const updateUserData = async (data) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("userImage", data.file);
  const res = await API.post("/updateUserData", formData);

  return res;
};

// Update User password
export const updateUserPassowrd = async (data) => {
  const res = await API.post("/updatePassword", data);
  return res;
};
