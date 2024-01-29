import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import Button from "../Components/UI/Button";
import Heading from "../Components/UI/Heading";

const Notfound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1, { replace: true });
  };
  return (
    <section className="w-full h-screen -mt-6 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl font-[700] ">404</h1>
        <Heading className="font-[400] text-center">
          Page you are looking for is not found!
        </Heading>
        <Button
          onClick={handleClick}
          className="w-max py-2 px-6 flex items-center gap-3"
        >
          <FaArrowLeftLong /> Go Back
        </Button>
      </div>
    </section>
  );
};

export default Notfound;
