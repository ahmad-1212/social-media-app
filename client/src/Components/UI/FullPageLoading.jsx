import LoadingSpinner from "./LoadingSpinner";

const FullPageLoading = () => {
  return (
    <div className="w-full h-screen overflow-hidden flex items-center justify-center">
      <LoadingSpinner className="w-[5rem] h-[5rem] border-[5px] sm:border-[10px]" />
    </div>
  );
};

export default FullPageLoading;
