const Input = ({
  label,
  id,
  type,
  register,
  required,
  error,
  minLength,
  getValues,
  disabled,
  className = "",
}) => {
  const validate = {
    required: required,
  };

  // Validate for password field
  if (type === "password") {
    validate.minLength = {
      value: minLength,
      message: `Password must be at least ${minLength} characters!`,
    };
  }

  // validate for confirm password field
  if (type === "password" && id === "confirmPassword") {
    validate.validate = (value) =>
      value === getValues().password || "Password needs to match!";
  }

  return (
    <div className="flex flex-col gap-3">
      {label && (
        <label htmlFor={id} className="font-[500] sm:text-[1rem] md:text-xl">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        disabled={disabled}
        className={`border-2 bg-transparent border-gray-700 rounded-md md:text-[1.1rem] py-1 px-4 focus:border-blue-500 disabled:opacity-80 disabled:bg-gray-800/60 disabled:cursor-not-allowed ${
          error && "border-red-500 outline-red-500 focus:outline-red-500 "
        } ${className}`}
        {...register(id, validate)}
      />

      <span className="text-[0.7rem] sm:text-[0.8rem] -mt-2 text-red-500">
        {error?.message} &nbsp;
      </span>
    </div>
  );
};

export default Input;
