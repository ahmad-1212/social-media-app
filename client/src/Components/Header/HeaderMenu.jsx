import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";

import Menus from "../UI/Menu";
import HeaderMenuItem from "./HeaderMenuItem";
import HeaderUserDetails from "./HeaderUserDetails";
import LoadingAvatar from "../UI/LoadingAvatar";
import Tooltip from "../UI/Tooltip";
import { useLogout } from "../../features/authentication/useLogout";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useCurrentUser } from "../../features/authentication/useCurrentUser";
import { useScreen } from "../../hooks/useScreen";

const HeaderMenu = () => {
  const { user } = useCurrentUser();
  const navigate = useNavigate();
  const { logout, isLoading } = useLogout();
  const { screen } = useScreen();

  // Navigate to profile
  const handleProfileClick = () => {
    navigate(`profile/${user._id}`);
  };

  // Handle logout
  const handleLogout = () => {
    logout(null, {
      onSuccess: () =>
        toast.success("Logout successfull!", { autoClose: 5000 }),
      onError: (err) => toast.error(err.response.data.message),
    });
  };

  return (
    <Menus>
      <Menus.Menu>
        <Menus.Toggle>
          {" "}
          <Tooltip text="Account" className="z-20">
            <LoadingAvatar
              src={user?.photo ?? "/demo-img.jpg"}
              alt={`${user?.name} profile image`}
              width={screen >= 640 ? "3.5rem" : "3rem"}
              height={screen >= 640 ? "3.5rem" : "3rem"}
              cursor="pointer"
            />
          </Tooltip>
        </Menus.Toggle>
        <Menus.List>
          <HeaderUserDetails user={user} />
          <HeaderMenuItem
            icon={<FaRegUserCircle />}
            text="My Profile"
            onClick={handleProfileClick}
          />
          <HeaderMenuItem
            icon={isLoading ? <LoadingSpinner /> : <FiLogOut />}
            text="Logout"
            onClick={handleLogout}
          />
        </Menus.List>
      </Menus.Menu>
    </Menus>
  );
};

export default HeaderMenu;
