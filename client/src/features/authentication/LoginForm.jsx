import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

import { useLogin } from "./useLogin";
import Input from "../../Components/UI/Input";
import Button from "../../Components/UI/Button";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const { login, isLoading } = useLogin();
  const queryClient = useQueryClient();

  // Handle submit login
  const onSubmit = (data) => {
    // If error check what type of error and create it
    login(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["current-user"] });
        toast.success("Login successfull!", { autoClose: 5000 });
      },
      onError: (err) => {
        if (err.response) {
          setError(
            "email",
            {
              type: "email",
              message: "Invalid email or password",
            },
            { shouldFocus: true }
          );
          setError("password", { type: "password", message: "" });
        } else {
          toast.error("Something went very wrong, try again!", {
            autoClose: 5000,
          });
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
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
        label="Password"
        register={register}
        required="Password is required!"
        error={errors?.password && errors?.password}
        disabled={isLoading}
      />

      <Button
        type="submit"
        disabled={isLoading}
        isLoading={isLoading}
        className="text-[1rem] md:text-xl py-1.5 sm:py-2 md:py-3"
      >
        Login
      </Button>
      <div className="flex items-center gap-x-2 text-[0.6rem] sm:text-[0.9rem] justify-center">
        <span>Don&apos;t have an Account?</span>{" "}
        <NavLink to="/signup" className="text-blue-500 dark:text-blue-400">
          Create account!
        </NavLink>
      </div>
    </form>
  );
};

export default LoginForm;
