import User from "../models/User.js";
import Category from "../models/Category.js";

export const fetchUserByPhoneNumber = async (phoneNumber) => {
  try {
    const user = await User.findOne({ phoneNumber });
    return user;
  } catch (error) {
    throw error;
  }
};

export const fetchCategoryByTitle = async (title) => {
  try {
    const category = await Category.findOne({ title });
    return category;
  } catch (error) {
    throw error;
  }
};

export const paginate = async ({ Model, page = 1, pageSize = 10, filters = {}, referenceName = "" }) => {
  try {
    if (!Model) {
      throw new Error("Model is required");
    }
    delete filters.page;
    delete filters.pageSize;
    const totalCount = await Model.countDocuments(filters);
    const totalPages = Math.ceil(totalCount / pageSize);
    const results = await Model.find(filters)
      .populate(referenceName)
      .sort({ created_at: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return {
      page,
      pageSize,
      totalPages,
      totalCount,
      results,
    };
  } catch (error) {
    throw error;
  }
};
