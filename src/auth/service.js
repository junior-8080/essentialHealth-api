import { codes } from "../constants/codes.js";
import { fetchUserByPhoneNumber } from "../utils/common.js";
import { generateAndSendOtpViaArkesel, verifyOptViaArkesel } from "../utils/arkesel.js";
import { generateToken } from "../utils/helpers.js";
import { fetchUsers } from "../users/service.js";

export const login = async (payload) => {
  try {
    const { phoneNumber } = payload;
    const userExist = await fetchUserByPhoneNumber(phoneNumber);
    if (!userExist) {
      throw {
        code: codes.NOT_FOUND,
        message: "User does not exist",
      };
    }
    const otpData = await generateAndSendOtpViaArkesel(phoneNumber);
    return {
      code: codes.RESOURCE_CREATED,
      message: "Opt has been send to sent successfully",
      data: {
        otp_expires_minutes: process.env.OTP_EXPIRY_TIME,
        otp_length: process.env.OPT_LENGTH,
        otp_ussd_code: otpData.ussd_code,
      },
    };
  } catch (error) {
    throw error;
  }
};

export const adminLogin = async (payload) => {
  try {
    const { email, password } = payload;
    const role = "Admin";
    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      throw {
        code: codes.UNAUTHORIZED,
      };
    }
    const adminName = process.env.ADMIN_NAME.split(",");
    const token = generateToken({ email, role });
    return {
      code: codes.RESOURCE_CREATED,
      message: "Otp verification successful",
      data: {
        token,
        user: {
          firstName: adminName[0],
          lastName: adminName[1],
          email,
          role: "Admin",
        },
      },
    };
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async (payload) => {
  //   console.log("🚀 ~ file: service.js:32 ~ verifyOtp ~ payload:", payload);
  try {
    const { phoneNumber, code } = payload;
    const userExist = await fetchUserByPhoneNumber(phoneNumber);
    if (!userExist) {
      throw {
        code: codes.NOT_FOUND,
        message: "User does not exist",
      };
    }
    const otpData = await verifyOptViaArkesel(phoneNumber, code);
    if (otpData.code !== "1100") {
      throw {
        code: codes.UNAUTHORIZED,
        message: "Opt code has expired",
      };
    }
    const { _id, role, firstName, lastName } = userExist;
    const token = generateToken({ id: _id, role });
    return {
      code: codes.RESOURCE_CREATED,
      message: "Otp verification successful",
      data: {
        token,
        user: {
          firstName,
          lastName,
          role,
        },
      },
    };
  } catch (error) {
    throw error;
  }
};