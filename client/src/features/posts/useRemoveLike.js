import { useMutation } from "@tanstack/react-query";
import { removeLike as removeLikeApi } from "../../services/apiPosts";

export const useRemoveLike = () => {
  const { mutate: removeLike, status } = useMutation({
    mutationFn: (postId) => removeLikeApi(postId),
  });
  const isLoading = status === "pending";

  return { removeLike, isLoading };
};
