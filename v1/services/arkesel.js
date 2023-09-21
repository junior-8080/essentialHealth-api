import axios from "axios";

const API_Base = process.env.ARKESEL_BASE_URL;

// SEND SMS
const sendSMS = (senderID, message, recipients) => {
  const data = {
    sender: senderID,
    message,
    recipients,
    // callback_url: "https://api.domain.com/webhooks/arkesel/sms"
  };

  const config = {
    method: "post",
    url: `${API_Base}/sms/send`,
    headers: {
      "api-key": process.env.SMS_API_KEY,
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

// SCHEDULE SMS
const sendScheduledSMS = (senderID, message, recipients, scheduledDateTime) => {
  const data = {
    sender: senderID,
    message,
    recipients,
    scheduled_date: scheduledDateTime,
    // callback_url: "https://api.domain.com/webhooks/arkesel/sms"
  };

  const config = {
    method: "post",
    url: `${API_Base}/sms/send`,
    headers: {
      "api-key": process.env.SMS_API_KEY,
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

// CHECK SMS DELIVERY DETAILS
const checkSMSDeliveryDetails = (smsUUID) => {
  const config = {
    method: "get",
    url: `${API_Base}/sms/${smsUUID}`,
    headers: {
      "api-key": process.env.SMS_API_KEY,
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

// CHECK SMS ACCOUNT BALANCE
const checkSMSAccountBalance = () => {
  const config = {
    method: "get",
    url: `${API_Base}/clients/balance-details`,
    headers: {
      "api-key": process.env.SMS_API_KEY,
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

// SEND OTP
const sendOTP = (phoneNumber) => {
  const data = {
    expiry: 5,
    length: 6,
    medium: "sms",
    message:
      "Please enter the verification code: %otp_code% to continue with your setup.",
    number: phoneNumber,
    sender_id: "Huggle Pay",
    type: "numeric",
  };

  const config = {
    method: "post",
    url: `https://sms.arkesel.com/api/otp/generate`,
    headers: {
      "api-key": process.env.SMS_API_KEY,
    },
    data,
  };

  axios(config)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};

const verifyOTP = (code, phoneNumber) => {
  const data = {
    code: code,
    number: phoneNumber,
  };

  const config = {
    method: "post",
    url: `https://sms.arkesel.com/api/otp/verify`,
    headers: {
      "api-key": process.env.SMS_API_KEY,
    },
    data,
  };

  axios(config)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};

export default {
  sendSMS,
  sendScheduledSMS,
  checkSMSDeliveryDetails,
  checkSMSAccountBalance,
  sendOTP,
  verifyOTP,
};
