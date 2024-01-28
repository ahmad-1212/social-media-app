require("dotenv").config({ path: "./config.env" });
const cloudinary = require("cloudinary").v2;
const DataUriParser = require("datauri/parser");

const catchAsync = require("./utils/catchAsync");
const AppError = require("./utils/appError");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});

// Upload image to cloudinary
exports.uploadImage = async (req, next) => {
  if (!req.file) return;

  if (req.file.size > 5000000) {
    throw new AppError(
      "image is too large, image should be less than 5MB",
      400
    );
  }

  // convert the image from buffer
  const parser = new DataUriParser();
  const file = parser.format(req.file.originalname, req.file.buffer);

  // Options for saving image
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: "social-media-app-image",
  };

  // Save image
  const result = await cloudinary.uploader.upload(file.content, options);

  // Return result
  return result;
};

exports.deleteImage = catchAsync(async (publicId) => {
  await cloudinary.uploader.destroy(publicId);
});
