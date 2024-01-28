import { useMutation } from "@tanstack/react-query";
import { deleteComment as deleteCommentApi } from "../../services/apiComments";

export const useDeleteComment = () => {
  const { mutate: deleteComment, status } = useMutation({
    mutationFn: (commentId) => deleteCommentApi(commentId),
  });

  const isLoading = status === "pending";
  return { deleteComment, isLoading };
};
