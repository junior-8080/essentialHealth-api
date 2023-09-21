import { codeMessages } from "../constants/codeMessages.js";
import { codes } from "../constants/codes.js";

const {
  RESOURCE_CREATED,
  RESOURCE_DELETED,
  RESOURCE_UPDATED,
  INVALID_PARAMETERS,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
  NOT_FOUND,
  RESOURCE_FETCHED,
  RESOURCE_EXISTS,
} = codes;

const responseHandler = (responsePayload = {}, response) => {
  if (!response) {
    throw new Error("responsePayload and response  are required");
  }
  console.log("🚀 ~ file: responseHandler.js:57 ~ responseHandler ~ response:", responsePayload);
  const { code, data } = responsePayload;
  let message = responsePayload.message;
  let statusCode = 200;
  switch (code) {
    case RESOURCE_FETCHED:
      message = message || codeMessages[RESOURCE_FETCHED];
      break;
    case RESOURCE_CREATED:
      message = message || codeMessages[RESOURCE_CREATED];
      break;
    case RESOURCE_UPDATED:
      message = message || codeMessages[RESOURCE_UPDATED];
      break;
    case RESOURCE_DELETED:
      message = message || codeMessages[RESOURCE_DELETED];
      break;
    case INVALID_PARAMETERS:
      statusCode = 403;
      message = message || codeMessages[INVALID_PARAMETERS];
      break;
    case NOT_FOUND:
      statusCode = 404;
      message = message || codeMessages[NOT_FOUND];
      break;
    case UNAUTHORIZED:
      statusCode = 401;
      message = message || codeMessages[UNAUTHORIZED];
      break;
    case FORBIDDEN:
      statusCode = 403;
      message = message || codeMessages[FORBIDDEN];
      break;
    case RESOURCE_EXISTS:
      statusCode = 409;
      message = message || codeMessages[RESOURCE_EXISTS];
      break;
    default:
      statusCode = 500;
      message = codeMessages[INTERNAL_SERVER_ERROR];
  }

  return response.status(statusCode).json({
    message,
    data,
  });
};

export default responseHandler;
