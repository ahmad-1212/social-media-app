import { useInfiniteQuery } from "@tanstack/react-query";
import { getUserNotifications } from "../../services/apiNotifications";
import { NOTIFICATIONS_LIMIT } from "../../utils/constants";

export default function useNotifications() {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["user-notifications"],
    queryFn: getUserNotifications,
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.length < NOTIFICATIONS_LIMIT ? undefined : lastPageParam + 1,
  });
  return {
    data,
    fetchNextPage,
    isFetching,
    hasNextPage,
  };
}
