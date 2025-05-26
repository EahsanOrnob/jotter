const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      ~~(Math.random() * 999999) +
        "_" +
        Date.now().toString() +
        "_" +
        file.originalname
    );
  },
});
const filefilter = (req, file, cb) => {
  // reject a file
  if (
    file.mimetype === "image/jepg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  }
  // accept a file
  else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    // fileSize: 1024 * 1024 * 8,
    size: 1024 * 1024 * 8,
  },
  filefilter: filefilter,
});

module.exports = upload;
