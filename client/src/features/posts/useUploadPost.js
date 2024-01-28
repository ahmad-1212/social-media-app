import { useMutation } from "@tanstack/react-query";
import { createPost } from "../../services/apiPosts";

export const useUploadPost = () => {
  const { mutate: uploadPost, status } = useMutation({
    mutationFn: (data) => createPost(data),
  });

  const isLoading = status === "pending";
  return { uploadPost, isLoading };
};
