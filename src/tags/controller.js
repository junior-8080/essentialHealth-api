import { validateRequestPayload } from "../utils/helpers.js";
import { tagValidationSchema, updateTagValidationSchema } from "../utils/schemaValidators.js";
import * as tagServices from "./service.js";
import responseHandler from "../utils/responseHandler.js";

export const createTag = async (request, response, next) => {
  try {
    const requestPayload = { ...request.body };
    const validPayload = await validateRequestPayload(tagValidationSchema, requestPayload);
    const responsePayload = await tagServices.createTag(validPayload);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const updateTag = async (request, response, next) => {
  try {
    const requestPayload = { ...request.body };
    const categoryId = request.params.tagId;
    const validPayload = await validateRequestPayload(updateTagValidationSchema, requestPayload);
    const responsePayload = await tagServices.updateTag(categoryId, validPayload);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const fetchTags = async (request, response, next) => {
  try {
    const responsePayload = await tagServices.fetchTags();
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const fetchTag = async (request, response, next) => {
  try {
    const tagId = request.params.tagId;
    const responsePayload = await tagServices.fetchTag(tagId);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const deleteTag = async (request, response, next) => {
  try {
    const tagId = request.params.tagId;
    const responsePayload = await tagServices.deleteTag(tagId);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};