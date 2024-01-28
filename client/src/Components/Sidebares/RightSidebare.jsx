import FollowingUsers from "../../features/follow/FollowingUsers";
import SuggestedUsers from "../../features/follow/SuggestedUsers";

const RightSidebare = () => {
  return (
    <aside className="sidebare overflow-hidden right-0 pl-5 border-l-2 border-black/5 dark:border-black/40">
      <FollowingUsers />
      <SuggestedUsers />
    </aside>
  );
};

export default RightSidebare;
