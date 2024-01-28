import { useMutation } from "@tanstack/react-query";
import { updateUserPassowrd } from "../../services/apiUser";

export const useUpdatePassword = () => {
  const { mutate: updatePassword, status } = useMutation({
    mutationFn: (data) => updateUserPassowrd(data),
  });
  const isLoading = status === "pending";
  return { updatePassword, isLoading };
};
