import multer from "multer";
import path from "path";

const base = "/Users/abdulmukhsinahmed";

const uploadStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${base}/media`);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

export default uploadStorage;
