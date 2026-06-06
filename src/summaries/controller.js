import { codes } from "../constants/codes.js";
import * as contentServices from "./service.js";
import responseHandler from "../utils/responseHandler.js";

export const summaries = async (request, response, next) => {
  try {
    const userId = request.userDetails?.userId;
    const type = request.params.summaryType;
    let responsePayload;
    switch (type) {
      case "tag-nutritional-tips":
        responsePayload = await contentServices.fetchTagContentSummaries(process.env.NUTRITIONAL_TIPS_ID, userId);
        break;
      case "tag-workout":
        responsePayload = await contentServices.fetchTagContentSummaries(process.env.WORKOUT_ID, userId);
        break;
      default:
        responsePayload = { code: codes.NOT_FOUND };
        break;
    }
    return responseHandler(responsePayload, response);
  } catch (error) {
    next(error);
  }
};