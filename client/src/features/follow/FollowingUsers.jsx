import Heading from "../../Components/UI/Heading";
import { useCurrentUser } from "../authentication/useCurrentUser";
import Following from "./Following";

const FollowingUsers = () => {
  const {
    user: { following },
  } = useCurrentUser();
  return (
    <>
      {!!following.length  && (
        <div className="scrollbare pt-6  flex flex-col h-1/2 overflow-y-auto border-b-2 border-b-gray-600">
          <Heading className="mb-2 text-xl">Following</Heading>
          {following.map((followingUser) => (
            <Following key={followingUser._id} user={followingUser} />
          ))}
        </div>
      )}
    </>
  );
};

export default FollowingUsers;
