import { codes } from "../constants/codes.js";
import Category from "../models/Category.js";
import { fetchCategoryByTitle, paginate } from "../utils/common.js";

export const createCategory = async (payload) => {
  try {
    const categoryExists = await fetchCategoryByTitle(payload.title);
    console.log("🚀 ~ file: service.js:8 ~ createCategory ~ categoryExists:", categoryExists);
    if (categoryExists) {
      throw {
        code: codes.RESOURCE_EXISTS,
        message: "category already exists",
        data: payload,
      };
    }
    const { _doc } = await Category.create(payload);
    return {
      code: codes.RESOURCE_CREATED,
      data: _doc,
    };
  } catch (error) {
    throw error;
  }
};

export const fetchCategories = async (payload = {}) => {
  try {
    const { page, pageSize } = payload;
    const result = await paginate({ Model: Category, page, pageSize, payload });
    return {
      code: codes.RESOURCE_FETCHED,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

export const fetchCategory = async (payload) => {
  try {
    const { category_id } = payload;
    const { _doc } = await Category.findById(category_id);

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
