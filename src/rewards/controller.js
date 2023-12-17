import { validateRequestPayload } from "../utils/helpers.js";
import { rewardValidationSchema, rewardUpdateValidationSchema } from "../utils/schemaValidators.js";
import * as rewardServices from "./service.js";

export const createReward = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.body,
    };
    const validPayload = await validateRequestPayload(rewardValidationSchema, requestPayload);
    const responsePayload = await rewardServices.createReward(validPayload);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const updateReward = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.body,
    };
    const rewardId = request.params.rewardId;
    const validPayload = await validateRequestPayload(rewardUpdateValidationSchema, requestPayload);
    const responsePayload = await rewardServices.updateReward(rewardId, validPayload);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const fetchRewards = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.params,
      ...request.query,
    };
    const responsePayload = await rewardServices.fetchRewards(requestPayload);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const fetchReward = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.params,
    };
    const responsePayload = await rewardServices.fetchReward(requestPayload);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const deleteReward = async (request, response, next) => {
  try {
    const rewardId = request.params.rewardId;
    const responsePayload = await rewardServices.deleteReward(rewardId);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};
