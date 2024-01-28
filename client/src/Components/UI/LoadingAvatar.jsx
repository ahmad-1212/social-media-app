import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "react-lazy-load-image-component/src/effects/blur.css";
import LoadingSpinner from "./LoadingSpinner";

const LoadingAvatar = ({
  src,
  alt,
  width,
  height,
  cursor,
  onClick,
  className = "",
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      style={{ width, height }}
      className={`image rounded-full overflow-hidden cursor-${cursor} flex items-center justify-center relative ${className}`}
      onClick={onClick}
    >
      {isLoading && (
        <div className="absolute top-50 left-50">
          <LoadingSpinner className="w-[2rem] h-[2rem] border-[5px]" />
        </div>
      )}
      <LazyLoadImage
        style={{ width, height }}
        src={src}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        effect="blur"
      />
    </div>
  );
};

LoadingAvatar.defaultProps = {
  src: undefined,
  alt: "Avatar",
  width: "3rem",
  height: "3rem",
  cursor: "default",
  onClick: () => {},
};

export default LoadingAvatar;
