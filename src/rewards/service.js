import { codes } from "../constants/codes.js";
import Reward from "../models/Reward.js";
import { customCreate, paginate } from "../utils/common.js";

export const createReward = async (payload) => {
  try {
    payload.publish_date = new Date(payload.publish_date);
    const rewardData = await customCreate(Reward, payload);
    return {
      code: codes.RESOURCE_CREATED,
      data: rewardData,
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
        id: rewardId,
      },
    };
  } catch (error) {
    throw error;
  }
};

export const fetchRewards = async (payload = {}) => {
  try {
    const { page, pageSize } = payload;
    const sortOder = { publish_date: -1 };
    const result = await paginate({ Model: Reward, page, pageSize, payload, sortOder });
    return {
      code: codes.RESOURCE_FETCHED,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

export const fetchReward = async (payload) => {
  try {
    const { rewardId } = payload;
    const { _doc } = await Reward.findById(rewardId);

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
