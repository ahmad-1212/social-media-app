import { Outlet } from "react-router-dom";

import Header from "../Header/Header";

const ProfileLayout = () => {
  return (
    <>
      <Header />
      <main className="mt-[4.6rem] w-[100%] md:w-[90dvw] lg:w-[900px] mx-auto ">
        <Outlet />
      </main>
    </>
  );
};

export default ProfileLayout;
