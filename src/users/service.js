import { codes } from "../constants/codes.js";
import User from "../models/User.js";
import UserMediaActivity from "../models/UserMediaActivity.js";
import Vital from "../models/Vital.js";
import UserTargetVital from "../models/VitalTarget.js";
import { customCreate, fetchUserByPhoneNumber, paginate } from "../utils/common.js";
import { defaultVitalsTargets } from "../utils/helpers.js";

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
    const { userId } = payload;
    const { _doc } = await User.findById(userId);

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

export const createUserVitalTarget = async (payload) => {
  try {
    const userVitalData = await customCreate(UserTargetVital, payload);
    return {
      code: codes.RESOURCE_CREATED,
      data: userVitalData,
    };
  } catch (error) {
    throw error;
  }
};
export const fetchUserVital = async (payload) => {
  console.log("🚀 ~ file: service.js:115 ~ fetchUserVital ~ payload:", payload);
  try {
    let { userId, created_at } = payload;
    if (!created_at) {
      created_at = new Date(Date.now());
    }
    console.log({
      created_at: { $gte: created_at, $lte: created_at },
      user_id: userId,
    });
    const result = await Vital.find({
      created_at: { $lte: created_at },
      user_id: userId,
    });
    let userVitals = result[0];
    const defaultVitals = {
      blood_pressure: {
        dia: {
          progress: 0,
          target: defaultVitalsTargets.dia,
          unit: "mmHg",
        },
        sys: {
          progress: 0,
          target: defaultVitalsTargets.sys,
          unit: "mmHg",
        },
        pulse: {
          progress: 0,
          target: defaultVitalsTargets.pulse,
          unit: "heart rate",
        },
      },
      sugar_level: {
        progress: 0,
        target: defaultVitalsTargets.sugar_level,
        unit: "mmol/L",
      },
      steps: {
        progress: 0,
        target: defaultVitalsTargets.steps,
        unit: "steps",
      },
      water_cups: {
        progress: 0,
        target: defaultVitalsTargets.water_cups,
        unit: "cups",
      },
      user_id: userId,
    };

    if (!userVitals) {
      userVitals = await Vital.create(defaultVitals);
    }
    const stringifyData = JSON.stringify(userVitals);
    const data = JSON.parse(stringifyData);
    data.id = data._id;
    delete data._id;
    return {
      code: codes.RESOURCE_FETCHED,
      data,
    };
  } catch (error) {
    throw error;
  }
};
