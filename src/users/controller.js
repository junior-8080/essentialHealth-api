import { validateRequestPayload } from "../utils/helpers.js";
import { userValidationSchema } from "../utils/schemaValidators.js";
import * as userServices from "./service.js";

export const createUser = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.body,
    };
    const validPayload = await validateRequestPayload(userValidationSchema, requestPayload);
    const responsePayload = await userServices.createUser(validPayload);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};
export const fetchUsers = async (request, response, next) => {
  try {
    const responsePayload = await userServices.fetchUsers();
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const fetchUser = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.params,
    };
    const responsePayload = await userServices.fetchUser(requestPayload);
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

export const updateUser = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.body,
    };
    const userId = request.userDetails.id;
    const responsePayload = await userServices.updateUser(userId, requestPayload);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    // console.log("🚀 ~ file: controller.js:45 ~ fetchUser ~ error:", error);
    response.locals.responsePayload = error;
    next();
  }
};
