import Heading from "../../Components/UI/Heading";
import Section from "../../Components/UI/Section";
import PostsFeed from "../posts/PostsFeed";

const ProfileUserPosts = () => {
  return (
    <Section>
      <Heading>Posts</Heading>
      <div className="w-[95%] sm:w-[550px] md:w-[470px] xl:w-[550px] mx-auto">
        <PostsFeed />
      </div>
    </Section>
  );
};

export default ProfileUserPosts;
