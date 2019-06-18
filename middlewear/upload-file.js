const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    let type = "";
    if (file.mimetype === "application/octet-stream" || !file.mimetype) type = ".jpg";
    cb(null, file.fieldname + "-" + Date.now() + type);
  }
});

const upload = multer({ storage });

module.exports = upload;