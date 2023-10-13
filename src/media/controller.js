import { codes } from "../constants/codes.js";
import { getFileCategory, validateRequestPayload } from "../utils/helpers.js";
import { uploadToS3 } from "../utils/s3Setup.js";
import * as mediaServices from "./service.js";

export const createMedia = async (request, response, next) => {
  // console.log("🚀 ~ file: controller.js:7 ~ createMedia ~ request:", request);
  try {
    const { file } = request;
    if (!file) {
      throw {
        code: codes.INVALID_PARAMETERS,
        message: "file is required",
      };
    }
    const fileCategory = getFileCategory(file.mimetype);
    const fileUrl = await uploadToS3(file.path, file.filename, file.mimetype, fileCategory);
    const saveMediaPayload = {
      fileUrl,
      type: getFileCategory(file.mimetype),
      ...request.body,
    };
    // console.log(saveMediaPayload);
    // const validPayload = await validateRequestPayload();
    const responsePayload = await mediaServices.createMedia(saveMediaPayload);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const fetchAllMedia = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.query,
    };
    const responsePayload = await mediaServices.fetchAllMedia(requestPayload);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const fetchMedia = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.params,
    };
    const responsePayload = await userServices.fetchMedia(requestPayload);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};
