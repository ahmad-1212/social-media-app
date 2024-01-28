import LoadingSpinner from "./LoadingSpinner";

const Button = ({
  type,
  children,
  isLoading,
  onClick,
  className = "",
  disabled,
  variant = "blue",
}) => {
  const styles = {
    transparent: `w-max py-2 text-gray-800 disabled:hover:bg-transparent dark:text-gray-600 px-4 bg-transparent dark:bg-transparent  hover:bg-gray-700/20 active:bg-gray-700/40 rounded-md `,
    blue: `w-full bg-blue-500 dark:bg-blue-500/90 hover:bg-blue-600 transition-colors duration-100 active:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-blue-500 rounded-md text-gray-500 uppercase tracking-wide font-[500] `,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles[variant]} ${className}`}
    >
      {isLoading ? (
        <LoadingSpinner className="w-[1.3rem] h-[1.3rem] border-[2px] border-gray-600" />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
