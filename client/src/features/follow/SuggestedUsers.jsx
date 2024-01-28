import { useSuggestedUsers } from "./useSuggestedUsers";
import LoadingSpinner from "../../Components/UI/LoadingSpinner";
import Following from "./Following";
import { useCurrentUser } from "../authentication/useCurrentUser";
import Heading from "../../Components/UI/Heading";

const SuggestedUsers = () => {
  const {
    user: { following },
  } = useCurrentUser();
  const { data, isLoading } = useSuggestedUsers();

  return (
    <div
      className={`overflow-y-auto scrollbare flex flex-col ${
        following.length === 0 ? "h-full" : "h-1/2"
      }`}
    >
      <Heading className="my-2 text-xl">Suggested for you</Heading>
      {isLoading && (
        <div className="flex justify-center items-center mt-9">
          <LoadingSpinner />
        </div>
      )}
      {data?.suggestedUsers.length === 0 && (
        <h4 className="text-[1rem] font-[500] text-center mt-9">
          No suggestion yet!
        </h4>
      )}
      {!isLoading &&
        data?.suggestedUsers?.map((user) => (
          <Following user={user} key={user._id} suggestedUsers={true} />
        ))}
    </div>
  );
};

export default SuggestedUsers;
