import Button from "./Button";
import Heading from "./Heading";

const ErrorFallback = ({ resetErrorBoundary }) => {
  return (
    <section className="w-full h-screen items-center justify-center flex flex-col gap-3 -mt-6">
      <Heading>Somethng went very wrong 🤔</Heading>
      <Button
        onClick={resetErrorBoundary}
        className="w-max py-2 px-6 flex items-center gap-3"
      >
        Try again
      </Button>
    </section>
  );
};

export default ErrorFallback;
