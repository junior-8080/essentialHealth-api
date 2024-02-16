import { codes } from "../constants/codes.js";
import { validateRequestPayload } from "../utils/helpers.js";
import { messageSchema } from "../utils/schemaValidators.js";
import * as messageServices from "./service.js";

export const createMessage = async (request, response, next) => {
  try {
    const userRole = request.userDetails.role;
    const requestPayload = {
      created_by: request.userDetails.id,
      ...request.body
    };

    const validPayload = await validateRequestPayload(messageSchema, requestPayload);
    const responsePayload = await messageServices.createMessage(validPayload);
    response.locals.responsePayload = {
      ...responsePayload
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};
export const fetchMessages = async (request, response, next) => {
  try {
    const responsePayload = await messageServices.fetchMessages();
    response.locals.responsePayload = {
      ...responsePayload
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const fetchMessage = async (request, response, next) => {
  try {
    const requestPayload = {
      ...request.params
    };
    const responsePayload = await messageServices.fetchMessage(requestPayload);
    response.locals.responsePayload = {
      ...responsePayload
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const fetchMessageChats = async (request, response, next) => {
  try {
    // const requestPayload = {
    //   ...request.params
    // };
    const responsePayload = await messageServices.fetchMessageChats();
    response.locals.responsePayload = {
      ...responsePayload
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};

export const deleteMessage = async (request, response, next) => {
  try {
    const messageId = request.params.messageId;
    const responsePayload = await messageServices.deleteMessage(messageId);
    response.locals.responsePayload = {
      ...responsePayload
    };
    next();
  } catch (error) {
    response.locals.responsePayload = error;
    next();
  }
};
