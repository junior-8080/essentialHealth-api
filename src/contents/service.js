import { codes } from "../constants/codes.js";
import { paginate } from "../utils/common.js";
import Content from "../models/Content.js";

export const createContent = async (payload) => {
  try {
    const { _doc } = await Content.create(payload);
    return {
      code: codes.RESOURCE_CREATED,
      data: _doc,
    };
  } catch (error) {
    throw error;
  }
};

export const fetchContents = async (payload = {}) => {
  try {
    const { page, pageSize } = payload;
    const referenceName = "category_id";
    const result = await paginate({ Model: Content, page, pageSize, payload, referenceName });
    return {
      code: codes.RESOURCE_FETCHED,
      data: result,
    };
  } catch (error) {
    console.log("🚀 ~ file: service.js:27 ~ fetchContents ~ error:", error);
    throw error;
  }
};

export const fetchContent = async (payload) => {
  try {
    const { user_id } = payload;
    const { _doc } = await User.findById(user_id);

    return {
      code: codes.RESOURCE_FETCHED,
      data: {
        ..._doc,
      },
    };
  } catch (error) {
    throw error;
  }
};
