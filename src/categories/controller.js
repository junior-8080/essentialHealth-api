import { validateRequestPayload } from "../utils/helpers.js";
import { categoriesUpdateValidationSchema, categoriesValidationSchema } from "../utils/schemaValidators.js";
import * as categoryServices from "./service.js";

export const createCategory = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.body,
    };
    const validPayload = await validateRequestPayload(categoriesValidationSchema, requestPayload);
    const responsePayload = await categoryServices.createCategory(validPayload);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const updateCategory = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.body,
    };
    const categoryId = request.params.categoryId;
    const validPayload = await validateRequestPayload(categoriesUpdateValidationSchema, requestPayload);
    const responsePayload = await categoryServices.updateCategory(categoryId, validPayload);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const fetchCategories = async (request, response, next) => {
  try {
    const responsePayload = await categoryServices.fetchCategories();
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const fetchCategory = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.params,
    };
    const responsePayload = await categoryServices.fetchCategory(requestPayload);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};
