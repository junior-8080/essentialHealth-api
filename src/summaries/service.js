import { codes } from "../constants/codes.js";
import { customCreate, paginate } from "../utils/common.js";
import Content from "../models/Content.js";
import { contentTransformer } from "../utils/dataTransformers.js";
import { userMediaActivity } from "../users/service.js";
import Category from "../models/Category.js";

export const fetchTagContentSummaries = async (filterId, userId = "") => {
  try {
    const referenceName = "instructor_id";
    const allTags = await Category.find();
    const allPromise = allTags.map((tag) => {
      const payload = {
        content_type: "main",
        tags: { $all: [filterId, tag._id.toString()] },
      };
      const page = 1;
      const pageSize = 2;
      return paginate({ Model: Content, page, pageSize, payload, referenceName });
    });
    const results = await Promise.all(allPromise);
    const data = [];
    allTags.map((tag, index) => {
      const tagContents = results[index].results;
      if (tagContents.length > 0) {
        data.push({
          tag_id: tag._id,
          items: results[index].results,
        });
      }
    });
    return {
      code: codes.RESOURCE_FETCHED,
      data,
    };
  } catch (error) {
    throw error;
  }
};
