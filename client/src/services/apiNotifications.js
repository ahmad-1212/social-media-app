import axios from "axios";
import { NOTIFICATIONS_LIMIT } from "../utils/constants";

const API_URL = import.meta.env.VITE_API_URL;
const API = axios.create({
  baseURL: `${API_URL}/api/v1/notifications`,
});

API.defaults.withCredentials = true;

// Get user notifications
export const getUserNotifications = async ({ pageParam }) => {
  const res = await API.get(
    `/getUserNotifications?page=${pageParam}&limit=${NOTIFICATIONS_LIMIT}`
  );
  return res.data.notifications;
};

// read user notifications
export const readNotification = async (notificationId) => {
  const res = await API.patch(`/${notificationId}`);

  return res.data.notification;
};
