import { codes } from "../constants/codes.js";
import User from "../models/User.js";
import { fetchUserByPhoneNumber, paginate } from "../utils/common.js";

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
    const { _doc } = await User.create(payload);
    return {
      code: codes.RESOURCE_CREATED,
      data: _doc,
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