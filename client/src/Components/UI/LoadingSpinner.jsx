const LoadingSpinner = ({ className = "" }) => {
  return (
    <span
      className={`loader border dark:border-gray-500 dark:border-b-transparent border-black/50 border-b-transparent w-[1rem] h-[1rem] ${className}`}
    ></span>
  );
};

export default LoadingSpinner;
