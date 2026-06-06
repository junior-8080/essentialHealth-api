import { validateRequestPayload } from "../utils/helpers.js";
import { subscriptionPlanSchema, subscriptionPlanUpdateSchema } from "../utils/schemaValidators.js";
import * as subscriptionPlanServices from "./service.js";
import responseHandler from "../utils/responseHandler.js";

export const createSubscriptionPlan = async (request, response, next) => {
  try {
    const requestPayload = { ...request.body };
    const validPayload = await validateRequestPayload(subscriptionPlanSchema, requestPayload);
    const responsePayload = await subscriptionPlanServices.createSubscriptionPlan(validPayload);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const updateSubscriptionPlan = async (request, response, next) => {
  try {
    const requestPayload = { ...request.body };
    const planId = request.params.planId;
    const validPayload = await validateRequestPayload(subscriptionPlanUpdateSchema, requestPayload);
    const responsePayload = await subscriptionPlanServices.updateSubscriptionPlan(planId, validPayload);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const fetchSubscriptionPlans = async (request, response, next) => {
  try {
    const responsePayload = await subscriptionPlanServices.fetchSubscriptionPlans();
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const fetchSubscriptionPlan = async (request, response, next) => {
  try {
    const planId = request.params.planId;
    const responsePayload = await subscriptionPlanServices.fetchSubscriptionPlan(planId);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const deleteSubscriptionPlan = async (request, response, next) => {
  try {
    const planId = request.params.planId;
    const responsePayload = await subscriptionPlanServices.deleteSubscriptionPlan(planId);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};