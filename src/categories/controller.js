import { validateRequestPayload } from "../utils/helpers.js";
import { categoriesUpdateValidationSchema, categoriesValidationSchema } from "../utils/schemaValidators.js";
import * as categoryServices from "./service.js";
import responseHandler from "../utils/responseHandler.js";

export const createCategory = async (request, response, next) => {
  try {
    const requestPayload = { ...request.body };
    const validPayload = await validateRequestPayload(categoriesValidationSchema, requestPayload);
    const responsePayload = await categoryServices.createCategory(validPayload);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (request, response, next) => {
  try {
    const requestPayload = { ...request.body };
    const categoryId = request.params.categoryId;
    const validPayload = await validateRequestPayload(categoriesUpdateValidationSchema, requestPayload);
    const responsePayload = await categoryServices.updateCategory(categoryId, validPayload);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const fetchCategories = async (request, response, next) => {
  try {
    const requestPayload = { ...request.query };
    const responsePayload = await categoryServices.fetchCategories(requestPayload);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const fetchCategory = async (request, response, next) => {
  try {
    const requestPayload = { ...request.params };
    const responsePayload = await categoryServices.fetchCategory(requestPayload);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};