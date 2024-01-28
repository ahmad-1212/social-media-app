import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Button from "../../Components/UI/Button";
import Heading from "../../Components/UI/Heading";
import Input from "../../Components/UI/Input";
import FormRow from "../../Components/UI/FormRow";
import { useUpdatePassword } from "./useUpdatePassword";
import LoadingSpinner from "../../Components/UI/LoadingSpinner";
import Section from "../../Components/UI/Section";

const UserUpdatePasswordForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setError,
    formState: { errors },
  } = useForm();
  const { updatePassword, isLoading } = useUpdatePassword();

  // submit data
  const onSubmit = (data) => {
    updatePassword(
      { password: data.password, passwordConfirm: data.confirmPassword },
      {
        onSuccess: () => {
          toast.success("Password updated!", { autoClose: 5000 });
          reset();
        },
        onError: (err) =>
          setError("password", {
            type: "password",
            message: err.response.data.message,
          }),
      }
    );
  };

  return (
    <Section>
      <Heading className="font-[500] mb-8">Update password</Heading>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full bg-white dark:bg-gray-900 p-7 rounded-md shadow-sm"
      >
        <FormRow label="Password" htmlFor="password">
          <Input
            id="password"
            type="password"
            minLength={8}
            register={register}
            required="Password is required!"
            error={errors?.password && errors?.password}
            disabled={isLoading}
            className="text-[1rem] opacity-90 dark:opacity-80"
          />
        </FormRow>
        <FormRow label="Confirm Password" htmlFor="confirmPassword">
          <Input
            id="confirmPassword"
            type="password"
            register={register}
            required="Confirm password is required!"
            error={errors?.confirmPassword && errors?.confirmPassword}
            disabled={isLoading}
            getValues={getValues}
            className="text-[1rem] opacity-90 dark:opacity-80"
          />
        </FormRow>
        <div className="flex justify-end gap-3 mt-6">
          <Button
            disabled={isLoading}
            type="reset"
            onClick={reset}
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
            <span>Update password</span>
          </Button>
        </div>
      </form>
    </Section>
  );
};

export default UserUpdatePasswordForm;
