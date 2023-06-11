const multer = require("multer");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const isImage = file.mimetype.includes("image");
  if (isImage) {
    file.isimage = true;
    cb(null, true);
  } else {
    file.isimage = false;
    cb(null, true);
  }
};

module.exports = multer({
  storage: storage,
  fileFilter: fileFilter,
});
