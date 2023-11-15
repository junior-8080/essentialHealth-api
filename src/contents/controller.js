import { validateRequestPayload } from "../utils/helpers.js";
import { contentValidation, contentUpdatedValidationSchema } from "../utils/schemaValidators.js";
import * as contentServices from "./service.js";

export const createContent = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.body,
    };
    const validPayload = await validateRequestPayload(contentValidation, requestPayload);
    const responsePayload = await contentServices.createContent(validPayload);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};
export const fetchContents = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.query,
    };
    const userId = request.userDetails?.id;
    const responsePayload = await contentServices.fetchContents(requestPayload, userId);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const updateContent = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.body,
    };
    const contentId = request.params.contentId;
    const validPayload = await validateRequestPayload(contentUpdatedValidationSchema, requestPayload);
    const responsePayload = await contentServices.updateContent(contentId, validPayload);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const fetchContent = async (request, response, next) => {
  try {
    const contentId = request.params.contentId;
    const responsePayload = await contentServices.fetchContent(contentId);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const fetchContentSections = async (request, response, next) => {
  try {
    const contentId = request.params.content_id;
    const userId = request.userDetails?.id;
    const responsePayload = await contentServices.fetchContentSections(contentId, userId);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};
