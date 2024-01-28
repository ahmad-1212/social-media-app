import { forwardRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import Avatar from "../../Components/UI/Avatar";
import useReadNotification from "./useReadNotification";
import { formateDate } from "../../utils/helpers";

const NotificationItem = forwardRef(function Notification(
  { notification },
  ref
) {
  const { readNotification, isLoading } = useReadNotification();
  const { fromUser: notificationUser } = notification;
  const queryClient = useQueryClient();
  const sameStyles = !notification.read
    ? "font-[600] text-[0.8rem]"
    : "text-[0.8rem]";

  const handleClick = () => {
    readNotification(notification._id, {
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["user-notifications"] }),
    });
  };

  return (
    <li
      ref={ref}
      className={`flex flex-col grow py-3 px-5 rounded-md ${
        !notification.read
          ? "bg-blue-300/40 dark:bg-blue-300/20 "
          : " bg-gray-600/30 dark:bg-gray-900/50"
      }`}
    >
      <div className="flex gap-4">
        <Link to={`/profile/${notificationUser._id}`}>
          <Avatar
            src={notificationUser.photo ?? "/demo-img.jpg"}
            width="3.5rem"
            height="3.5rem"
          />
        </Link>
        <div className="flex flex-col sm:flex-row gap-x-3 ">
          <div className="flex flex-row sm:flex-col items-center sm:items-start gap-x-3">
            <Link to={`/profile/${notificationUser._id}`}>
              <h5 className={sameStyles + " text-[1rem] font-[500] w-max"}>
                {notificationUser.name}
              </h5>
            </Link>
            <div className={sameStyles + " text-[0.7rem]"}>
              {formateDate(notification.createdAt)}
            </div>
          </div>
          <p className={sameStyles}>{notification.text}</p>
        </div>
      </div>
      {!notification.read && (
        <button
          disabled={isLoading}
          onClick={handleClick}
          className="w-max flex ml-auto hover:text-black dark:hover:text-white hover:underline disabled:opacity-40 disabled:cursor-not-allowed "
        >
          Mark as read
        </button>
      )}
    </li>
  );
});

export default NotificationItem;
