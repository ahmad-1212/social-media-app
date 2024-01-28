import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API = axios.create({
  baseURL: `${API_URL}/api/v1/likes`,
});

API.defaults.withCredentials = true;

// Get all user likes
export const getAllUserLikes = async () => {
  const res = await API.get("/getAllCurrentUserLikes");
  return res.data.likes;
};
