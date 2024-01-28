import axios from "axios";
import { COMMENTS_LIMIT, POSTS_LIMIT } from "../utils/constants";

// Create base URL
const API_URL = import.meta.env.VITE_API_URL;
const API = axios.create({
  baseURL: `${API_URL}/api/v1/posts`,
});

// Set withcredentials to true for cookies
API.defaults.withCredentials = true;

// Get Posts function
export const getAllPosts = async (pageParam, profileId = null) => {
  const res = await API.get(
    `?profileId=${profileId}&page=${pageParam}&limit=${POSTS_LIMIT}`
  );
  return res.data.posts;
};

// Create Post or upload Post
export const createPost = async (data) => {
  const form = new FormData();
  form.append("postImage", data.file.file);
  form.append("description", data.description);
  const res = await API.post("", form);
  return res;
};

// Delete a Post
export const deletePost = async (postId) => {
  const res = await API.delete(`/${postId}`);
  return res;
};

// Get Comments of the Post
export const getPostComments = async (postId, page) => {
  const res = await API.get(
    `/${postId}/comments?limit=${COMMENTS_LIMIT}&page=${page}`
  );
  return res.data.comments;
};

// Comment on a Post
export const createComment = async ({ postId, content }) => {
  const res = await API.post(`/${postId}/comments`, {
    content,
  });
  if (res.data.status !== "success")
    throw new Error("Something went very wrong, Try again!");
  return res;
};

// Like a post
export const likePost = async (postId) => {
  const res = await API.post(`/${postId}/likes`);

  return res.data.like;
};

// Remove like from POst
export const removeLike = async (postId) => {
  const res = await API.delete(`/${postId}/likes`);
  return res;
};
