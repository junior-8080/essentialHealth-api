import { validateRequestPayload } from "../utils/helpers.js";
import { billingValidationSchema } from "../utils/schemaValidators.js";
import * as billingServices from "./service.js";

export const createCheckoutUrl = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.body,
      userId: request.userDetails.id
    };
    const validPayload = await validateRequestPayload(billingValidationSchema, requestPayload);
    const responsePayload = await billingServices.createCheckoutUrl(validPayload);
    response.locals.responsePayload = {
      ...responsePayload
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const paymentWebHook = async (request, response, next) => {
  const paymentDetails = request.body;
  const event = paymentDetails.event;
  switch (event) {
    case "charge.success":
      break;
    default:
      break;
  }
};
