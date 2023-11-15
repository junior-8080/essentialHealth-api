import { codes } from "../constants/codes.js";
import Vital from "../models/vital.js";
import { customCreate, fetchCategoryByTitle, paginate } from "../utils/common.js";

export const createVital = async (payload) => {
  try {
    const vitalData = await customCreate(Vital, payload);
    return {
      code: codes.RESOURCE_CREATED,
      data: vitalData,
    };
  } catch (error) {
    throw error;
  }
};

export const updateVital = async (vitalId, payload) => {
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
    await Vital.updateOne({ _id: vitalId }, { $set: payload });
    return {
      code: codes.RESOURCE_CREATED,
      data: {
        id: vitalId,
      },
    };
  } catch (error) {
    throw error;
  }
};

export const fetchVitals = async (payload = {}) => {
  try {
    const { page, pageSize } = payload;
    const result = await paginate({ Model: Vital, page, pageSize, payload });

    return {
      code: codes.RESOURCE_FETCHED,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

export const fetchVital = async (payload) => {
  try {
    const { vitalId } = payload;
    const { _doc } = await Vital.findById(vitalId);

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
