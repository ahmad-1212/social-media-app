import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { useQueryClient } from "@tanstack/react-query";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { toast } from "react-toastify";

import { useCurrentUser } from "../authentication/useCurrentUser";
import { useUpdateCoverPhoto } from "./useUpdateCoverPhoto";

import Button from "../../Components/UI/Button";

const ProfileCover = ({ user }) => {
  const { user: currentUser } = useCurrentUser();
  const [imageUrl, setImageUrl] = useState(user?.coverPhoto);
  const [files, setFiles] = useState([]);
  const { updateCoverPhoto, isLoading } = useUpdateCoverPhoto();

  const queryClient = useQueryClient();

  const handleImageChange = (e) => {
    const url = URL.createObjectURL(e.target.files[0]);
    if (e.target.files[0].size > 5000000) {
      toast.error("Image is to large, you can upload image upto 5mb", {
        autoClose: 5000,
      });
      return;
    }
    setImageUrl(url);
    setFiles(e.target.files);
  };

  // Upload image
  const uploadCoverImage = () => {
    updateCoverPhoto(files[0], {
      onSuccess: (data) => {
        toast.success("Cover image successfully updated!", { autoClose: 5000 });
        queryClient.setQueryData(["user", user._id], data.data.user);
        setFiles([]);
      },
      onError: (err) => toast.error(err.response.data.message),
    });
  };

  const styles = `rounded-md flex items-center gap-2  w-max normal-case py-1 px-3 text-white cursor-pointer bg-gray-800 dark:bg-gray-800  bg-opacity-60 dark:bg-opacity-70 hover:bg-gray-800 hover:bg-opacity-90 active:bg-gray-800 font-[500]`;

  return (
    <section>
      <div className="image-gradient image w-full h-[240px] sm:h-[300px] overflow-hidden relative md:rounded-b-md ">
        <LazyLoadImage
          src={imageUrl ?? "/placeholder-image.jpg"}
          placeholderSrc="/placeholder-image.jpg"
          className="w-full h-full object-cover "
        />
        {currentUser._id === user._id && (
          <div className="absolute bottom-5 right-6 flex flex-col gap-3">
            <input
              type="file"
              accept="image/*"
              hidden
              id="update-cover"
              disabled={isLoading}
              onChange={handleImageChange}
            />
            <label htmlFor="update-cover" className={styles}>
              <span>
                <FaRegEdit />
              </span>
              <span>Edit cover photo</span>
            </label>
            {files.length > 0 && (
              <Button
                disabled={isLoading}
                onClick={uploadCoverImage}
                className={`${styles} disabled:hover:bg-gray-800`}
              >
                <span>
                  <FiUpload />
                </span>
                <span>{isLoading ? "Uploading..." : "Upload image"}</span>
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfileCover;
