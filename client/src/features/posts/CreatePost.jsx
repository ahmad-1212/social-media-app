import { Link } from "react-router-dom";
import LoadingAvatar from "../../Components/UI/LoadingAvatar";
import Modal from "../../Components/UI/Modal";
import CreatePostWindow from "./CreatePostWindow";
import { useCurrentUser } from "../authentication/useCurrentUser";
import { useScreen } from "../../hooks/useScreen";

const CreatePost = () => {
  const { user } = useCurrentUser();
  const { screen } = useScreen();
  return (
    <div className="bg-white dark:bg-gray-900 w-full shadow-sm rounded-md px-8 py-9 flex gap-4">
      <Link to={`/profile/${user._id}`}>
        <LoadingAvatar
          src={user?.photo ?? "/demo-img.jpg"}
          alt={`${user.name} image`}
          width={screen > 550 ? "3.6rem" : "2.5rem"}
          height={screen > 550 ? "3.6rem" : "2.5rem"}
        />
      </Link>
      <div className="gap-2 grow">
        <Modal>
          <Modal.Open>
            <div className="bg-gray-500 dark:bg-gray-800/90 rounded-full py-1 sm:py-2 px-4 sm:px-7 cursor-pointer font-[300] w-full grow hover:bg-gray-600/40 active:bg-gray-600/60 transition-colors duration-100 mb-2 sm:mb-4 md:text-[1rem] text-[0.8rem]">
              What&apos;s on your mind, {user.name.split(" ")[0]}?
            </div>
          </Modal.Open>
          <Modal.Open>
            <span className="underline underline-offset-4 text-blue-500 cursor-pointer hover:text-blue-600/80 dark:hover:text-blue-400 active:text-blue-600/90">
              Create post
            </span>
          </Modal.Open>
          <Modal.Window>
            <CreatePostWindow />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
};

export default CreatePost;
