import axios from "axios";

const ARKESEL_BASE_URL = "https://sms.arkesel.com/api";

export const generateAndSendOtpViaArkesel = async (phoneNumber) => {
	try {
		if (!phoneNumber) {
			throw new Error("phoneNumber is required");
		}
		const data = {
			expiry: 10,
			length: 6,
			medium: "sms",
			message: "Essential Health verification code:%otp_code%",
			number: phoneNumber,
			sender_id: "Test",
			type: "numeric"
		};
		const headers = {
			"api-key": process.env.SMS_API_KEY
		};
		const response = await axios.post(`${ARKESEL_BASE_URL}/otp/generate`, data, { headers });
		console.log("🚀 ~ generateAndSendOtpViaArkesel ~ response:", response.data);

		return response.data;
	} catch (error) {
		console.log("🚀 ~ generateAndSendOtpViaArkesel ~ error:", error);
		throw error;
	}
};

export const verifyOptViaArkesel = async (phoneNumber, otpCode) => {
	try {
		if (!phoneNumber || !otpCode) {
			throw new Error("phoneNumber and otpCode are required");
		}
		const data = {
			api_key: process.env.SMS_API_KEY,
			code: otpCode,
			number: phoneNumber
		};
		const headers = {
			"api-key": process.env.SMS_API_KEY
		};
		const response = await axios.post(`${ARKESEL_BASE_URL}/otp/verify`, data, { headers });
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const sendSMSViaArkesel = async (redeemCode, phoneNumber, userName, voucherCode) => {
	try {
		const data = {
			sender: "Test",
			message: `🎉 Congrats ${userName}!\n Your redeem code is:${redeemCode}\n ${
				voucherCode ? "Voucher Code" + voucherCode : ""
			}`,
			recipients: [phoneNumber]
		};
		const headers = {
			"api-key": process.env.SMS_API_KEY
		};
		const response = await axios.post(`${ARKESEL_BASE_URL}/v2/sms/send`, data, { headers });
		return response.data;
	} catch (error) {
		throw error;
	}
};
