import { validateRequestPayload } from "../utils/helpers.js";
import { rewardValidationSchema, rewardUpdateValidationSchema } from "../utils/schemaValidators.js";
import * as rewardServices from "./service.js";
import responseHandler from "../utils/responseHandler.js";

export const createReward = async (request, response, next) => {
  try {
    const requestPayload = { ...request.body };
    const validPayload = await validateRequestPayload(rewardValidationSchema, requestPayload);
    const responsePayload = await rewardServices.createReward(validPayload);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const updateReward = async (request, response, next) => {
  try {
    const requestPayload = { ...request.body };
    const rewardId = request.params.rewardId;
    const validPayload = await validateRequestPayload(rewardUpdateValidationSchema, requestPayload);
    const responsePayload = await rewardServices.updateReward(rewardId, validPayload);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const fetchRewards = async (request, response, next) => {
  try {
    const requestPayload = { ...request.params, ...request.query };
    if (request.userDetails.role === "User") {
      requestPayload.status = "active";
    }
    const responsePayload = await rewardServices.fetchRewards(requestPayload);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const fetchReward = async (request, response, next) => {
  try {
    const requestPayload = { ...request.params };
    const responsePayload = await rewardServices.fetchReward(requestPayload);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const deleteReward = async (request, response, next) => {
  try {
    const rewardId = request.params.rewardId;
    const responsePayload = await rewardServices.deleteReward(rewardId);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};