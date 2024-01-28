import { useMutation } from "@tanstack/react-query";
import { readNotification as readNotificationApi } from "../../services/apiNotifications";

export default function useReadNotification() {
  const { mutate: readNotification, status } = useMutation({
    mutationFn: readNotificationApi,
  });

  const isLoading = status === "pending";

  return { readNotification, isLoading };
}
