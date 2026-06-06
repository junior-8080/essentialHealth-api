import { codes } from "../constants/codes.js";
import { getFileCategory, validateRequestPayload } from "../utils/helpers.js";
import { uploadToS3 } from "../utils/s3Setup.js";
import * as mediaServices from "./service.js";
import responseHandler from "../utils/responseHandler.js";

export const createMedia = async (request, response, next) => {
  try {
    const { file } = request;
    if (!file) {
      throw { code: codes.INVALID_PARAMETERS, message: "file is required" };
    }
    const fileCategory = getFileCategory(file.mimetype);
    const fileUrl = await uploadToS3(file.path, file.filename, file.mimetype, fileCategory);
    const saveMediaPayload = { fileUrl, type: fileCategory, ...request.body };
    const responsePayload = await mediaServices.createMedia(saveMediaPayload);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const fetchAllMedia = async (request, response, next) => {
  try {
    const requestPayload = { ...request.query };
    const responsePayload = await mediaServices.fetchAllMedia(requestPayload);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const fetchMedia = async (request, response, next) => {
  try {
    const requestPayload = { ...request.params };
    const responsePayload = await mediaServices.fetchMedia(requestPayload);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const deleteMedia = async (request, response, next) => {
  try {
    const mediaId = request.params.mediaId;
    const responsePayload = await mediaServices.deleteMedia(mediaId);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};