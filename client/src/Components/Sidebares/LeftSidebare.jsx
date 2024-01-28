import { useCurrentUser } from "../../features/authentication/useCurrentUser";
import Followers from "../../features/follow/Followers";
import Heading from "../UI/Heading";

const LeftSidebare = () => {
  const {
    user: { followers },
  } = useCurrentUser();
  return (
    <aside className="scrollbare sidebare left-0 border-r-2 border-black/5 dark:border-black/40">
      <div className="pt-6 pl-5 flex flex-col">
        <Heading>Followers</Heading>
        {followers.length === 0 && (
          <h4 className="font-[500] mt-[10rem] text-center">No followers!</h4>
        )}
        {followers.map((follower) => (
          <Followers key={follower._id} follower={follower} />
        ))}
      </div>
    </aside>
  );
};

export default LeftSidebare;
