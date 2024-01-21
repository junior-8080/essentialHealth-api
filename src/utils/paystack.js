import axios from "axios";

export const initializeTransaction = async function initializeTransaction(billingDetails) {
  try {
    console.log({
      ...billingDetails,
      callback: "https://57b8-102-221-28-6.ngrok-free.app/api/v1/billing/payment-webhook",
    });
    const response = await axios({
      method: "POST",
      url: "https://api.paystack.co/transaction/initialize",
      data: {
        ...billingDetails,
        callback_url: "https://57b8-102-221-28-6.ngrok-free.app/api/v1/billing/payment-webhook",
      },
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_API_KEY_LIVE}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
