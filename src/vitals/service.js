import { codes } from "../constants/codes.js";
import Vital from "../models/Vital.js";
import { customCreate, fetchCategoryByTitle, paginate } from "../utils/common.js";

export const createVital = async (payload) => {
  try {
    const vitalData = await customCreate(Vital, payload);
    return {
      code: codes.RESOURCE_CREATED,
      data: vitalData
    };
  } catch (error) {
    throw error;
  }
};

export const updateVital = async (vitalId, payload) => {
  try {
    await Vital.updateOne({ _id: vitalId }, { $set: payload });
    return {
      code: codes.RESOURCE_CREATED,
      data: {
        id: vitalId
      }
    };
  } catch (error) {
    throw error;
  }
};

export const fetchVitals = async (payload = {}) => {
  try {
    const { page, pageSize, ...filters } = payload;
    const result = await paginate({ Model: Vital, page, pageSize, filters });
    return {
      code: codes.RESOURCE_FETCHED,
      data: result
    };
  } catch (error) {
    throw error;
  }
};

export const fetchVital = async (payload) => {
  try {
    const { vitalId } = payload;
    const vital = await Vital.findById(vitalId);
    if (!vital) {
      throw {
        code: codes.NOT_FOUND
      };
    }
    const { _id, ...rest } = vital._doc;
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
