import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUser } from "../../services/apiUser";

export default function useUser() {
  const { profileId } = useParams();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", profileId],
    queryFn: () => getUser(profileId),
    enabled: !!profileId,
  });
  return { user, isLoading };
}
