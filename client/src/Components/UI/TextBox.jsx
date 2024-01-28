import { useEffect, useRef } from "react";

const TextBox = ({
  className = "",
  content,
  setContent,
  label,
  width,
  height,
}) => {
  const ref = useRef();

  // Passing data to parent
  const handleInput = (e) => {
    setContent(e.target.textContent);
  };

  // To focus the element when first time mounted
  useEffect(() => {
    ref.current.focus();
  }, []);

  // To clear the element if there is no content
  useEffect(() => {
    if (content) return;
    ref.current.textContent = "";
  }, [content, ref]);

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <div
        role="text-box"
        ref={ref}
        onInput={handleInput}
        contentEditable={true}
        style={{ width, height }}
        className={
          "overflow-y-auto overflow-x-hidden focus:border-none focus:outline-none scrollbare break-words whitespace-pre-wrap text-inherit"
        }
      ></div>
      {!content && (
        <p className=" absolute top-0 left-0  text-gray-800/80 dark:text-gray-500 font-[300] pointer-events-none">
          {label}
        </p>
      )}
    </div>
  );
};

export default TextBox;
