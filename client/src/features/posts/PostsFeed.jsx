import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

import Post from "./Post";
import { useGetAllPosts } from "./useGetAllPosts";
import LoadingSpinner from "../../Components/UI/LoadingSpinner";

const PostsFeed = () => {
  const { data, fetchNextPage, hasNextPage, isFetching, error } =
    useGetAllPosts();
  const { ref, inView } = useInView();

  // For infinite scrolling
  // If last post is in view & there is more posts fetch it
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <>
      <div className="mt-5 w-full">
        {data?.pages?.map((page) =>
          page.map((post, i) => (
            <Post
              key={post._id}
              post={post}
              ref={page.length - 1 === i ? ref : undefined}
              isFetching={isFetching}
            />
          ))
        )}
        {isFetching && (
          <div className="flex justify-center">
            {" "}
            <LoadingSpinner className="w-[2rem] h-[2rem] border-[4px]" />
          </div>
        )}
        {error && !isFetching && <div>{error}</div>}
        {data?.pages.at(0).length === 0 && (
          <h4 className="my-10 text-xl text-center">No post yet! </h4>
        )}
      </div>
    </>
  );
};

export default PostsFeed;
