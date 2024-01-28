import { useScreen } from "../../hooks/useScreen";
import LoadingAvatar from "../UI/LoadingAvatar";

const HeaderUserDetails = ({ user }) => {
  const { screen } = useScreen();
  return (
    <div className="mx-4 mb-4 py-4 flex items-center gap-3 border-b-2 border-gray-500 dark:border-gray-500/5">
      <LoadingAvatar
        src={user?.photo ?? "/demo-img.jpg"}
        alt={`${user.name} image`}
        width={screen >= 640 ? "4rem" : "3rem"}
        height={screen >= 640 ? "4rem" : "3rem"}
      />
      <div>
        <h5 className="font-[500]">{user?.name}</h5>
        <p className="text-[0.7rem]">{user?.email}</p>
      </div>
    </div>
  );
};

export default HeaderUserDetails;
