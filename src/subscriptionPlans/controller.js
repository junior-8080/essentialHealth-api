import { validateRequestPayload } from "../utils/helpers.js";
import { subscriptionPlanSchema, subscriptionPlanUpdateSchema } from "../utils/schemaValidators.js";
import * as subscriptionPlanServices from "./service.js";

export const createSubscriptionPlan = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.body,
    };
    const validPayload = await validateRequestPayload(subscriptionPlanSchema, requestPayload);
    const responsePayload = await subscriptionPlanServices.createSubscriptionPlan(validPayload);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const updateSubscriptionPlan = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.body,
    };
    const planId = request.params.planId;
    const validPayload = await validateRequestPayload(subscriptionPlanUpdateSchema, requestPayload);
    const responsePayload = await subscriptionPlanServices.updateSubscriptionPlan(planId, validPayload);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};
export const fetchSubscriptionPlans = async (request, response, next) => {
  try {
    const responsePayload = await subscriptionPlanServices.fetchSubscriptionPlans();
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const fetchSubscriptionPlan = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.params,
    };
    const responsePayload = await subscriptionPlanServices.fetchSubscriptionPlan(requestPayload);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const deleteSubscriptionPlan = async (request, response, next) => {
  try {
    const planId = request.params.planId;
    const responsePayload = await subscriptionPlanServices.deleteSubscriptionPlan(planId);
    response.locals.responsePayload = {
      ...responsePayload,
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};
