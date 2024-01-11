import { codes } from "../constants/codes.js";
import Transactions from "../models/Transactions.js";
import { fetchSubscriptionPlan } from "../subscriptionPlans/service.js";
import { fetchUser } from "../users/service.js";
import { v4 as uuidv4 } from "uuid";
import { customCreate } from "../utils/common.js";
import { initializeTransaction } from "../utils/paystack.js";

export const createCheckoutUrl = async (payload) => {
  try {
    // get user details. Done
    //get subscription details Done
    //generate payment details done
    // generate payment invoice payload Done
    //save payment invoice payload
    // invoice status wil be pending
    // make a request to generate checkout url
    // send checkout url to client.
    const { userId, subscriptionId, email } = payload;
    const { data: userDetails } = await fetchUser({ userId });
    const { data: subscriptionPlanDetails } = await fetchSubscriptionPlan(subscriptionId);
    console.log("🚀 ~ file: service.js:22 ~ createCheckoutUrl ~ subscriptionPlanDetails:", subscriptionPlanDetails);
    const paymentDetails = {
      reference: uuidv4(),
      amount: subscriptionPlanDetails.price,
      email: userDetails.email || email,
      currency: subscriptionPlanDetails.currency,
      metadata: {
        subscriptionPlanId: subscriptionPlanDetails.id,
        userId,
        username: userDetails.firstName + " " + userDetails.lastName,
        phoneNumber: userDetails.phoneNumber,
      },
    };
    await customCreate(Transactions, paymentDetails);
    const checkoutData = await initializeTransaction(paymentDetails);
    return {
      code: codes.RESOURCE_CREATED,
      data: checkoutData,
    };
  } catch (error) {
    throw error;
  }
};
