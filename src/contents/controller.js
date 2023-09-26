import { validateRequestPayload } from "../utils/helpers.js";
import { contentSchema, contentUpdateSchema } from "../utils/schemaValidators.js";
import * as contentServices from "./service.js";

export const createContent = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.body,
    };
    const validPayload = await validateRequestPayload(contentSchema, requestPayload);
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
    const responsePayload = await contentServices.fetchContents(requestPayload);
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
    const contentId = request.params.content_id;
    const validPayload = await validateRequestPayload(contentUpdateSchema, requestPayload);
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
    const requestPayload = {
      ...request.params,
    };
    const responsePayload = await contentServices.fetchContent(requestPayload);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    console.log("🚀 ~ file: controller.js:45 ~ fetchUser ~ error:", error);
    response.locals.responsePayload = error;
    next();
  }
};
