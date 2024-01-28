import { useMutation } from "@tanstack/react-query";
import { updateCoverPhoto as updateCoverPhotoApi } from "../../services/apiUser";

export const useUpdateCoverPhoto = () => {
  const {
    mutate: updateCoverPhoto,
    status,
    error,
  } = useMutation({
    mutationFn: (file) => updateCoverPhotoApi(file),
  });
  const isLoading = status === "pending";
  return { updateCoverPhoto, isLoading, error };
};
