import { codes } from "../constants/codes.js";
import Short from "../models/short.js";
import { customCreate, fetchCategoryByTitle, paginate } from "../utils/common.js";

export const createShort = async (payload) => {
  try {
    payload.publish_date = new Date(payload.publish_date);
    const shortData = await customCreate(Short, payload);
    return {
      code: codes.RESOURCE_CREATED,
      data: shortData,
    };
  } catch (error) {
    throw error;
  }
};

export const updateShort = async (shortId, payload) => {
  try {
    await Short.updateOne({ _id: shortId }, { $set: payload });
    return {
      code: codes.RESOURCE_CREATED,
      data: {
        id: shortId,
      },
    };
  } catch (error) {
    throw error;
  }
};

export const fetchShorts = async (payload = {}) => {
  try {
    const { page, pageSize } = payload;
    const result = await paginate({ Model: Short, page, pageSize, payload });
    return {
      code: codes.RESOURCE_FETCHED,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

export const fetchShort = async (payload) => {
  try {
    const { shortId } = payload;
    const { _doc } = await Short.findById(shortId);

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
