import multer from "multer";
import path from "path";

const base = process.env.NODE_ENV === "development" ? "/Users/abdulmukhsinahmed" : "";

const uploadStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${base}/${process.env.FILE_UPLOAD_DIR}`);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

export default uploadStorage;
