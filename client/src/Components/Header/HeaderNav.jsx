import { NavLink } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { MdOutlineHome } from "react-icons/md";
import { MdNotifications } from "react-icons/md";
import { MdOutlineNotificationsNone } from "react-icons/md";

import Tooltip from "../UI/Tooltip";
import { useCurrentUser } from "../../features/authentication/useCurrentUser";

const HeaderNav = () => {
  const { user } = useCurrentUser();
  // Styles //
  const styles =
    "hover:bg-black/5 dark:hover:bg-black/20 active:bg-black/10 dark:active:bg-black/30 flex items-center px-7 sm:px-10 text-2xl sm:text-3xl w-full h-full ";
  const activeStyles =
    "text-blue-500 dark:text-blue-400 border-b-2  border-blue-500 dark:border-blue-400";

  return (
    <nav className="basis-40 sm:basis-56 flex justify-between self-stretch">
      <Tooltip text="Home">
        <NavLink
          to="/home"
          className={({ isActive }) => {
            return isActive ? styles + activeStyles : styles;
          }}
        >
          {({ isActive }) => {
            return isActive ? <IoMdHome /> : <MdOutlineHome />;
          }}
        </NavLink>
      </Tooltip>
      <Tooltip text="Notifications">
        <NavLink
          to="/notifications"
          className={({ isActive }) => {
            return isActive ? styles + activeStyles : styles;
          }}
        >
          {({ isActive }) => {
            return isActive ? (
              <div className={user?.notification ? "notification" : ""}>
                <MdNotifications />
              </div>
            ) : (
              <div className={user?.notification ? "notification" : ""}>
                <MdOutlineNotificationsNone />
              </div>
            );
          }}
        </NavLink>
      </Tooltip>
    </nav>
  );
};

export default HeaderNav;
