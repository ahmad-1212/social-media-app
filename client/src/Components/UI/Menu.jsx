import { createContext, useContext, useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { createPortal } from "react-dom";

const MenuContext = createContext();

const Menus = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [positions, setPositions] = useState({});

  return (
    <MenuContext.Provider
      value={{ showMenu, setShowMenu, positions, setPositions }}
    >
      {children}
    </MenuContext.Provider>
  );
};

function Menu({ children }) {
  return <div className="relative">{children}</div>;
}

function Toggle({ children }) {
  const { setShowMenu, setPositions } = useContext(MenuContext);

  // Set the position of clicked element where the menue should attach
  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    setPositions({
      x: rect.x + rect.width,
      y: rect.y + rect.height,
    });
    setShowMenu(true);
  };
  return <div onClick={handleClick}>{children}</div>;
}

function List({ children }) {
  const { positions, showMenu, setShowMenu } = useContext(MenuContext);
  const ref = useOutsideClick(() => setShowMenu(false));
  if (!showMenu) return null;
  return createPortal(
    <ul
      ref={ref}
      style={{ position: "fixed", top: positions.y, left: positions.x }}
      className={`decoration-none rounded-md pb-4 bg-white -translate-x-full dark:bg-gray-900 dark:shadow-xl shadow-md w-[18rem] overflow-hidden z-50`}
    >
      {children}
    </ul>,
    document.getElementById("overlay")
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;

export default Menus;
