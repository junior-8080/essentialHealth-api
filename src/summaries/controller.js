import { validateRequestPayload } from "../utils/helpers.js";
import { contentSchema, contentUpdateSchema } from "../utils/schemaValidators.js";
import * as contentServices from "./service.js";

export const summaries = async (request, response, next) => {
  try {
    // console.log(">>>>><<<<<<<<<<<<<<");
    const userId = request.userDetails?.userId;
    const type = request.params.summaryType;
    switch (type) {
      case "tags-summary":
        const responsePayload = await contentServices.fetchTagContentSummaries(request.query.id, userId);
        response.locals.responsePayload = {
          ...responsePayload,
        };
        next();
        break;
      default:
        break;
    }
  } catch (error) {
    console.log("🚀 ~ file: controller.js:23 ~ summaries ~ error:", error);
    response.locals.responsePayload = error;
    next();
  }
};
