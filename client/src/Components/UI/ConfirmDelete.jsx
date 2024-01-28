import { FiX } from "react-icons/fi";

import Button from "./Button";
import { useScreen } from "../../hooks/useScreen";

const ConfirmDelete = ({ onClick, resourceName, isLoading, onCloseModal }) => {
  const { screen } = useScreen();
  return (
    <div
      className={`${
        screen > 500 ? "w-[70dvw]" : "w-[80dvw]"
      } xs sm:w-[30rem] relative bg-white dark:bg-gray-900/80 shadow-md px-3 sm:px-5 pt-[2rem] sm:pt-[3rem] pb-[1rem] sm:pb-[2rem] rounded-md`}
    >
      <span className="absolute right-3 top-2 text-[1rem] ">
        <FiX
          onClick={onCloseModal}
          className="hover:text-gray-900 cursor-pointer dark:hover:text-white/60"
        />
      </span>
      <h2 className="text-[0.8rem] sm:text-xl text-center mb-8">
        Are you sure you want to delete this {resourceName}
      </h2>
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          onClick={onCloseModal}
          disabled={isLoading}
          variant="transparent"
        >
          Cancel
        </Button>
        <Button
          disabled={isLoading}
          type="button"
          onClick={onClick}
          className="w-max py-2 px-4 bg-red-500 disabled:hover:bg-red-500 dark:bg-red-600 hover:bg-red-600 active:bg-red-700"
        >
          {isLoading ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
