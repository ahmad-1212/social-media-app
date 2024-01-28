const Heading = ({ children, className = "" }) => {
  return (
    <h2 className={`font-[600] text-xl sm:text-2xl ${className}`}>
      {children}
    </h2>
  );
};

export default Heading;
