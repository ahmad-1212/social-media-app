import { useMutation } from "@tanstack/react-query";
import { readUserNotification as readUserNotificationApi } from "../../services/apiUser";

export default function useReadUserNotificaion() {
  const { mutate: readUserNotification } = useMutation({
    mutationFn: readUserNotificationApi,
  });
  return { readUserNotification };
}
