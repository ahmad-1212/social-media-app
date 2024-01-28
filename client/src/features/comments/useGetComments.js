import { useInfiniteQuery } from "@tanstack/react-query";
import { getPostComments } from "../../services/apiPosts";
import { COMMENTS_LIMIT } from "../../utils/constants";

export const useGetComments = (postId) => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["comments", postId],
    queryFn: ({ pageParam }) => getPostComments(postId, pageParam),
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, pages, lastPageParam) =>
      lastPage.length < COMMENTS_LIMIT ? undefined : lastPageParam + 1,
  });

  return { data, fetchNextPage, hasNextPage, isFetching };
};
