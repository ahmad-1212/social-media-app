import Heading from "../../Components/UI/Heading";
import Section from "../../Components/UI/Section";
import ProfileFollow from "./ProfileFollow";

const ProfileFollowing = ({ users }) => {
  if (!users.length) return null;
  return (
    <Section>
      <Heading>Following</Heading>
      <div className="flex flex-nowrap py-6 overflow-y-auto scrollbare gap-5">
        {users.map((user) => (
          <ProfileFollow following={true} user={user} key={user._id} />
        ))}
      </div>
    </Section>
  );
};

export default ProfileFollowing;
