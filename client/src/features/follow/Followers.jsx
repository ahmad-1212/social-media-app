import { Link } from "react-router-dom";
import Avatar from "../../Components/UI/Avatar";

const Followers = ({ follower }) => {
  return (
    <Link
      to={`/profile/${follower._id}`}
      className="p-4 rounded-lg active:bg-black/10 dark:active:bg-white/15 flex items-center gap-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 "
    >
      <Avatar
        src={follower.photo ?? "/demo-img.jpg"}
        width="3rem"
        height="3rem"
      />
      <h5 className="text-[0.9rem] font-[600]">{follower.name}</h5>
    </Link>
  );
};

export default Followers;
