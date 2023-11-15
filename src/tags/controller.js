import { validateRequestPayload } from "../utils/helpers.js";
import { tagValidationSchema, updateTagValidationSchema } from "../utils/schemaValidators.js";
import * as tagServices from "./service.js";

export const createTag = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.body,
    };
    const validPayload = await validateRequestPayload(tagValidationSchema, requestPayload);
    const responsePayload = await tagServices.createTag(validPayload);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const updateTag = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.body,
    };
    const categoryId = request.params.tagId;
    const validPayload = await validateRequestPayload(updateTagValidationSchema, requestPayload);
    const responsePayload = await tagServices.updateTag(categoryId, validPayload);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const fetchTags = async (request, response, next) => {
  try {
    const responsePayload = await tagServices.fetchTags();
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const fetchTag = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.params,
    };
    const responsePayload = await tagServices.fetchTag(requestPayload);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};
