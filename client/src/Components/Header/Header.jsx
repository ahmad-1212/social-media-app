import HeaderLogo from "./HeaderLogo";
import HeaderMenu from "./HeaderMenu";
import HeaderNav from "./HeaderNav";
import HeaderToggleMode from "./HeaderToggleMode";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 h-[4rem] sm:h-[4.6rem] w-full bg-white dark:bg-gray-900 shadow-md flex justify-between items-center px-3 sm:px-5 z-10">
      <HeaderLogo />
      <HeaderNav />
      <div className="flex items-center gap-4">
        <HeaderToggleMode />
        <HeaderMenu />
      </div>
    </header>
  );
};

export default Header;
