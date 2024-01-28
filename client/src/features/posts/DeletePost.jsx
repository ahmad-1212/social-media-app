import { useQueryClient } from "@tanstack/react-query";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";

import IconButton from "../../Components/UI/IconButton";
import Tooltip from "../../Components/UI/Tooltip";
import Modal from "../../Components/UI/Modal";
import ConfirmDelete from "../../Components/UI/ConfirmDelete";
import { useDeletePost } from "./useDeletePost";

const DeletePost = ({ postId }) => {
  const { deletePost, isLoading } = useDeletePost();
  const queryClient = useQueryClient();

  const handleDeletePost = () => {
    deletePost(postId, {
      onSuccess: () => {
        toast.success("Post successfully deleted!", { autoClose: 5000 });
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
      onError: (err) => toast.error(err.response.data.message),
    });
  };

  return (
    <Modal>
      <Modal.Open>
        <div className="ml-auto mr-3">
          <Tooltip text="Delete">
            {" "}
            <IconButton
              className="text-red-600 text-[1.3rem] bg-transparent
      hover:bg-red-500/15"
              icon={<AiFillDelete />}
            />
          </Tooltip>
        </div>
      </Modal.Open>
      <Modal.Window closeOnOverlay={!isLoading} center={true}>
        <ConfirmDelete
          resourceName="Post?"
          onClick={handleDeletePost}
          isLoading={isLoading}
        />
      </Modal.Window>
    </Modal>
  );
};

export default DeletePost;
