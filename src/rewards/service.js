import { codes } from "../constants/codes.js";
import Reward from "../models/Reward.js";
import { customCreate, deleteRecord, paginate } from "../utils/common.js";
import randomstring from "randomstring";

export const createReward = async (payload) => {
  try {
    payload.publish_date = new Date(payload.publish_date);
    payload.code = randomstring.generate({ charset: "alphanumeric", length: 7 });
    const rewardData = await customCreate(Reward, payload);
    return {
      code: codes.RESOURCE_CREATED,
      data: rewardData
    };
  } catch (error) {
    throw error;
  }
};

export const updateReward = async (rewardId, payload) => {
  try {
    await Reward.updateOne({ _id: rewardId }, { $set: payload });
    return {
      code: codes.RESOURCE_CREATED,
      data: {
        id: rewardId
      }
    };
  } catch (error) {
    throw error;
  }
};

export const fetchRewards = async (payload = {}) => {
  try {
    const { page, pageSize, ...filters } = payload;
    const sortOder = { publish_date: -1 };
    const result = await paginate({ Model: Reward, page, pageSize, filters, sortOder });
    return {
      code: codes.RESOURCE_FETCHED,
      data: result
    };
  } catch (error) {
    throw error;
  }
};

export const fetchReward = async (payload) => {
  try {
    const { rewardId } = payload;

    const reward = await Reward.findById(rewardId);
    if (!reward) {
      throw {
        code: codes.NOT_FOUND
      };
    }
    const { _id, ...rest } = reward._doc;
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

export const deleteReward = async (rewardId) => {
  try {
    await deleteRecord(Reward, rewardId);
    return {
      code: codes.RESOURCE_DELETED
    };
  } catch (error) {
    throw error;
  }
};
