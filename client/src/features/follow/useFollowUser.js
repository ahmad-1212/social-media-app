import { useMutation } from "@tanstack/react-query";
import { followUser as followUserApi } from "../../services/apiUser";

export const useFollowUser = () => {
  const { mutate: followUser, status } = useMutation({
    mutationFn: followUserApi,
  });
  const isLoading = status === "pending";
  return { followUser, isLoading };
};
