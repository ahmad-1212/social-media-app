import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import ProfileDetail from "../features/profile/ProfileDetail";

const Profile = () => {
  const { profileId } = useParams();
  const queryClient = useQueryClient();
  useEffect(() => {
    // scroll to top
    window.scrollTo(0, 0);
    // ON unmounting remove all posts to fetch new ones
    return () => queryClient.removeQueries({ queryKey: ["posts"] });
  }, [queryClient, profileId]);
  return <ProfileDetail />;
};

export default Profile;
