import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiUser";

export const useCurrentUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
  });

  return {
    user: data?.data?.user,
    isAuthenticated: data?.data?.authenticated,
    isLoading,
  };
};
