import { useMutation } from "@tanstack/react-query";
import { unFollowUser as unFollowUserApi } from "../../services/apiUser";

export const useUnfollowUser = () => {
  const { mutate: unFollowUser, status } = useMutation({
    mutationFn: unFollowUserApi,
  });
  const isLoading = status === "pending";
  return { unFollowUser, isLoading };
};
