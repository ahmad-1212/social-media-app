import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import NotificationsList from "../features/notifications/NotificationsList";
import { useCurrentUser } from "../features/authentication/useCurrentUser";
import useReadUserNotificaion from "../features/notifications/useReadUserNotificaion";

const Notification = () => {
  const { user } = useCurrentUser();
  const { readUserNotification } = useReadUserNotificaion();
  const queryClient = useQueryClient();

  useEffect(() => {
    // If user notification is true read it
    if (user.notification) {
      readUserNotification(null, {
        onSuccess: () =>
          queryClient.invalidateQueries({ queryKey: ["current-user"] }),
      });
    }
  }, [user.notification, readUserNotification, queryClient]);

  return (
    <>
      <h2 className="text-2xl font-[600]">Notifications</h2>
      <NotificationsList />
    </>
  );
};

export default Notification;
