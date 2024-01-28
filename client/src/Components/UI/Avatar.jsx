import { LazyLoadImage } from "react-lazy-load-image-component";

const Avatar = ({
  src,
  alt,
  width,
  height,
  cursor,
  onClick,
  className = "",
}) => {
  return (
    <div
      style={{ width, height }}
      onClick={onClick}
      className={`image rounded-full overflow-hidden cursor-${cursor}  ${className}`}
    >
      <LazyLoadImage
        placeholderSrc="/demo-img.jpg"
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

Avatar.defaultProps = {
  src: undefined,
  width: "3rem",
  height: "3rem",
  cursor: "default",
  onClick: () => {},
};

export default Avatar;
