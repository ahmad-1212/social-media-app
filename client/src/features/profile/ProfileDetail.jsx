import useUser from "../authentication/useUser";
import FullPageLoading from "../../Components/UI/FullPageLoading";
import ProfileCover from "./ProfileCover";
import ProfileUser from "./ProfileUser";
import ProfileFollowing from "./ProfileFollowing";
import ProfileFollowers from "./ProfileFollowers";
import ProfileUserPosts from "./ProfileUserPosts";

const ProfileDetail = () => {
  const { user, isLoading } = useUser();

  return (
    <>
      {isLoading && <FullPageLoading />}
      {!isLoading && (
        <>
          <ProfileCover user={user} />
          <ProfileUser user={user} />
          <ProfileFollowing users={user.following} />
          <ProfileFollowers users={user.followers} />
          <ProfileUserPosts />
        </>
      )}
    </>
  );
};

export default ProfileDetail;
