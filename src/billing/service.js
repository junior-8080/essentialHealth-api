import { codes } from "../constants/codes.js";
import Transactions from "../models/Transactions.js";
import { fetchSubscriptionPlan } from "../subscriptionPlans/service.js";
import { fetchUser } from "../users/service.js";
import { v4 as uuidv4 } from "uuid";
import { customCreate } from "../utils/common.js";
import { initializeTransaction } from "../utils/paystack.js";
import Subscription from "../models/Subscription.js";

export const createCheckoutUrl = async (payload) => {
  try {
    const { userId, subscriptionPlanId, email } = payload;
    const subscriptionData = await Subscription.findOne({
      subscriptionPlan_id: subscriptionPlanId,
      user_id: userId,
      expiry_date: { $gt: Date.now() }
    });
    if (subscriptionData) {
      throw {
        code: codes.RESOURCE_EXISTS,
        message: "User is already subscribed for this plan. Duplicate subscription is not allowed"
      };
    }
    const { data: userDetails } = await fetchUser({ userId });
    const { data: subscriptionPlanDetails } = await fetchSubscriptionPlan(subscriptionPlanId);
    const paymentDetails = {
      reference: uuidv4(),
      amount: subscriptionPlanDetails.price,
      email: userDetails.email || email,
      currency: subscriptionPlanDetails.currency,
      metadata: {
        subscriptionPlan_id: subscriptionPlanDetails.id,
        user_id: userId,
        username: userDetails.firstName + " " + userDetails.lastName,
        phoneNumber: userDetails.phoneNumber
      }
    };
    console.log(paymentDetails);
    await customCreate(Transactions, paymentDetails);
    // const checkoutData = await initializeTransaction(paymentDetails);
    return {
      code: codes.RESOURCE_CREATED,
      data: { paymentDetails }
    };
  } catch (error) {
    throw error;
  }
};
