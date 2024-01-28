const PostButton = ({
  icon,
  children,
  liked,
  onClick,
  rotate = false,
  disabled = false,
}) => {
  const styles = liked
    ? "text-blue-500 dark:text-blue-400"
    : "dark:text-gray-600";

  return (
    <button
      onClick={onClick}
      type="button"
      disabled={disabled}
      className={`w-full hover:bg-gray-400 dark:hover:bg-gray-800/70 rounded-md py-1  flex gap-2 items-center justify-center text-[1rem] disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:opacity-50 ${styles}`}
    >
      <span className={rotate ? "rotate-icon" : ""}>{icon}</span>{" "}
      <span> {children}</span>
    </button>
  );
};

export default PostButton;
