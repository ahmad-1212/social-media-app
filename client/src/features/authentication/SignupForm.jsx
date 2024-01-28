import { useForm } from "react-hook-form";
import Input from "../../Components/UI/Input";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

import Button from "../../Components/UI/Button";
import { useSignup } from "./useSignup";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm();

  const { signup, isLoading } = useSignup();
  const queryClient = useQueryClient();

  // Handle submit logic
  const onSubmit = (data) => {
    // If error check what type of errro and create it
    signup(data, {
      onSuccess: () => {
        toast.success("Signup successfull!", { autoClose: 5000 });
        queryClient.invalidateQueries({ queryKey: ["current-user"] });
      },
      onError: (err) => {
        if (err.response) {
          // If error is about the name field
          if (err.response.data.message.includes("name"))
            setError("name", {
              type: "name",
              message: err.response.data.message,
            });
          // If error is about the email field
          if (err.response.data.message.includes("email"))
            setError("email", {
              type: "email",
              message: err.response.data.message,
            });
          // If error is about the password field
          if (err.response.data.message.includes("password"))
            setError("password", {
              type: "password",
              message: err.response.data.message,
            });
          else {
            // If error is about non of the above filed simply display it
            toast.error(err.response.data.message, { autoClose: 6000 });
          }
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-1">
      <Input
        id="name"
        type="text"
        label="Name"
        register={register}
        required="Name is required"
        error={errors?.name && errors?.name}
        disabled={isLoading}
      />
      <Input
        id="email"
        type="email"
        label="Email"
        register={register}
        required="Email is required!"
        error={errors?.email && errors?.email}
        disabled={isLoading}
      />

      <Input
        id="password"
        type="password"
        minLength={8}
        label="Password"
        register={register}
        required="Password is required!"
        error={errors?.password && errors?.password}
        disabled={isLoading}
      />

      <Input
        id="confirmPassword"
        type="password"
        label="Confirm password"
        register={register}
        required="Confirm Password is required!"
        getValues={getValues}
        error={errors?.confirmPassword && errors?.confirmPassword}
        disabled={isLoading}
      />

      <Button
        type="submit"
        disabled={isLoading}
        isLoading={isLoading}
        className="text-[1rem] md:text-xl py-1.5 sm:py-2 md:py-3"
      >
        signup
      </Button>
      <div className="flex items-center gap-x-2 text-[0.6rem] sm:text-[0.9rem] justify-center">
        <span>Already have an Account?</span>{" "}
        <NavLink to="/login" className="text-blue-500 dark:text-blue-400">
          Login
        </NavLink>
      </div>
    </form>
  );
};

export default SignupForm;
