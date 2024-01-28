import { Link, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import Avatar from "../../Components/UI/Avatar";
import Button from "../../Components/UI/Button";
import Card from "../../Components/UI/Card";
import { useCurrentUser } from "../authentication/useCurrentUser";
import { useUnfollowUser } from "../follow/useUnfollowUser";
import { useFollowUser } from "../follow/useFollowUser";
import { useScreen } from "../../hooks/useScreen";

const ProfileFollow = ({ user, following = false }) => {
  const { profileId } = useParams();
  const { user: currentUser } = useCurrentUser();
  const { unFollowUser, isLoading: isunfollowingUser } = useUnfollowUser();
  const { followUser, isLoading: isfllowingUser } = useFollowUser();
  const queryClient = useQueryClient();
  const { screen } = useScreen();

  const isFollowing = currentUser.following.find(
    (item) => item._id === user._id
  );

  // Unfollow a user
  const unfollow = () => {
    unFollowUser(user._id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["user", currentUser._id],
        });
        queryClient.invalidateQueries({ queryKey: ["current-user"] });
      },
      onError: (err) => toast.error(err.response.data.message),
    });
  };

  // Follow a user
  const follow = () => {
    followUser(user._id, {
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: ["user", currentUser._id],
        }),
      onError: (err) => toast.error(err.response.data.message),
    });
  };

  const buttons = following ? (
    <Button
      onClick={unfollow}
      isLoading={isunfollowingUser}
      disabled={isunfollowingUser}
      className="mt-2 py-1 px-4 text-[0.8rem] md:text-[1rem]"
    >
      Un follow
    </Button>
  ) : (
    <Button
      onClick={isFollowing ? unfollow : follow}
      isLoading={isfllowingUser || isunfollowingUser}
      disabled={isfllowingUser || isunfollowingUser}
      className="py-1 px-4 w-full text-[0.8rem] lg:text-[1rem]"
    >
      {isFollowing ? "unfollow" : "follow back"}
    </Button>
  );

  return (
    <Card className="min-w-[14rem] overflow-hidden">
      <div className="py-3 px-5 flex flex-col items-center">
        <Link to={`/profile/${user._id}`}>
          <Avatar
            src={user.photo ?? "/demo-img.jpg"}
            width={screen >= 768 ? "3.5rem" : "3rem"}
            height={screen >= 768 ? "3.5rem" : "3rem"}
          />
        </Link>
        <div className="my-4 flex flex-col items-center">
          {" "}
          <Link to={`/profile/${user._id}`}>
            <h4 className="text-[1rem] md:text-xl font-[600] w-max">
              {user.name}
            </h4>
          </Link>
          <p className="text-[0.7rem] md:text-[0.9rem]">{user.email}</p>
          {!following && profileId === currentUser._id && (
            <span className="text-sm font-[500] mt-3 bg-gray-500 dark:bg-gray-800 py-1 px-3 rounded-md">
              &middot; {isFollowing ? "Following" : "Not Following"}
            </span>
          )}
        </div>
        {profileId === currentUser._id && buttons}
      </div>
    </Card>
  );
};

export default ProfileFollow;
