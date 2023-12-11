import { validateRequestPayload } from "../utils/helpers.js";
import { rewardClaimUpdatedValidationSchema, rewardClaimValidationSchema } from "../utils/schemaValidators.js";
import * as rewardClaimServices from "./service.js";

export const createRewardClaim = async (request, response, next) => {
  try {
    const requestPayload = {
      user_id: request.userDetails.id,
      ...request.body,
    };
    const validPayload = await validateRequestPayload(rewardClaimValidationSchema, requestPayload);
    const responsePayload = await rewardClaimServices.createRewardClaim(validPayload);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const updateRewardClaim = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.body,
      rewardClaimId: request.params.rewardClaimId,
    };
    const validPayload = await validateRequestPayload(rewardClaimUpdatedValidationSchema, requestPayload);
    const responsePayload = await rewardClaimServices.updateRewardClaim(validPayload);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const fetchRewardClaims = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.params,
      ...request.query,
    };
    const responsePayload = await rewardClaimServices.fetchRewardClaims(requestPayload);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const fetchRewardClaim = async (request, response, next) => {
  try {
    const responsePayload = await rewardClaimServices.fetchRewardClaim(request.params.rewardClaimId);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};
