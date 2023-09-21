import * as userServices from "../users/service.js";
import { validateRequestPayload } from "../utils/helpers.js";
import { authValidationSchema, signUpValidationSchema, verifyOtpValidationSchema } from "../utils/schemaValidators.js";
import * as authServices from "./service.js";

export const login = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.body,
    };

    const validPayload = await validateRequestPayload(authValidationSchema, requestPayload);
    const responsePayload = await authServices.login(validPayload);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const adminLogin = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.body,
    };

    const responsePayload = await authServices.adminLogin(requestPayload);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const signUp = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.body,
    };

    const validPayload = await validateRequestPayload(signUpValidationSchema, requestPayload);
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

export const verifyOtp = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.body,
    };
    console.log("ppppppp");
    const validPayload = await validateRequestPayload(verifyOtpValidationSchema, requestPayload);
    // console.log("🚀 ~ file: controller.js:28 ~ verifyOtp ~ validPayload:", validPayload);
    const responsePayload = await authServices.verifyOtp(validPayload);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    console.log("🚀 ~ file: controller.js:35 ~ verifyOtp ~ error:", error);
    response.locals.responsePayload = error;
    next();
  }
};
