import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useCurrentUser } from "../../features/authentication/useCurrentUser";
import FullPageLoading from "./FullPageLoading";

const ProtectedRoute = ({ children, authPage = false }) => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useCurrentUser();
  useEffect(() => {
    // If not authenticated and user is not loading navigate to login page
    if (!isAuthenticated && !isLoading) navigate("/login");

    // If authenticated and not loading and AuthPage navigate to Home page
    if (isAuthenticated && !isLoading && authPage) navigate("/home");

    //eslint-disable-next-line
  }, [isAuthenticated, isLoading, authPage]);

  if (isLoading) return <FullPageLoading />;

  return children;
};

export default ProtectedRoute;
