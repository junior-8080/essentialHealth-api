import { codes } from "../constants/codes.js";
import Reward from "../models/Reward.js";
import { customCreate, deleteRecord, paginate } from "../utils/common.js";
import randomstring from "randomstring";

export const createReward = async (payload) => {
  try {
    payload.publish_date = new Date(payload.publish_date);
    if (payload.type !== "digital") {
      payload.voucher_code = randomstring.generate({ charset: "alphanumeric", length: 7 });
    }
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
    const { page, pageSize } = payload;
    const sortOder = { publish_date: -1 };
    const result = await paginate({ Model: Reward, page, pageSize, payload, sortOder });
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
    const { _doc } = await Reward.findById(rewardId);
    const { _id, ...rest } = _doc;
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
