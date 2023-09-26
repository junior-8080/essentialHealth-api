import { codes } from "../constants/codes.js";
import User from "../models/User.js";
import { customCreate, fetchUserByPhoneNumber, paginate } from "../utils/common.js";

export const createUser = async (payload) => {
  try {
    const userExists = await fetchUserByPhoneNumber(payload.phoneNumber);
    if (userExists) {
      throw {
        code: codes.RESOURCE_EXISTS,
        message: "phonenumber already exists",
        data: payload,
      };
    }
    const userData = await customCreate(User, payload);
    return {
      code: codes.RESOURCE_CREATED,
      data: userData,
    };
  } catch (error) {
    throw error;
  }
};

export const fetchUsers = async (payload = {}) => {
  try {
    const { page, pageSize } = payload;
    const result = await paginate({ Model: User, page, pageSize, payload });
    return {
      code: codes.RESOURCE_FETCHED,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

export const fetchUser = async (payload) => {
  try {
    const { user_id } = payload;
    const { _doc } = await User.findById(user_id);

    return {
      code: codes.RESOURCE_FETCHED,
      data: {
        ..._doc,
      },
    };
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userId, payload) => {
  try {
    const responseData = await User.updateOne({ _id: userId }, { $set: payload });
    return {
      code: codes.RESOURCE_UPDATED,
      data: {
        id: userId,
      },
    };
  } catch (error) {
    throw error;
  }
};
