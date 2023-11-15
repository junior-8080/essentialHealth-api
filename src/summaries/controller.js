import { codes } from "../constants/codes.js";
import { validateRequestPayload } from "../utils/helpers.js";
import { contentValidation, contentUpdatedValidationSchema } from "../utils/schemaValidators.js";
import * as contentServices from "./service.js";

export const summaries = async (request, response, next) => {
  try {
    let responsePayload = {};
    const userId = request.userDetails?.userId;
    const type = request.params.summaryType;
    switch (type) {
      case "tag-nutritional-tips":
        const nutritionalTipsId = process.env.NUTRITIONAL_TIPS_ID;
        responsePayload = await contentServices.fetchTagContentSummaries(nutritionalTipsId, userId);
        response.locals.responsePayload = {
          ...responsePayload,
        };
        next();
        break;
      case "tag-workout":
        const workOutId = process.env.WORKOUT_ID;
        responsePayload = await contentServices.fetchTagContentSummaries(workOutId, userId);
        response.locals.responsePayload = {
          ...responsePayload,
        };
        next();
        break;
      default:
        response.locals.responsePayload = {
          code: codes.NOT_FOUND,
        };
        next();
        break;
    }
  } catch (error) {
    console.log("🚀 ~ file: controller.js:23 ~ summaries ~ error:", error);
    response.locals.responsePayload = error;
    next();
  }
};
