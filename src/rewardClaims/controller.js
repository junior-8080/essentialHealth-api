import { validateRequestPayload } from "../utils/helpers.js";
import { rewardClaimUpdatedValidationSchema, rewardClaimValidationSchema } from "../utils/schemaValidators.js";
import * as rewardClaimServices from "./service.js";
import responseHandler from "../utils/responseHandler.js";

export const createRewardClaim = async (request, response, next) => {
  try {
    const requestPayload = {
      user_id: request.userDetails.id,
      ...request.body
    };
    const validPayload = await validateRequestPayload(rewardClaimValidationSchema, requestPayload);
    const responsePayload = await rewardClaimServices.createRewardClaim(validPayload);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const updateRewardClaim = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.body,
      rewardClaimId: request.params.rewardClaimId
    };
    const validPayload = await validateRequestPayload(rewardClaimUpdatedValidationSchema, requestPayload);
    const responsePayload = await rewardClaimServices.updateRewardClaim(validPayload);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const fetchRewardClaims = async (request, response, next) => {
  try {
    const requestPayload = { ...request.params, ...request.query };
    const userRole = request.userDetails.role;
    if (userRole === "User") {
      requestPayload.user_id = request.userDetails.id;
    }
    const responsePayload = await rewardClaimServices.fetchRewardClaims(requestPayload, userRole);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const fetchRewardClaim = async (request, response, next) => {
  try {
    const responsePayload = await rewardClaimServices.fetchRewardClaim(request.params.rewardClaimId);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const deleteRewardClaim = async (request, response, next) => {
  try {
    const rewardClaimId = request.params.rewardClaimId;
    const responsePayload = await rewardClaimServices.deleteRewardClaim(rewardClaimId);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};