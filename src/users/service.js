import { codes } from "../constants/codes.js";
import User from "../models/User.js";
import UserMediaActivity from "../models/UserMediaActivity.js";
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

export const userMediaActivity = async (contents, userId) => {
  try {
    const results = await UserMediaActivity.find({ user_id: userId });
    const watchedContent = {};
    results.map((activity) => {
      watchedContent[activity.content_id] = true;
    });
    const data = contents.map((content) => {
      return {
        ...content,
        watched: watchedContent[content.id] ? true : false,
      };
    });
    return data;
  } catch (error) {
    console.error("Error updating content:", error);
  }
};

export const createUserMediaActivity = async (payload) => {
  try {
    const userData = await customCreate(UserMediaActivity, payload);
    return {
      code: codes.RESOURCE_CREATED,
      data: userData,
    };
  } catch (error) {
    throw error;
  }
};
