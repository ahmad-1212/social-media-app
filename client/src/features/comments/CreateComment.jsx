import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { IoSend } from "react-icons/io5";

import Avatar from "../../Components/UI/Avatar";
import TextBox from "../../Components/UI/TextBox";
import { useCurrentUser } from "../authentication/useCurrentUser";
import IconButton from "../../Components/UI/IconButton";
import { useCreateComment } from "./useCreateComment";
import LoadingSpinner from "../../Components/UI/LoadingSpinner";
import { useScreen } from "../../hooks/useScreen";

const CreateComment = ({ postId, setNumOfComments }) => {
  const [content, setContent] = useState("");
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();
  const { createComment, isLoading } = useCreateComment();
  const { screen } = useScreen();

  // Create comment on submit
  const onSubmit = () => {
    createComment(
      { postId, content },
      {
        onSuccess: () => {
          setContent("");
          // increase the comment by 1
          setNumOfComments((prev) => prev + 1);
          // If the comment of the post is displayed invalidate it to refetch
          const isData = queryClient.getQueriesData({
            queryKey: ["comments", postId],
          });
          if (!isData || !isData.length) return;

          queryClient.invalidateQueries({ queryKey: ["comments", postId] });
        },
      }
    );
  };

  return (
    <div className="mt-4 w-full grid grid-cols-[2.6rem_1fr] sm:grid-cols-[3rem_1fr] gap-x-1 sm:gap-x-2 px-4 overflow-hidden">
      <Avatar
        src={user?.photo ?? "/demo-img.jpg"}
        width={screen >= 640 ? "2.5rem" : "2.1rem"}
        height={screen >= 640 ? "2.5rem" : "2.1rem"}
      />
      <div className="py-1 px-4 bg-gray-500 dark:bg-gray-800/60 grow rounded-lg overflow-hidden">
        {" "}
        <TextBox
          label="Write a comment..."
          content={content}
          setContent={setContent}
        />
        <div className="flex justify-end">
          <IconButton
            className="bg-transparent hover:bg-blue-300/20 dark:hover:bg-blue-500/20  flex text-blue-500 dark:text-blue-300 active:bg-blue-500/30 dark:active:bg-blue-500/80 text-[1.2rem]"
            icon={isLoading ? <LoadingSpinner /> : <IoSend />}
            disabled={!content || isLoading}
            onClick={onSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateComment;
