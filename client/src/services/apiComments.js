import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API = axios.create({
  baseURL: `${API_URL}/api/v1/comments`,
});

API.defaults.withCredentials = true;

// Delete a comment
export const deleteComment = async (commentId) => {
  const res = await API.delete(`/${commentId}`);
  return res;
};
