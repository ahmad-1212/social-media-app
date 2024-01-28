import { useMutation } from "@tanstack/react-query";
import { likePost as likePostApi } from "../../services/apiPosts";

export const useLikePost = () => {
  const { mutate: likePost, status } = useMutation({
    mutationFn: (postId) => likePostApi(postId),
  });

  const isLoading = status === "pending";
  return { likePost, isLoading };
};
