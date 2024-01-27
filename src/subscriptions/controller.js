import { validateRequestPayload } from "../utils/helpers.js";
import { subscriptionSchema, subscriptionPlanUpdateSchema } from "../utils/schemaValidators.js";
import * as subscriptionPlanServices from "./service.js";

export const createSubscription = async (request, response, next) => {
  try {
    const requestPayload = {
      userId: request.userDetails.id,
      ...request.body
    };
    const validPayload = await validateRequestPayload(subscriptionSchema, requestPayload);
    const responsePayload = await subscriptionPlanServices.createSubscription(validPayload);
    response.locals.responsePayload = {
      ...responsePayload
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const updateSubscription = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.body
    };
    const subscriptionId = request.params.subscriptionId;
    const validPayload = await validateRequestPayload(subscriptionPlanUpdateSchema, requestPayload);
    const responsePayload = await subscriptionPlanServices.updateSubscription(subscriptionId, validPayload);
    response.locals.responsePayload = {
      ...responsePayload
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};
export const fetchSubscriptions = async (request, response, next) => {
  try {
    const responsePayload = await subscriptionPlanServices.fetchSubscriptions();
    response.locals.responsePayload = {
      ...responsePayload
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const fetchSubscription = async (request, response, next) => {
  try {
    const subscriptionId = request.params.subscriptionId;
    const responsePayload = await subscriptionPlanServices.fetchSubscription(subscriptionId);
    response.locals.responsePayload = {
      ...responsePayload
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const deleteSubscription = async (request, response, next) => {
  try {
    const subscriptionId = request.params.subscriptionId;
    const responsePayload = await subscriptionPlanServices.deleteSubscription(subscriptionId);
    response.locals.responsePayload = {
      ...responsePayload
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};
