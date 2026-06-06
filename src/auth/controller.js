import * as userServices from "../users/service.js";
import { validateRequestPayload } from "../utils/helpers.js";
import { authValidationSchema, signUpValidationSchema, verifyOtpValidationSchema } from "../utils/schemaValidators.js";
import * as authServices from "./service.js";
import responseHandler from "../utils/responseHandler.js";

export const login = async (request, response, next) => {
  try {
    const requestPayload = { ...request.body };
    const validPayload = await validateRequestPayload(authValidationSchema, requestPayload);
    const responsePayload = await authServices.login(validPayload);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const adminLogin = async (request, response, next) => {
  try {
    const requestPayload = { ...request.body };
    const responsePayload = await authServices.adminLogin(requestPayload);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const signUp = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.body,
      firstName: request.body.fullName.split(" ")[0],
      lastName: request.body.fullName.split(" ")[1]
    };
    delete requestPayload.fullName;
    const validPayload = await validateRequestPayload(signUpValidationSchema, requestPayload);
    const responsePayload = await userServices.createUser(validPayload);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const verifyOtp = async (request, response, next) => {
  try {
    const requestPayload = { ...request.body };
    const validPayload = await validateRequestPayload(verifyOtpValidationSchema, requestPayload);
    const responsePayload = await authServices.verifyOtp(validPayload);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};