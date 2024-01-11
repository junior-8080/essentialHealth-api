import { codes } from "../constants/codes.js";
import SubscriptionPlan from "../models/SubscriptionPlan.js";
import { customCreate, deleteRecord, paginate } from "../utils/common.js";

export const createSubscriptionPlan = async (payload) => {
  try {
    const SubscriptionPlanData = await SubscriptionPlan.findOne({ name: payload.name });
    if (SubscriptionPlanData) {
      throw {
        code: codes.RESOURCE_EXISTS,
        message: "subscription plan already exists",
        data: payload,
      };
    }
    const subscriptionPlanData = await customCreate(SubscriptionPlan, payload);
    return {
      code: codes.RESOURCE_CREATED,
      data: subscriptionPlanData,
    };
  } catch (error) {
    throw error;
  }
};

export const updateSubscriptionPlan = async (planId, payload) => {
  try {
    await SubscriptionPlan.updateOne({ _id: planId }, { $set: payload });
    return {
      code: codes.RESOURCE_CREATED,
      data: {
        id: planId,
      },
    };
  } catch (error) {
    throw error;
  }
};

export const fetchSubscriptionPlans = async (payload = {}) => {
  try {
    const { page, pageSize } = payload;
    const result = await paginate({ Model: SubscriptionPlan, page, pageSize, payload });
    return {
      code: codes.RESOURCE_FETCHED,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

export const fetchSubscriptionPlan = async (planId) => {
  try {
    const payload = {
      _id: planId,
    };
    const page = 1;
    const pageSize = 1;
    const { results } = await paginate({ Model: SubscriptionPlan, page, pageSize, payload });
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

export const deleteSubscriptionPlan = async (planId) => {
  try {
    const result = await deleteRecord(SubscriptionPlan, planId);
    return {
      code: codes.RESOURCE_DELETED,
    };
  } catch (error) {
    throw error;
  }
};
