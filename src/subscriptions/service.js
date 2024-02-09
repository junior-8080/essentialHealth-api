import { codes } from "../constants/codes.js";
import Subscription from "../models/Subscription.js";
import { fetchSubscriptionPlan } from "../subscriptionPlans/service.js";
import { customCreate, deleteRecord, paginate } from "../utils/common.js";
import { calculateEndDate } from "../utils/helpers.js";
import Transactions from "../models/Transactions.js";
import { verifyPaymentViaRefId } from "../utils/paystack.js";
import { fetchUser, updateUser } from "../users/service.js";

export const createSubscription = async (payload) => {
  try {
    const { subscriptionPlanId, referenceId, userId } = payload;
    const paymentDetails = await verifyPaymentViaRefId(referenceId);
    if (paymentDetails.status === "failed") {
      throw {
        code: codes.FORBIDDEN,
        message: "cannot subscribe,payment is required"
      };
    }
    const transactionData = await Transactions.findOne({ reference: referenceId });
    if (!transactionData) {
      throw {
        code: codes.NOT_FOUND,
        message: "billing details not found"
      };
    }
    if (transactionData.metadata.subscriptionPlan_id.toString() !== subscriptionPlanId) {
      throw {
        code: codes.NOT_FOUND,
        message: "subscriptionId does not belong to referenceId"
      };
    }
    const referenceSubscriptionData = await Subscription.findOne({ billing_reference: referenceId });
    if (referenceSubscriptionData) {
      throw {
        code: codes.RESOURCE_EXISTS,
        message: "User is already subscribed. Duplicate subscription is not allowed."
      };
    }
    const { data: subscriptionPlanData } = await fetchSubscriptionPlan(subscriptionPlanId);

    const subscriptionPlanDuration = subscriptionPlanData.duration_in_months;
    const start_date = new Date().toISOString().split("T")[0];
    const expiry_date = calculateEndDate(start_date, subscriptionPlanDuration);
    const subscriptionPayload = {
      billing_reference: referenceId,
      user_id: userId,
      subscriptionPlan_id: subscriptionPlanId,
      start_date,
      expiry_date: expiry_date
    };
    const userSubscriptionPayload = {
      ...subscriptionPlanData,
      start_date,
      expiry_date
    };
    await customCreate(Subscription, subscriptionPayload);
    await updateUser(userId, { subscription_type: userSubscriptionPayload });
    const { data } = await fetchUser({ userId });
    const responseData = {
      id: data._id,
      ...data
    };
    return {
      code: codes.RESOURCE_CREATED,
      data: {
        id: data._id,
        ...data
      }
    };
  } catch (error) {
    throw error;
  }
};

export const updateSubscription = async (subscriptionId, payload) => {
  try {
    await Subscription.updateOne({ _id: subscriptionId }, { $set: payload });
    return {
      code: codes.RESOURCE_CREATED,
      data: {
        id: subscriptionId
      }
    };
  } catch (error) {
    throw error;
  }
};

export const fetchSubscriptions = async (payload = {}) => {
  try {
    const { page, pageSize, ...filters } = payload;
    const result = await paginate({ Model: Subscription, page, pageSize, filters });
    return {
      code: codes.RESOURCE_FETCHED,
      data: result
    };
  } catch (error) {
    throw error;
  }
};

export const fetchSubscription = async (subscriptionId) => {
  try {
    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      throw {
        code: codes.NOT_FOUND
      };
    }
    const { _id, ...rest } = subscription._doc;
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

export const deleteSubscription = async (subscriptionId) => {
  try {
    await deleteRecord(Subscription, subscriptionId);
    return {
      code: codes.RESOURCE_DELETED
    };
  } catch (error) {
    throw error;
  }
};
