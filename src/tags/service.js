import { codes } from "../constants/codes.js";
import Tag from "../models/Tag.js";
import { customCreate, fetchCategoryByTitle, paginate } from "../utils/common.js";

export const createTag = async (payload) => {
  try {
    const tagData = await customCreate(Tag, payload);
    return {
      code: codes.RESOURCE_CREATED,
      data: tagData,
    };
  } catch (error) {
    throw error;
  }
};

export const updateTag = async (tagId, payload) => {
  try {
    // if (payload.title) {
    //   const categoryExists = await fetchCategoryByTitle(payload.title || "");
    //   if (categoryExists) {
    //     throw {
    //       code: codes.RESOURCE_EXISTS,
    //       message: "category already exists",
    //       data: payload,
    //     };
    //   }
    // }
    await Tag.updateOne({ _id: tagId }, { $set: payload });
    return {
      code: codes.RESOURCE_CREATED,
      data: {
        id: tagId,
      },
    };
  } catch (error) {
    throw error;
  }
};

export const fetchTags = async (payload = {}) => {
  try {
    const { page, pageSize } = payload;
    const result = await paginate({ Model: Tag, page, pageSize, payload });
    return {
      code: codes.RESOURCE_FETCHED,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

export const fetchTag = async (payload) => {
  try {
    const { tagId } = payload;
    const { _doc } = await Tag.findById(tagId);

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
