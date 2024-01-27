import { validateRequestPayload } from "../utils/helpers.js";
import {
  userActivityValidationSchema,
  userUpdateValidationSchema,
  userValidationSchema,
  vitalTargetValidationSchema
} from "../utils/schemaValidators.js";
import * as userServices from "./service.js";

export const createUser = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.body
    };
    const validPayload = await validateRequestPayload(userValidationSchema, requestPayload);
    const responsePayload = await userServices.createUser(validPayload);
    response.locals.responsePayload = {
      ...responsePayload
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
      ...responsePayload
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
      ...request.params
    };
    const responsePayload = await userServices.fetchUser(requestPayload);
    response.locals.responsePayload = {
      ...responsePayload
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
      ...request.body
    };
    const validPayload = await validateRequestPayload(userUpdateValidationSchema, requestPayload);
    const userId = request.userDetails.id;
    const responsePayload = await userServices.updateUser(userId, validPayload);
    response.locals.responsePayload = {
      ...responsePayload
    };
    next();
  } catch (error) {
    console.log("🚀 ~ file: controller.js:69 ~ updateUser ~ error:", error);
    response.locals.responsePayload = error;
    next();
  }
};

export const createUserMediaActivity = async (request, response, next) => {
  try {
    const requestPayload = {
      user_id: request.userDetails.id,
      ...request.body
    };
    const validPayload = await validateRequestPayload(userActivityValidationSchema, requestPayload);
    const responsePayload = await userServices.createUserMediaActivity(validPayload);
    response.locals.responsePayload = {
      ...responsePayload
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const createUserVitalTarget = async (request, response, next) => {
  try {
    const requestPayload = {
      user_id: request.userDetails.id,
      vitals: {
        ...request.body
      }
    };
    const validPayload = await validateRequestPayload(vitalTargetValidationSchema, requestPayload);
    const responsePayload = await userServices.createUserVitalTarget(validPayload);
    response.locals.responsePayload = {
      ...responsePayload
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const fetchUserVital = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.params,
      ...request.query
    };
    const responsePayload = await userServices.fetchUserVital(requestPayload);
    response.locals.responsePayload = {
      ...responsePayload
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const fetchUserReward = async (request, response, next) => {
  try {
    const requestPayload = {
      user_id: request.params.userId,
      page: request.query.page,
      pageSize: request.query.pageSize
    };
    const responsePayload = await userServices.fetchUserReward(requestPayload);
    response.locals.responsePayload = {
      ...responsePayload
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const deleteUser = async (request, response, next) => {
  try {
    const userId = request.params.userId;
    const responsePayload = await userServices.deleteUser(userId);
    response.locals.responsePayload = {
      ...responsePayload
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};
