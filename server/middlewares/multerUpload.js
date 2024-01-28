const multer = require("multer");
const AppError = require("../utils/appError");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("The provided file is not an image!", 400), false);
  }
};

module.exports = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
