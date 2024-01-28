import { Outlet } from "react-router-dom";

import Header from "../Header/Header";
import LeftSidebare from "../Sidebares/LeftSidebare";
import RightSidebare from "../Sidebares/RightSidebare";
import { useScreen } from "../../hooks/useScreen";

const HomeLayout = () => {
  const { screen } = useScreen();
  return (
    <>
      <Header />
      <div className="max-w-[1500px] m-auto grid lg:grid-cols-[1fr_2fr_1fr] md:grid-cols-[2fr_1.2fr] grid-cols-1">
        {screen >= 1024 && <LeftSidebare />}
        <main className="mt-[6rem] sm:mt-[8rem] w-[95%] sm:w-[550px] md:w-[460px] xl:w-[550px] mx-auto">
          <Outlet />
        </main>
        {screen >= 768 && <RightSidebare />}
      </div>
    </>
  );
};

export default HomeLayout;
