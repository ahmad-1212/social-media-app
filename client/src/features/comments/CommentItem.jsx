import { NavLink } from "react-router-dom";

import Avatar from "../../Components/UI/Avatar";
import { useCurrentUser } from "../authentication/useCurrentUser";
import DeleteComment from "./DeleteComment";
import { formateDate } from "../../utils/helpers";
import { useScreen } from "../../hooks/useScreen";

const CommentItem = ({ comment, postId, setNumOfComments }) => {
  const { user } = useCurrentUser();
  const { user: commentUser } = comment;
  const { screen } = useScreen();

  return (
    <li className="flex items-start gap-x-3 mr-6 py-2 px-3">
      <NavLink
        to={`/profile/${commentUser._id}`}
        className="flex items-center mt-1"
      >
        <Avatar
          src={commentUser.photo ?? "/demo-img.jpg"}
          width={screen >= 640 ? "2.5rem" : "2.1rem"}
          height={screen >= 640 ? "2.5rem" : "2.1rem"}
        />
      </NavLink>

      <div className="bg-gray-300 dark:bg-gray-800/40 rounded-md grow py-1 px-5 relative">
        <div className="flex justify-between">
          <div className="flex items-center gap-5 ">
            <NavLink
              className="font-[500] text-[0.8rem] sm:text-[1rem] hover:underline"
              to={`/profile/${commentUser._id}`}
            >
              {" "}
              {commentUser._id === user._id ? "You" : commentUser.name}
            </NavLink>
            <span className="text-[0.6rem] sm:text-[0.8rem] font-[400] opacity-80">
              &middot; {formateDate(comment.createdAt).replace("ago", "")}
            </span>
          </div>

          {user._id === commentUser._id && (
            <DeleteComment
              commentId={comment._id}
              postId={postId}
              setNumOfComments={setNumOfComments}
            />
          )}
        </div>
        <p className="break-all">{comment.content}</p>
      </div>
    </li>
  );
};

export default CommentItem;
