import { HiX } from "react-icons/hi";

import IconButton from "../../Components/UI/IconButton";
import CreatePostForm from "./CreatePostForm";
import LoadingAvatar from "../../Components/UI/LoadingAvatar";
import { useCurrentUser } from "../authentication/useCurrentUser";
import { useScreen } from "../../hooks/useScreen";

const CreatePostWindow = ({ onCloseModal }) => {
  const { user } = useCurrentUser();
  const { screen } = useScreen();
  return (
    <div className=" w-[90dvw] sm:w-[500px] h-[70dvh] min-h-[300px] overflow-y-auto relative p-3">
      <header className="py-4 flex justify-center border-b-2 border-black/10 mb-3">
        <h3 className="text-2xl font-[700]">Create post</h3>
        <IconButton
          onClick={onCloseModal}
          icon={<HiX />}
          className="absolute right-3 text-[1.3rem] top-3"
        />
      </header>
      <div className="flex items-center gap-3 ml-4 mb-4">
        <LoadingAvatar
          src={user?.photo ?? "/demo-img.jpg"}
          alt="Profile img"
          width={screen >= 640 ? "3rem" : "2.5rem"}
          height={screen >= 640 ? "3rem" : "2.5rem"}
        />
        <h5 className="text-[1rem] font-[500]">{user?.name}</h5>
      </div>
      <CreatePostForm onCloseModal={onCloseModal} />
    </div>
  );
};

export default CreatePostWindow;
