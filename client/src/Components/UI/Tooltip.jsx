import { useState } from "react";

const Tooltip = ({ children, text, className, disabled, left = false }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const toolTipStyles = left
    ? "absolute top-1/2 left-0 -translate-x-[110%] -translate-y-1/2 bg-gray-800 dark:bg-gray-600 text-[0.7rem] text-gray-200 dark:text-gray-900 py-2 px-3 rounded-md font-[400] z-20"
    : "absolute bottom-0 left-[50%] -translate-x-1/2 translate-y-full bg-gray-800 dark:bg-gray-600 text-[0.7rem] text-gray-200 dark:text-gray-900 py-2 px-3 rounded-md font-[400] -mb-1 z-20";

  return (
    <div
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className="relative"
    >
      {children}
      {showTooltip && !disabled && (
        <span className={`${toolTipStyles}  ${className}`}>{text}</span>
      )}
    </div>
  );
};

export default Tooltip;
