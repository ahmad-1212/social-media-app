const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`shadow-md bg-white dark:bg-gray-900 rounded-md p-3 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
