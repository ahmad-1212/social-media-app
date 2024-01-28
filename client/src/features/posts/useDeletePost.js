import { useMutation } from "@tanstack/react-query";
import { deletePost as deletePostApi } from "../../services/apiPosts";

export const useDeletePost = () => {
  const { mutate: deletePost, status } = useMutation({
    mutationFn: (postId) => deletePostApi(postId),
  });
  const isLoading = status === "pending";
  return { deletePost, isLoading };
};
