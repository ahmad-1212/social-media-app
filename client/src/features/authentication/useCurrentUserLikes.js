import { useQuery } from "@tanstack/react-query";
import { useCurrentUser } from "./useCurrentUser";
import { getAllUserLikes } from "../../services/apiLikes";

export const useCurrentUserLikes = () => {
  const { user } = useCurrentUser();
  const { data: likes } = useQuery({
    queryKey: ["user-likes"],
    queryFn: getAllUserLikes,
    enabled: !!user,
  });

  return { likes };
};
