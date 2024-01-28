import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";

export const useSignup = () => {
  const {
    mutate: signup,
    status,
    isError,
  } = useMutation({
    mutationFn: (data) => signupApi(data),
  });

  const isLoading = status === "pending";

  return { signup, isLoading, isError };
};
