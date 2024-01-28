import { useEffect, useState } from "react";
import { LuMoon } from "react-icons/lu";
import { HiOutlineSun } from "react-icons/hi";

import Tooltip from "../UI/Tooltip";

const HeaderToggleMode = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  // Select HTML document
  const element = document.documentElement;

  // Toggle Mode
  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
      return;
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme, element.classList]);

  return (
    <Tooltip
      text={theme === "dark" ? "Light mode" : "Dark mode"}
      className="w-[5.1rem] text-center"
    >
      <div
        onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
        className="flex items-center justify-center bg-blue-50 transition-colors duration-150 hover:bg-blue-100/95 dark:hover:bg-black/30 dark:bg-black/20 self-stretch rounded-full w-[3rem] h-[3rem] sm:w-[3.6rem] sm:h-[3.6rem] text-2xl sm:text-3xl text-blue-900 dark:text-blue-50 cursor-pointer"
      >
        {theme === "dark" ? <HiOutlineSun /> : <LuMoon />}
      </div>
    </Tooltip>
  );
};

export default HeaderToggleMode;
