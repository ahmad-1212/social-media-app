import { useQueryClient } from "@tanstack/react-query";
import { HiX } from "react-icons/hi";
import { toast } from "react-toastify";

import IconButton from "../../Components/UI/IconButton";
import Tooltip from "../../Components/UI/Tooltip";
import { useDeleteComment } from "./useDeleteComment";
import LoadingSpinner from "../../Components/UI/LoadingSpinner";
import Modal from "../../Components/UI/Modal";
import ConfirmDelete from "../../Components/UI/ConfirmDelete";

const DeleteComment = ({ commentId, setNumOfComments, postId }) => {
  const { deleteComment, isLoading } = useDeleteComment();
  const queryClient = useQueryClient();

  const handleDelete = () => {
    deleteComment(commentId, {
      onError: (err) => toast.error(err.response.data.message),
      onSuccess: () => {
        toast.success("Comment Deleted!", { autoClose: 5000 });
        // decrease the comments by 1
        setNumOfComments((prev) => prev - 1);
        queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      },
    });
  };
  return (
    <Modal>
      <Tooltip text="Delete">
        <Modal.Open>
          <IconButton
            icon={isLoading ? <LoadingSpinner /> : <HiX />}
            disabled={isLoading}
            className="text-[1rem] p-1 bg-transparent"
          />
        </Modal.Open>
      </Tooltip>
      <Modal.Window center={true} closeOnOverlay={true}>
        <ConfirmDelete
          resourceName="Comment?"
          isLoading={isLoading}
          onClick={handleDelete}
        />
      </Modal.Window>
    </Modal>
  );
};

export default DeleteComment;
