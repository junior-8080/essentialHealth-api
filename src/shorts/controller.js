import { validateRequestPayload } from "../utils/helpers.js";
import { shortValidationSchema, shortUpdateValidationSchema } from "../utils/schemaValidators.js";
import * as shortServices from "./service.js";

export const createShort = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.body,
    };
    const validPayload = await validateRequestPayload(shortValidationSchema, requestPayload);
    const responsePayload = await shortServices.createShort(validPayload);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const updateShort = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.body,
    };
    const shortId = request.params.shortId;
    const validPayload = await validateRequestPayload(shortUpdateValidationSchema, requestPayload);
    const responsePayload = await shortServices.updateShort(shortId, validPayload);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const fetchShorts = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.params,
      ...request.query,
    };
    const responsePayload = await shortServices.fetchShorts(requestPayload);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const fetchShort = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.params,
    };
    const responsePayload = await shortServices.fetchShort(requestPayload);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};
