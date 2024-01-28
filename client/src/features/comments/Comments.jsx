import { useQueryClient } from "@tanstack/react-query";
import { useGetComments } from "./useGetComments";
import LoadingSpinner from "../../Components/UI/LoadingSpinner";
import CommentItem from "./CommentItem";

const Comments = ({ postId, onHideComments, setNumOfComments }) => {
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useGetComments(postId);

  const queryClient = useQueryClient();

  const handleClick = () => {
    onHideComments();
    queryClient.removeQueries({ queryKey: ["comments", postId], exact: true });
  };

  return (
    <div>
      <ul className="ml-4 sm:ml-6 mt-3 flex flex-col gap-3">
        {data?.pages.map((page, i) => {
          if (i === 0 && page.length === 0) {
            return (
              <div
                key={i}
                className="flex font-[400] text-[1.3rem] justify-center my-4"
              >
                No Comments yet!
              </div>
            );
          } else {
            return page.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                postId={postId}
                setNumOfComments={setNumOfComments}
              />
            ));
          }
        })}
      </ul>
      {isFetching && (
        <div className="flex w-full justify-center my-4">
          <LoadingSpinner className="w-[1.5rem] h-[1.5rem] border-[3px]" />
        </div>
      )}
      <div className="flex flex-col items-center">
        {hasNextPage && !isFetching && (
          <button
            onClick={fetchNextPage}
            type="button"
            className="my-5 dark:hover:text-gray-600  hover:text-gray-700"
          >
            Load More
          </button>
        )}
        {!isFetching && (
          <button
            onClick={handleClick}
            className="hover:underline dark:hover:text-gray-700 my-3 hover:text-gray-700"
          >
            Hide Comments
          </button>
        )}
      </div>
    </div>
  );
};

export default Comments;
