import { useMutation } from "@tanstack/react-query";
import { createComment as createCommentApi } from "../../services/apiPosts";

export const useCreateComment = () => {
  const { mutate: createComment, status } = useMutation({
    mutationFn: (data) => createCommentApi(data),
  });
  const isLoading = status === "pending";

  return { createComment, isLoading };
};
