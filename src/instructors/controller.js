import { validateRequestPayload } from "../utils/helpers.js";
import { instructorSchema } from "../utils/schemaValidators.js";
import * as instructorServices from "./service.js";

export const createInstructor = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.body,
    };
    const validPayload = await validateRequestPayload(instructorSchema, requestPayload);
    const responsePayload = await instructorServices.createInstructor(validPayload);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};
export const fetchInstructors = async (request, response, next) => {
  try {
    const responsePayload = await instructorServices.fetchInstructors();
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const fetchInstructor = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.params,
    };
    const responsePayload = await instructorServices.fetchInstructor(requestPayload);
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
