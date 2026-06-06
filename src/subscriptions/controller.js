import { validateRequestPayload } from "../utils/helpers.js";
import { subscriptionSchema, subscriptionPlanUpdateSchema } from "../utils/schemaValidators.js";
import * as subscriptionPlanServices from "./service.js";
import responseHandler from "../utils/responseHandler.js";

export const createSubscription = async (request, response, next) => {
  try {
    const requestPayload = {
      userId: request.userDetails.id,
      ...request.body
    };
    const validPayload = await validateRequestPayload(subscriptionSchema, requestPayload);
    const responsePayload = await subscriptionPlanServices.createSubscription(validPayload);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (request, response, next) => {
  try {
    const requestPayload = { ...request.body };
    const subscriptionId = request.params.subscriptionId;
    const validPayload = await validateRequestPayload(subscriptionPlanUpdateSchema, requestPayload);
    const responsePayload = await subscriptionPlanServices.updateSubscription(subscriptionId, validPayload);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const fetchSubscriptions = async (request, response, next) => {
  try {
    const responsePayload = await subscriptionPlanServices.fetchSubscriptions();
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const fetchSubscription = async (request, response, next) => {
  try {
    const subscriptionId = request.params.subscriptionId;
    const responsePayload = await subscriptionPlanServices.fetchSubscription(subscriptionId);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const deleteSubscription = async (request, response, next) => {
  try {
    const subscriptionId = request.params.subscriptionId;
    const responsePayload = await subscriptionPlanServices.deleteSubscription(subscriptionId);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};