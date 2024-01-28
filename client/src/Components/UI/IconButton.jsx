const IconButton = ({ icon, className = "", onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className={`p-2 rounded-full bg-gray-700/40 hover:bg-gray-700/70 active:bg-gray-700/20 disabled:active:bg-transparent disabled:cursor-not-allowed
      disabled:opacity-70 disabled:text-gray-700 disabled:hover:bg-gray-700/40 ${className}`}
    >
      {icon}
    </button>
  );
};

export default IconButton;
