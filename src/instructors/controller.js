import { validateRequestPayload } from "../utils/helpers.js";
import { instructorSchema } from "../utils/schemaValidators.js";
import * as instructorServices from "./service.js";
import responseHandler from "../utils/responseHandler.js";

export const createInstructor = async (request, response, next) => {
  try {
    const requestPayload = { ...request.body };
    const validPayload = await validateRequestPayload(instructorSchema, requestPayload);
    const responsePayload = await instructorServices.createInstructor(validPayload);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const fetchInstructors = async (request, response, next) => {
  try {
    const requestPayload = { ...request.query };
    const responsePayload = await instructorServices.fetchInstructors(requestPayload);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const fetchInstructor = async (request, response, next) => {
  try {
    const requestPayload = { ...request.params };
    const responsePayload = await instructorServices.fetchInstructor(requestPayload);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const deleteInstructor = async (request, response, next) => {
  try {
    const instructorId = request.params.instructorId;
    const responsePayload = await instructorServices.deleteInstructor(instructorId);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};