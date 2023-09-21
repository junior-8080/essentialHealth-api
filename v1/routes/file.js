import storage from "../config/multer.config.js";
import express from "express";
import multer from "multer";
import Response from "../helpers/ResponseData.js";

const router = express.Router();
const upload = multer({ storage: storage });

router.post(
  "/upload",
  upload.single("avatar"),
  function (request, response, next) {
    const data = new Response();
    data.message = "file uploaded succesfully!";
    data.data = {};

    console.log(request.file, request.body, request.user);
    response.status(200).json(data);
  }
);

export default router;
