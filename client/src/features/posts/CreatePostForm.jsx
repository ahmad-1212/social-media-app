import { useState } from "react";
import { Dropzone, FileMosaic } from "@files-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useCurrentUser } from "../authentication/useCurrentUser";
import TextBox from "../../Components/UI/TextBox";
import Button from "../../Components/UI/Button";
import { useUploadPost } from "./useUploadPost";
import { useScreen } from "../../hooks/useScreen";

const CreatePostForm = ({ onCloseModal }) => {
  const { user } = useCurrentUser();
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const { uploadPost, isLoading } = useUploadPost();
  const queryClient = useQueryClient();
  const { screen } = useScreen();
  const theme = localStorage.getItem("theme");

  const updateFiles = (incommingFiles) => {
    if (incommingFiles.at(0).size > 5000000) {
      toast.error(
        "Image is too large, the post image should be less than 5mb",
        {
          autoClose: 6000,
        }
      );
      return;
    }
    setFiles(incommingFiles);
  };
  const removeFile = () => {
    setFiles([]);
  };

  // Submit data
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {};
    data.description = content;
    if (files.length) data.file = files[0];

    uploadPost(data, {
      onError: (err) => toast.error(err.response.data.message),
      onSuccess: () => {
        toast.success("Post successfully created!", { autoClose: 5000 });
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        onCloseModal();
      },
    });
  };

  return (
    <form className="ml-4">
      <TextBox
        content={content}
        setContent={setContent}
        label={`What's on your mind, ${user?.name.split(" ")[0]}?`}
        className={`w-full mb-5 ${
          content.length < 90 ? "text-[1rem] sm:text-2xl" : "sm:text-[1rem]"
        }`}
        width="100%"
        height={screen >= 640 ? "100px" : "70px"}
      />
      <Dropzone
        minHeight="200px"
        accept="image/*"
        header={false}
        footer={false}
        onChange={updateFiles}
        value={files}
        maxFiles={1}
        label="Add Photos or drag and drop"
        className="mb-4"
        color={theme === "dark" ? "white" : "#575757"}
        style={{ width: "98%" }}
        clickable={!files.length}
        behaviour="replace"
      >
        {files.map((file) => (
          <FileMosaic key={file.name} {...file} preview onDelete={removeFile} />
        ))}
      </Dropzone>
      <Button
        onClick={handleSubmit}
        disabled={isLoading || !files.length}
        isLoading={isLoading}
        type="submit"
        className=" text-[1.2rem] py-1 sm:py-2"
      >
        Post
      </Button>
    </form>
  );
};

export default CreatePostForm;
