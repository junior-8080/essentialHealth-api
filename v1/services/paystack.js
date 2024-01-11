import axios from "axios";
import https from "https";

// INITIATE THE MOMO PAYMENT PROCESS ON PAYSTACK
const initiateMomoPayment = (amount = 0, phone, provider, email) => {
  const data = {
    amount,
    email,
    currency: "GHS",
    mobile_money: {
      phone,
      provider, //mtn, vod, tgo
    },
  };

  const config = {
    baseURL: process.env.PAYSTACK_HOSTNAME,
    url: "/charge",
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_API_KEY_LIVE}`,
      "Content-Type": "application/json",
    },
    data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

// VERIFY FIRST TIME CUSTOMER NUMBER
const submitOTP = (code, paymentReference) => {
  const data = {
    otp: code,
    reference: paymentReference,
  };

  const config = {
    baseURL: process.env.PAYSTACK_HOSTNAME,
    url: "/charge/submit_otp",
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_API_KEY_LIVE}`,
      "Content-Type": "application/json",
    },
    data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

// MANUALLY CHECK PAYMENT STATUS ON PAYSTACK
const checkPayment = (paymentReference) => {
  const config = {
    baseURL: process.env.PAYSTACK_HOSTNAME,
    url: `/transaction/verify/${paymentReference}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_API_KEY_LIVE}`,
      "Content-Type": "application/json",
    },
    data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

// CREATE TRANSFER RECIPIENT FOR MOMO
// Make sure to save recipient code for future transfers.
const createMomoTransferRecipient = () => {
  const params = JSON.stringify({
    type: "mobile_money",
    name: "Thomas Kensah",
    account_number: "0500318982",
    bank_code: "VOD",
    currency: "GHS",
  });

  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/transferrecipient",
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_API_KEY_LIVE}`,
      "Content-Type": "application/json",
    },
  };

  const req = https
    .request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        console.log(JSON.parse(data));
      });
    })
    .on("error", (error) => {
      console.error(error);
    });

  req.write(params);
  req.end();
};

const makeMoneyTransfer = () => {
  const params = JSON.stringify({
    source: "balance",
    amount: 100,
    recipient: "RCP_5nx1ivf4llcxq1q",
    reason: "Test Transfer",
  });

  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/transfer",
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_API_KEY_LIVE}`,
      "Content-Type": "application/json",
    },
  };

  const req = https
    .request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        console.log(JSON.parse(data));
      });
    })
    .on("error", (error) => {
      console.error(error);
    });

  req.write(params);
  req.end();
};

const makeBulkMoneyTransfer = () => {
  const params = JSON.stringify({
    currency: "NGN",
    source: "balance",
    transfers: [
      {
        amount: 20000,
        reason: "Life go better for you",
        recipient: "RCP_t0ya41mp35flk40",
      },
      {
        amount: 20000,
        reason: "Easy does it",
        recipient: "RCP_z7e30qo1xxo98ub",
      },
    ],
  });

  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/transfer/bulk",
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_API_KEY_LIVE}`,
      "Content-Type": "application/json",
    },
  };

  const req = https
    .request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        console.log(JSON.parse(data));
      });
    })
    .on("error", (error) => {
      console.error(error);
    });

  req.write(params);
  req.end();
};

const createBankTransferRecipient = () => {
  const params = JSON.stringify({
    type: "nuban",
    name: "John Doe",
    account_number: "0001234567",
    bank_code: "058",
    currency: "GHS",
  });

  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/transferrecipient",
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_API_KEY_LIVE}`,
      "Content-Type": "application/json",
    },
  };

  const req = https
    .request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        console.log(JSON.parse(data));
      });
    })
    .on("error", (error) => {
      console.error(error);
    });

  req.write(params);
  req.end();
};

const verifyBankAccount = () => {
  const config = {
    baseURL: process.env.PAYSTACK_HOSTNAME,
    url: "/bank/resolve?account_number=1441001829318&bank_code=130100",
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_API_KEY_LIVE}`,
      "Content-Type": "application/json",
    },
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getBanks = () => {
  const config = {
    baseURL: process.env.PAYSTACK_HOSTNAME,
    url: "/bank?currency=GHS",
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_API_KEY_LIVE}`,
      "Content-Type": "application/json",
    },
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getPaymentLink = () => {
  const params = JSON.stringify({
    email: "customer585@email.com",
    amount: "200",
  });

  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/transaction/initialize",
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_API_KEY_LIVE}`,
      "Content-Type": "application/json",
    },
  };

  const req = https
    .request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        console.log(JSON.parse(data));
      });
    })
    .on("error", (error) => {
      console.error(error);
    });

  req.write(params);
  req.end();
};

export default {
  initiateMomoPayment,
  submitOTP,
  checkPayment,
  createMomoTransferRecipient,
  makeMoneyTransfer,
  getBanks,
  verifyBankAccount,
  createBankTransferRecipient,
  getPaymentLink,
};
