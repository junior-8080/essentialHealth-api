import { codes } from "../constants/codes.js";
import RewardClaim from "../models/RewardClaim.js";
import User from "../models/User.js";
import { fetchReward } from "../rewards/service.js";
import { fetchUser } from "../users/service.js";
import { customCreate, paginate } from "../utils/common.js";

export const createRewardClaim = async (payload) => {
  try {
    const { data: userData } = await fetchUser({ userId: payload.user_id });
    const { data: rewardData } = await fetchReward({ rewardId: payload.reward_id });
    console.log("🚀 ~ file: service.js:12 ~ createRewardClaim ~ rewardData:", rewardData);
    if (userData.points < rewardData.points) {
      throw {
        code: codes.INVALID_PARAMETERS,
        message: "points not enough",
      };
    }
    const rewardClaimData = await customCreate(RewardClaim, payload);
    console.log("🚀 ~ file: service.js:20 ~ createRewardClaim ~ rewardClaimData:", rewardClaimData);
    const updatedUser = await User.findByIdAndUpdate(
      { _id: payload.user_id },
      { $inc: { points: -rewardData.points } },
      { new: true }
    );
    return {
      code: codes.RESOURCE_CREATED,
      data: {
        points: updatedUser.points,
      },
    };
  } catch (error) {
    throw error;
  }
};

export const updateRewardClaim = async (payload) => {
  try {
    const { rewardClaimId, status } = payload;
    await RewardClaim.updateOne({ _id: rewardClaimId }, { status });
    return {
      code: codes.RESOURCE_UPDATED,
    };
  } catch (error) {
    throw error;
  }
};

export const fetchRewardClaims = async (payload = {}) => {
  try {
    const { page, pageSize } = payload;
    const sortOder = { created_at: -1 };
    const referenceName = "user_id,reward_id";
    const result = await paginate({ Model: RewardClaim, page, pageSize, payload, sortOder, referenceName });
    return {
      code: codes.RESOURCE_FETCHED,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

export const fetchRewardClaim = async (rewardClaimId) => {
  try {
    const payload = {
      _id: rewardClaimId,
    };
    const page = 1;
    const pageSize = 1;
    const referenceName = "user_id,reward_id";
    const { results } = await paginate({ Model: RewardClaim, page, pageSize, payload, referenceName });
    if (results.length === 0) {
      throw {
        code: codes.NOT_FOUND,
      };
    }
    return {
      code: codes.RESOURCE_FETCHED,
      data: results[0],
    };
  } catch (error) {
    throw error;
  }
};