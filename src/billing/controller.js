import { validateRequestPayload } from "../utils/helpers.js";
import { billingValidationSchema, verifyTransactionSchema } from "../utils/schemaValidators.js";
import * as billingServices from "./service.js";
import responseHandler from "../utils/responseHandler.js";

export const createCheckoutUrl = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.body,
      userId: request.userDetails.id
    };
    const validPayload = await validateRequestPayload(billingValidationSchema, requestPayload);
    const responsePayload = await billingServices.createCheckoutUrl(validPayload);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const verifyTransaction = async (request, response, next) => {
  try {
    const requestPayload = { referenceId: request.params.referenceId };
    const validPayload = await validateRequestPayload(verifyTransactionSchema, requestPayload);
    const responsePayload = await billingServices.verifyTransaction(validPayload.referenceId);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const paymentWebHook = async (request, response, next) => {
  const event = request.body.event;
  switch (event) {
    case "charge.success":
      break;
    default:
      break;
  }
};