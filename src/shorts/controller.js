import { validateRequestPayload } from "../utils/helpers.js";
import { shortValidationSchema, shortUpdateValidationSchema } from "../utils/schemaValidators.js";
import * as shortServices from "./service.js";
import responseHandler from "../utils/responseHandler.js";

export const createShort = async (request, response, next) => {
  try {
    const requestPayload = { ...request.body };
    const validPayload = await validateRequestPayload(shortValidationSchema, requestPayload);
    const responsePayload = await shortServices.createShort(validPayload);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const updateShort = async (request, response, next) => {
  try {
    const requestPayload = { ...request.body };
    const shortId = request.params.shortId;
    const validPayload = await validateRequestPayload(shortUpdateValidationSchema, requestPayload);
    const responsePayload = await shortServices.updateShort(shortId, validPayload);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const fetchShorts = async (request, response, next) => {
  try {
    const requestPayload = { ...request.params, ...request.query };
    const responsePayload = await shortServices.fetchShorts(requestPayload);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const fetchShort = async (request, response, next) => {
  try {
    const requestPayload = { ...request.params };
    const responsePayload = await shortServices.fetchShort(requestPayload);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const deleteShort = async (request, response, next) => {
  try {
    const shortId = request.params.shortId;
    const responsePayload = await shortServices.deleteShort(shortId);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};