import { useMutation } from "@tanstack/react-query";
import { updateUserData } from "../../services/apiUser";

export const useUpdateUser = () => {
  const { mutate: updateUser, status } = useMutation({
    mutationFn: (data) => updateUserData(data),
  });

  const isLoading = status === "pending";

  return { updateUser, isLoading };
};
