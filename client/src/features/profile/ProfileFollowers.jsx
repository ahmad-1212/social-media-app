import Heading from "../../Components/UI/Heading";
import Section from "../../Components/UI/Section";
import ProfileFollow from "./ProfileFollow";

const ProfileFollowers = ({ users }) => {
  if (!users.length) return null;
  return (
    <Section>
      <Heading>Followers</Heading>
      <div className="flex flex-nowrap py-6 overflow-y-auto scrollbare gap-5">
        {users.map((user) => (
          <ProfileFollow followers={true} user={user} key={user._id} />
        ))}
      </div>
    </Section>
  );
};

export default ProfileFollowers;
