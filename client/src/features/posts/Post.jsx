import { forwardRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { useQueryClient } from "@tanstack/react-query";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { toast } from "react-toastify";

import Avatar from "../../Components/UI/Avatar";
import PostButton from "../../Components/UI/PostButton";
import "react-lazy-load-image-component/src/effects/blur.css";
import Comments from "../comments/Comments";
import CreateComment from "../comments/CreateComment";
import { useCurrentUserLikes } from "../authentication/useCurrentUserLikes";
import { useLikePost } from "./useLikePost";
import { useRemoveLike } from "./useRemoveLike";
import { useCurrentUser } from "../authentication/useCurrentUser";
import DeletePost from "./DeletePost";
import { formateDate } from "../../utils/helpers";
import { useScreen } from "../../hooks/useScreen";

const Post = forwardRef(function Post({ post }, ref) {
  const { user } = useCurrentUser();
  const [showComments, setShowComments] = useState(false);
  const [showCreateComment, setShowCreateComment] = useState(false);
  const { likes } = useCurrentUserLikes();
  const { likePost, isLoading: isAddLoading } = useLikePost();
  const { removeLike, isLoading: isDeleteLoading } = useRemoveLike();
  const [numOfComments, setNumOfComments] = useState(+post.comments);
  const [numOfLikes, setNumOfLikes] = useState(+post.likes);
  const queryClient = useQueryClient();
  const { screen } = useScreen();

  // Take Post creator from Post
  const { creator } = post;

  // check if current post is liked by the user or not
  const isLiked = likes?.find((like) => like.post === post._id);

  // Add Like to the post onSuccess update the client side data
  const addLike = () => {
    likePost(post._id, {
      onError: (err) => toast.error(err.response.data.message),
      onSuccess: (data) => {
        // increase likes by 1
        setNumOfLikes((prev) => prev + 1);
        // set query data in cache
        queryClient.setQueryData(["user-likes"], (oldLikes) =>
          oldLikes ? [...oldLikes, data] : oldLikes
        );
      },
    });
  };

  // Remove like from post & onSuccess update client side data
  const deleteLike = () => {
    removeLike(post._id, {
      onSuccess: () => {
        // decrease like by 1
        setNumOfLikes((prev) => prev - 1);
        // set querydata in cache
        queryClient.setQueryData(["user-likes"], (oldLikes) =>
          oldLikes
            ? oldLikes.filter((like) => like.post !== post._id)
            : oldLikes
        );
      },
    });
  };

  return (
    <>
      <div
        ref={ref}
        className="w-full bg-white dark:bg-gray-900 rounded-md shadow-md mb-5 py-4 overflow-hidden"
      >
        <div className="flex items-start gap-4 ml-3 mb-3">
          <NavLink to={`/profile/${creator._id}`}>
            <Avatar
              src={creator.photo ?? "/demo-img.jpg"}
              alt={creator.name}
              width={screen >= 640 ? "3rem" : "2.5rem"}
              height={screen >= 640 ? "3rem" : "2.5rem"}
            />
          </NavLink>
          <div>
            <h4 className="font-[500] text-[1rem] sm:text-[1.2rem] hover:underline">
              <NavLink to={`/profile/${creator._id}`}>{creator.name}</NavLink>
            </h4>
            <div className="text-gray-800 dark:text-gray-600 text-[.6rem] sm:text-[0.8rem] font-[400]">
              {formateDate(post.createdAt)}
            </div>
          </div>
          {post.creator._id === user._id && <DeletePost postId={post._id} />}
        </div>
        <div className="w-full min-h-[100px]">
          <div className="ml-3 mb-4 relative">{post.description}</div>
          <div className="min-h-[10rem]">
            <LazyLoadImage
              src={post?.image}
              placeholderSrc="/placeholder-image.jpg"
              width={"100%"}
              effect="blur"
            />
          </div>
        </div>
        <div className="flex justify-between mt-1 px-3 text-[0.7rem] sm:text-[0.8rem] text-gray-700">
          <div>{numOfLikes} Likes</div>
          <div>{numOfComments} Comments</div>
        </div>
        <div className="mt-1 py-2 mx-3 border-t-2 border-b-2 border-gray-500 dark:border-gray-800 grid grid-cols-2 justify-items-center">
          <PostButton
            liked={isLiked}
            disabled={isAddLoading || isDeleteLoading}
            onClick={isLiked ? deleteLike : addLike}
            icon={
              isLiked ? (
                <AiFillLike className="text-[1.3rem]" />
              ) : (
                <AiOutlineLike className="text-[1.3rem]" />
              )
            }
          >
            Like
          </PostButton>
          <PostButton
            onClick={() => setShowCreateComment((prev) => !prev)}
            icon={<FaRegComment className="text-[1.2rem]" />}
            rotate={true}
          >
            Comment
          </PostButton>
        </div>
        {showCreateComment && (
          <CreateComment
            postId={post._id}
            setNumOfComments={setNumOfComments}
          />
        )}
        {showComments ? (
          <Comments
            postId={post._id}
            setNumOfComments={setNumOfComments}
            onHideComments={() => setShowComments(false)}
          />
        ) : (
          <button
            type="button"
            onClick={() => setShowComments(true)}
            className="flex mt-7 ml-3 font-[300] border-b-2 border-gray-700/80  hover:text-gray-900 dark:hover:text-gray-700 cursor-pointer "
          >
            View Comments
          </button>
        )}
      </div>
    </>
  );
});

export default Post;
