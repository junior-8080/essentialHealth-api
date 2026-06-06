import { validateRequestPayload } from "../utils/helpers.js";
import { contentValidation, contentUpdatedValidationSchema } from "../utils/schemaValidators.js";
import * as contentServices from "./service.js";
import responseHandler from "../utils/responseHandler.js";

export const createContent = async (request, response, next) => {
  try {
    const requestPayload = { ...request.body };
    const validPayload = await validateRequestPayload(contentValidation, requestPayload);
    const responsePayload = await contentServices.createContent(validPayload);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const fetchContents = async (request, response, next) => {
  try {
    const requestPayload = { ...request.query };
    const userId = request.userDetails?.id;
    const userRole = request.userDetails?.role;
    const responsePayload = await contentServices.fetchContents(requestPayload, userId, userRole);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const updateContent = async (request, response, next) => {
  try {
    const requestPayload = { ...request.body };
    const contentId = request.params.contentId;
    const validPayload = await validateRequestPayload(contentUpdatedValidationSchema, requestPayload);
    const responsePayload = await contentServices.updateContent(contentId, validPayload);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const fetchContent = async (request, response, next) => {
  try {
    const contentId = request.params.contentId;
    const responsePayload = await contentServices.fetchContent(contentId);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const fetchContentSections = async (request, response, next) => {
  try {
    const contentId = request.params.contentId;
    const userId = request.userDetails?.id;
    const responsePayload = await contentServices.fetchContentSections(contentId, userId);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const deleteContent = async (request, response, next) => {
  try {
    const contentId = request.params.contentId;
    const responsePayload = await contentServices.deleteContent(contentId);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};