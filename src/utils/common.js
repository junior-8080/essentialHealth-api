import User from "../models/User.js";
import Category from "../models/Category.js";
import { contentTransformer, defaultTransformer } from "./dataTransformers.js";
import mongoose from "mongoose";

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

export const paginate = async ({ Model, page = 1, pageSize = 10, payload = {}, referenceName = "", sortOder }) => {
  try {
    if (!Model) {
      throw new Error("Model is required");
    }
    delete payload.page;
    delete payload.pageSize;
    if (payload.ids) {
      payload = {
        ...payload,
        _id: {
          $in: payload.ids.split(","),
        },
      };
      delete payload.ids;
    }
    if (payload.publish_date) {
      payload.publish_date = { $gte: payload.publish_date, $lte: payload.publish_date };
    }
    if (payload.summary === "yes") {
      payload.publish_date = { $lte: Date.now() };
      delete payload.summary;
    }
    const filters = {
      ...payload,
    };

    page = parseInt(page);
    pageSize = parseInt(pageSize);
    const totalCount = await Model.countDocuments(filters);
    const totalPages = Math.ceil(totalCount / pageSize);
    let results = await Model.find(filters)
      .populate(referenceName)
      .sort(sortOder || { created_at: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    results = referenceName === "instructor_id" ? contentTransformer(results) : defaultTransformer(results);
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

export const customCreate = async (Model, payload = {}) => {
  try {
    if (!Model) {
      throw new Error("Model is required");
    }
    const { _doc } = await Model.create(payload);
    const { _id, ...rest } = _doc;
    return { id: _id, ...rest };
  } catch (error) {
    throw error;
  }
};
