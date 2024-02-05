import { codes } from "../constants/codes.js";
import { customCreate, deleteRecord, paginate } from "../utils/common.js";
import Instructor from "../models/Instructor.js";

export const createInstructor = async (payload) => {
  try {
    const instructorData = await Instructor.findOne({ email: payload.email, phoneNumber: payload.phoneNumber });
    if (instructorData) {
      throw {
        code: codes.RESOURCE_EXISTS,
        message: "instructor already exists",
        data: payload
      };
    }
    const InstructorData = await customCreate(Instructor, payload);
    return {
      code: codes.RESOURCE_CREATED,
      data: InstructorData
    };
  } catch (error) {
    throw error;
  }
};

export const fetchInstructors = async (payload = {}) => {
  try {
    const { page, pageSize, ...filters } = payload;
    const result = await paginate({ Model: Instructor, page, pageSize, filters });
    return {
      code: codes.RESOURCE_FETCHED,
      data: result
    };
  } catch (error) {
    throw error;
  }
};

export const fetchInstructor = async (payload) => {
  try {
    const { instructorId } = payload;
    const instructor = await Instructor.findById(instructorId);
    if (!instructor) {
      throw {
        code: codes.NOT_FOUND
      };
    }
    const { _id, ...rest } = instructor._doc;
    return {
      code: codes.RESOURCE_FETCHED,
      data: {
        id: _id,
        ...rest
      }
    };
  } catch (error) {
    throw error;
  }
};

export const deleteInstructor = async (instructorId) => {
  try {
    const result = await deleteRecord(Instructor, instructorId);
    return {
      code: codes.RESOURCE_DELETED
    };
  } catch (error) {
    throw error;
  }
};
