import { validateRequestPayload } from "../utils/helpers.js";
import { messageSchema } from "../utils/schemaValidators.js";
import * as messageServices from "./service.js";
import responseHandler from "../utils/responseHandler.js";

export const createMessage = async (request, response, next) => {
  try {
    const requestPayload = {
      created_by: request.userDetails.id,
      ...request.body
    };
    const validPayload = await validateRequestPayload(messageSchema, requestPayload);
    const responsePayload = await messageServices.createMessage(validPayload);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const fetchMessages = async (request, response, next) => {
  try {
    const requestPayload = { ...request.query };
    if (request.userDetails.role === "User") {
      requestPayload.user_id = request.userDetails.id;
    }
    const responsePayload = await messageServices.fetchMessages(requestPayload);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const fetchMessage = async (request, response, next) => {
  try {
    const requestPayload = { ...request.params };
    const responsePayload = await messageServices.fetchMessage(requestPayload);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const fetchMessageChats = async (request, response, next) => {
  try {
    const responsePayload = await messageServices.fetchMessageChats();
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (request, response, next) => {
  try {
    const messageId = request.params.messageId;
    const responsePayload = await messageServices.deleteMessage(messageId);
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};