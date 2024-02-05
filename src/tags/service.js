import { codes } from "../constants/codes.js";
import Tag from "../models/Tag.js";
import { customCreate, deleteRecord, fetchCategoryByTitle, paginate } from "../utils/common.js";

export const createTag = async (payload) => {
  try {
    const tagData = await customCreate(Tag, payload);
    return {
      code: codes.RESOURCE_CREATED,
      data: tagData
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
        id: tagId
      }
    };
  } catch (error) {
    throw error;
  }
};

export const fetchTags = async (payload = {}) => {
  try {
    const { page, pageSize, ...filters } = payload;
    const result = await paginate({ Model: Tag, page, pageSize, filters });
    return {
      code: codes.RESOURCE_FETCHED,
      data: result
    };
  } catch (error) {
    throw error;
  }
};

export const fetchTag = async (tagId) => {
  try {
    const tag = await Tag.findById(tagId);
    if (!tag) {
      throw {
        code: codes.NOT_FOUND
      };
    }
    const { _id, ...rest } = tag._doc;
    return {
      code: codes.RESOURCE_FETCHED,
      data: {
        id: _id,
        ...rest
      }
    };
  } catch (error) {
    throw error;
  }
};

export const deleteTag = async (tagId) => {
  try {
    await deleteRecord(Content, tagId);
    return {
      code: codes.RESOURCE_DELETED
    };
  } catch (error) {
    throw error;
  }
};
