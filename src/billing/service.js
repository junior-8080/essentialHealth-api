import { codes } from "../constants/codes.js";
import Transactions from "../models/Transactions.js";
import { fetchSubscriptionPlan } from "../subscriptionPlans/service.js";
import { fetchUser } from "../users/service.js";
import { v4 as uuidv4 } from "uuid";
import { customCreate } from "../utils/common.js";
import { initializeTransaction, verifyPaymentViaRefId } from "../utils/paystack.js";
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
      amount: subscriptionPlanDetails.price * 100,
      email: userDetails.email || email,
      currency: subscriptionPlanDetails.currency,
      metadata: {
        subscriptionPlan_id: subscriptionPlanDetails.id,
        user_id: userId,
        username: userDetails.firstName + " " + userDetails.lastName,
        phoneNumber: userDetails.phoneNumber
      }
    };

    await customCreate(Transactions, paymentDetails);
    const checkoutData = await initializeTransaction(paymentDetails);
    return {
      code: codes.RESOURCE_CREATED,
      data: { paymentDetails, checkoutData: checkoutData.data }
    };
  } catch (error) {
    throw error;
  }
};

export const verifyTransaction = async (referenceId) => {
  // console.log("🚀 ~ verifyTransaction ~ referenceId:", referenceId);
  try {
    const paymentDetails = await verifyPaymentViaRefId(referenceId);
    await Transactions.updateOne({ reference: referenceId }, { $set: { status: paymentDetails.status } });
    return {
      code: codes.RESOURCE_FETCHED,
      data: {
        status: paymentDetails.status,
        amount: paymentDetails.amount,
        currency: paymentDetails.currency
        // paidAt: paymentDetails.paidAt
      }
    };
  } catch (error) {
    throw error;
  }
};
