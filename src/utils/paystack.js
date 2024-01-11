import axios from "axios";

export const initializeTransaction = async function initializeTransaction(billingDetails) {
  try {
    const response = await axios({
      method: "POST",
      url: "https://api.paystack.co/transaction/initialize",
      data: {
        ...billingDetails,
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
