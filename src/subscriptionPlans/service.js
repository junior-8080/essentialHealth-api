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

export const fetchSubscriptionPlan = async (payload) => {
  try {
    const { planId } = payload;
    const subscriptionPlanData = await SubscriptionPlan.findById(planId);
    if (!subscriptionPlanData) {
      return {
        code: codes.NOT_FOUND,
      };
    }
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
