import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";

import Avatar from "../../Components/UI/Avatar";
import Heading from "../../Components/UI/Heading";
import { useCurrentUser } from "../authentication/useCurrentUser";
import { useScreen } from "../../hooks/useScreen";
import Section from "../../Components/UI/Section";

const UserImage = ({ onSetImageFiles }) => {
  const { user } = useCurrentUser();
  const [imageUrl, setImageUrl] = useState(user?.photo);
  const { screen } = useScreen();

  const handleImageChange = (e) => {
    // If image size is greater than 5MB return and error
    if (e.target.files[0].size > 5000000) {
      toast.error("Image is too large, you can upload image upto 5mb", {
        autoClose: 5000,
      });
      return;
    }

    // Create url from selected file
    const url = URL.createObjectURL(e.target.files[0]);
    setImageUrl(url);
    onSetImageFiles(e.target.files[0]);
  };

  return (
    <Section>
      <Heading className="mt-[6rem] sm:mt-[8rem] text-[2rem] mb-4">
        Update your account
      </Heading>
      <div className="flex justify-center">
        <div className="relative">
          <Avatar
            src={imageUrl ?? "/demo-img.jpg"}
            width={screen >= 768 ? "15rem" : "12rem"}
            height={screen >= 768 ? "15rem" : "12rem"}
            className="w-full h-full image"
          />
          <label
            htmlFor="user-img"
            className="absolute bottom-[10px] right-[20px] flex justify-center gap-1 items-center cursor-pointer bg-gray-800/80 text-gray-500 px-4 py-1 rounded-md font-[400] hover:bg-gray-800 active:bg-gray-800"
          >
            <FiEdit />
            <span>Edit</span>
          </label>
          <input
            type="file"
            accept="image/*"
            hidden
            id="user-img"
            onChange={handleImageChange}
          />
        </div>
      </div>
    </Section>
  );
};

export default UserImage;
