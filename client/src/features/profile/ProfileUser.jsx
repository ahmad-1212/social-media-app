import { FiEdit3 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import LoadingAvatar from "../../Components/UI/LoadingAvatar";
import { useFollowUser } from "../follow/useFollowUser";
import { useUnfollowUser } from "../follow/useUnfollowUser";
import { useCurrentUser } from "../authentication/useCurrentUser";
import Button from "../../Components/UI/Button";
import { useScreen } from "../../hooks/useScreen";
import LoadingSpinner from "../../Components/UI/LoadingSpinner";

const ProfileUser = ({ user }) => {
  const { user: currentUser } = useCurrentUser();
  const { followUser, isLoading: isFollowingUser } = useFollowUser();
  const { unFollowUser, isLoading: isUnFollowingUser } = useUnfollowUser();
  const queryClient = useQueryClient();
  const { screen } = useScreen();

  const isFollowing = currentUser.following.find(
    (item) => item._id === user._id
  );

  // Function to follow or unfollow a user
  const handleClick = () => {
    if (isFollowing) {
      unFollowUser(user._id, {
        onSuccess: () =>
          queryClient.invalidateQueries({
            queryKey: ["user", user._id]["current-user"],
          }),
        onError: (err) => toast.error(err.response.data.message),
      });
    } else {
      followUser(user._id, {
        onSuccess: () =>
          queryClient.invalidateQueries({
            queryKey: ["user", user._id]["current-user"],
          }),
        onError: (err) => toast.error(err.response.data.message),
      });
    }
  };

  return (
    <section
      className={`px-2 sm:px-6 mb-[2rem] sm:mb-[5rem] -mt-14 md:-mt-10 grid grid-cols-1 md:grid-cols-[10rem_1fr] gap-x-4 ${
        user._id === currentUser._id ? "md:items-center" : "md:items-end"
      } items-start`}
    >
      <LoadingAvatar
        src={user?.photo ?? "/demo-img.jpg"}
        width={screen >= 758 ? "10rem" : "8rem"}
        height={screen >= 758 ? "10rem" : "8rem"}
        className=" border-gray-500 dark:border-gray-900 border-4"
      />
      <div className="grow w-full flex  md:justify-between items-end">
        <div className="mt-4">
          <h2 className="text-[1rem] sm:text-2xl md:text-3xl font-[600]">
            {user?.name}
          </h2>
          <p className="text-[0.7rem] md:text-sm">
            {user.followers.length} Followers &middot; {user.following.length}{" "}
            Following
          </p>
          {user._id !== currentUser._id && (
            <div className="flex gap-3">
              {isFollowing && (
                <div className="w-max mt-2 py-2 px-4 bg-gray-600 dark:bg-gray-900 rounded-md">
                  Following
                </div>
              )}
              <Button
                onClick={handleClick}
                disabled={isFollowingUser || isUnFollowingUser}
                className="w-max mt-2 py-2 px-4 flex items-center gap-2"
              >
                {(isFollowingUser || isUnFollowingUser) && <LoadingSpinner />}{" "}
                {isFollowing ? "unfollow" : "follow"}
              </Button>
            </div>
          )}
        </div>
        {user._id === currentUser._id && (
          <Link
            to="/account"
            className="w-max flex rounded-md gap-2 items-center py-1 px-4 bg-gray-600/50 dark:bg-gray-800/80 text-gray-800 dark:text-gray-500 active:bg-gray-600/60 hover:bg-gray-600/70 ml-auto"
          >
            <span>
              <FiEdit3 />
            </span>
            <span>Edit profile</span>
          </Link>
        )}
      </div>
    </section>
  );
};

export default ProfileUser;
