import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getAllPosts } from "../../services/apiPosts";
import { POSTS_LIMIT } from "../../utils/constants";

export const useGetAllPosts = () => {
  const { profileId } = useParams();

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["posts", profileId],
    queryFn: ({ pageParam }) => getAllPosts(pageParam, profileId),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.length < POSTS_LIMIT ? undefined : lastPageParam + 1,
  });

  return { data, fetchNextPage, hasNextPage, isFetching };
};
