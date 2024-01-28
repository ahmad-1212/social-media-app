import { Link } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

import Avatar from "../../Components/UI/Avatar";
import IconButton from "../../Components/UI/IconButton";
import Tooltip from "../../Components/UI/Tooltip";
import { useFollowUser } from "./useFollowUser";
import LoadingSpinner from "../../Components/UI/LoadingSpinner";
import { useUnfollowUser } from "./useUnfollowUser";

const Following = ({ user, suggestedUsers = false }) => {
  const { followUser, isLoading: isFollowing } = useFollowUser();
  const { unFollowUser, isLoading: isUnfollowing } = useUnfollowUser();
  const queryClient = useQueryClient();

  const follow = () => {
    followUser(user._id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["current-user"] });
        queryClient.setQueryData(["suggested-users"], (oldData) => {
          const suggestedUsers = [...oldData.suggestedUsers];
          const newUsers = suggestedUsers.filter(
            (sugUser) => sugUser._id !== user._id
          );
          return {
            ...oldData,
            suggestedUsers: [...newUsers],
          };
        });
      },
      onError: (err) => toast.error(err.response.data.message),
    });
  };
  const unfollow = () => {
    unFollowUser(user._id, {
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["current-user"] }),
      onError: (err) => toast.error(err.response.data.message),
    });
  };

  return (
    <div className="p-3 xl:mr-4 rounded-lg  flex items-center  hover:bg-black/5 dark:hover:bg-white/10 ">
      <Link to={`/profile/${user._id}`}>
        <Avatar
          src={user.photo ?? "/demo-img.jpg"}
          width="2.6rem"
          height="2.6rem"
        />
      </Link>
      <Link to={`/profile/${user._id}`}>
        <h5 className="text-[0.9rem] font-[600] xl:mx-4 mx-2">{user.name}</h5>
      </Link>
      {!suggestedUsers && (
        <div className="ml-auto">
          <Tooltip text="unfollow" disabled={isUnfollowing} left={true}>
            {!isUnfollowing ? (
              <IconButton
                onClick={unfollow}
                disabled={isUnfollowing}
                className="rounded-md ml-auto p-[5px]"
                icon={<FaMinus className="text-[0.7rem]" />}
              />
            ) : (
              <LoadingSpinner />
            )}
          </Tooltip>
        </div>
      )}
      {suggestedUsers && (
        <div className="ml-auto">
          <Tooltip text="Follow" disabled={isFollowing} left={true}>
            {!isFollowing ? (
              <IconButton
                onClick={follow}
                disabled={isFollowing}
                className="rounded-md ml-auto p-[5px]"
                icon={<FaPlus className="text-[0.7rem]" />}
              />
            ) : (
              <LoadingSpinner />
            )}
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default Following;
