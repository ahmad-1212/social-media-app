const FormRow = ({ children, label, htmlFor }) => {
  return (
    <div className="grid grid-cols-1 gap-y-3 sm:gap-y-0 sm:grid-cols-[1fr_2fr] md:grid-cols-[1fr_2fr_0.5fr] lg:grid-cols-3 items-start border-b-2 pt-6 border-b-gray-400 dark:border-b-gray-800/10">
      <label
        htmlFor={htmlFor}
        className="text-[1rem] dark:opacity-80 font-[500]"
      >
        {label}
      </label>
      {children}
    </div>
  );
};

export default FormRow;
