import { codes } from "../constants/codes.js";
import { getFileCategory, validateRequestPayload } from "../utils/helpers.js";
import * as mediaServices from "./service.js";

export const createMedia = async (request, response, next) => {
  try {
    const { file } = request;
    if (!file) {
      throw {
        code: codes.INVALID_PARAMETERS,
        message: "file is required",
      };
    }

    const saveMediaPayload = {
      fileUrl: `${process.env.APP_BASE_URL}${process.env.FILE_UPLOAD_DIR}/${file.filename}`,
      type: getFileCategory(file.mimetype),
      ...request.body,
    };
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
    const responsePayload = await mediaServices.fetchAllMedia();
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
