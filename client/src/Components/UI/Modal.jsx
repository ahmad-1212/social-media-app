import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import Overlay from "./Overlay";

const ModalContext = createContext();

function Modal({ children }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <ModalContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children }) {
  const { setShowModal } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => setShowModal(true) });
}

function Window({ children, closeOnOverlay = false, center = false }) {
  const { showModal, setShowModal } = useContext(ModalContext);

  if (!showModal) return null;

  return createPortal(
    <>
      <Overlay
        show={showModal}
        onClick={() => closeOnOverlay && setShowModal(false)}
      />
      <div
        className={`fixed z-50 bg-white dark:bg-gray-900 rounded-md ${
          center ? "top-1/2 -translate-y-1/2 " : "top-0 mt-[5rem] "
        } left-1/2 -translate-x-1/2 shadow-md`}
      >
        {cloneElement(children, { onCloseModal: () => setShowModal(false) })}
      </div>
    </>,
    document.getElementById("overlay")
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
