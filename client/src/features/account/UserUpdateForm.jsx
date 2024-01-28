import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import Input from "../../Components/UI/Input";
import UserImage from "./UserImage";
import Heading from "../../Components/UI/Heading";
import Button from "../../Components/UI/Button";
import LoadingSpinner from "../../Components/UI/LoadingSpinner";
import FormRow from "../../Components/UI/FormRow";
import { useCurrentUser } from "../authentication/useCurrentUser";
import { useUpdateUser } from "./useUpdateUser";
import Section from "../../Components/UI/Section";

const UserUpdateForm = () => {
  const { user } = useCurrentUser();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });
  const [imageFiles, setImageFiles] = useState(null);
  const { updateUser, isLoading } = useUpdateUser();
  const queryClient = useQueryClient();

  // Set the values to default
  const handleCancel = () => {
    setValue("name", user.name);
    setValue("email", user.email);
  };

  // Submit data
  const onSubmit = (data) => {
    const { name, email } = data;
    updateUser(
      { name, email, file: imageFiles },
      {
        onSuccess: () => {
          toast.success("Data updated successfully!", { autoClose: 5000 });
          setImageFiles(null);
          queryClient.invalidateQueries({ queryKey: ["current-user"] });
        },

        onError: (err) => {
          if (err.response.data.message.includes("email")) {
            return setError("email", {
              type: "email",
              message: err.response.data.message,
            });
          }

          toast.error(err.response.data.message);
        },
      }
    );
  };
  return (
    <>
      <UserImage onSetImageFiles={setImageFiles} />
      <Section>
        <Heading className="font-[500] mb-8">Update user data</Heading>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full bg-white dark:bg-gray-900 p-7 rounded-md shadow-sm"
        >
          <FormRow label="Full Name" htmlFor="name">
            <Input
              id="name"
              type="text"
              register={register}
              required="Name is required!"
              error={errors?.name && errors?.name}
              disabled={isLoading}
              className="text-[1rem] opacity-90 dark:opacity-80"
            />
          </FormRow>
          <FormRow label="Email address" htmlFor="email">
            <Input
              id="email"
              type="text"
              register={register}
              required="Email is required!"
              error={errors?.email && errors?.email}
              disabled={isLoading}
              className="text-[1rem] opacity-90 dark:opacity-80"
            />
          </FormRow>
          <div className="flex justify-end gap-3 mt-6">
            <Button
              disabled={isLoading}
              type="button"
              onClick={handleCancel}
              variant="transparent"
              className="border border-gray-500 py-3  dark:border-gray-800/50"
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              type="submit"
              className="w-max normal-case py-3 px-2.5 flex gap-2 items-center"
            >
              {isLoading && <LoadingSpinner className="border-blue-200" />}{" "}
              <span>Update Account</span>
            </Button>
          </div>
        </form>
      </Section>
    </>
  );
};

export default UserUpdateForm;
