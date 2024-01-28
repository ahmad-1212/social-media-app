const Overlay = ({ show, onClick }) => {
  if (!show) return null;

  return (
    <div
      onClick={onClick}
      className="fixed top-0 left-0 right-0 bottom-0 bg-black/20 z-30 backdrop-blur-sm"
    ></div>
  );
};

export default Overlay;
