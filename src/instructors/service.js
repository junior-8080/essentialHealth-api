import { codes } from "../constants/codes.js";
import { customCreate, paginate } from "../utils/common.js";
import Instructor from "../models/Instructor.js";

export const createInstructor = async (payload) => {
  try {
    const instructorData = await Instructor.findOne({ email: payload.email, phoneNumber: payload.phoneNumber });
    if (instructorData) {
      throw {
        code: codes.RESOURCE_EXISTS,
        message: "instructor already exists",
        data: payload,
      };
    }
    const InstructorData = await customCreate(Instructor, payload);

    return {
      code: codes.RESOURCE_CREATED,
      data: InstructorData,
    };
  } catch (error) {
    throw error;
  }
};

export const fetchInstructors = async (payload = {}) => {
  try {
    const { page, pageSize } = payload;
    const result = await paginate({ Model: Instructor, page, pageSize, payload });
    return {
      code: codes.RESOURCE_FETCHED,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

export const fetchInstructor = async (payload) => {
  try {
    const { instructorId } = payload;
    const { _doc } = await Instructor.findById(instructorId);

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
