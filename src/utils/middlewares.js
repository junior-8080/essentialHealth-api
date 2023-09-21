import { codes } from "../constants/codes.js";
import { decodeJwtToken } from "./helpers.js";
import responseHandler from "./responseHandler.js";

const authorize = async function (request, response, next) {
  try {
    const authToken = request.headers["x-access-token"];
    if (!authToken) {
      throw {
        code: codes.FORBIDDEN,
        message: "Provide a valid token",
      };
    }
    const tokenData = await decodeJwtToken(authToken);
    request.userDetails = tokenData;
    next();
  } catch (error) {
    console.log("🚀 ~ file: middlewares.js:18 ~ authorize ~ error:", error);
    const responsePayload = {
      code: codes.UNAUTHORIZED,
      message: "Invalid Token",
    };

    responseHandler(responsePayload, response);
  }
};

export default authorize;
