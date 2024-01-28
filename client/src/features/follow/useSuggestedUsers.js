import { useQuery } from "@tanstack/react-query";
import { getSuggestedUsers } from "../../services/apiUser";

export const useSuggestedUsers = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["suggested-users"],
    queryFn: getSuggestedUsers,
  });
  return { data, isLoading, isError };
};
