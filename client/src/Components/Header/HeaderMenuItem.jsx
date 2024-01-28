const HeaderMenuItem = ({ icon, text, onClick }) => {
  return (
    <li
      onClick={onClick}
      className="flex items-center font-[500] cursor-pointer p-2 sm:p-3  hover:bg-black/5 gap-4 dark:hover:bg-white/10
      dark:active:bg-white/15 active:bg-black/10 transition-colors duration-100"
    >
      <span className="text-[1.3rem] sm:text-[1.4rem] w-[2.6rem] h-[2.6rem] sm:w-[3rem] sm:h-[3rem] flex items-center justify-center bg-blue-100/50 dark:bg-blue-50/5  text-blue-500 dark:text-blue-400 rounded-full ">
        {icon}
      </span>
      <span>{text}</span>
    </li>
  );
};

export default HeaderMenuItem;
