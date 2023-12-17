import User from "../models/User.js";
import Category from "../models/Category.js";
import { contentTransformer, defaultTransformer, rewardClaimTransformer } from "./dataTransformers.js";
import mongoose, { Model } from "mongoose";

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
    if (payload.challenge === "yes") {
      payload.publish_date = { $lte: Date.now() };
      payload.reward = { $exists: true };
      delete payload.challenge;
    }
    const filters = {
      ...payload,
    };
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    const totalCount = await Model.countDocuments(filters);
    const totalPages = Math.ceil(totalCount / pageSize);
    const populateFields = referenceName ? referenceName.split(",") : "";
    let results = await Model.find(filters)
      .populate(populateFields)
      .sort(sortOder || { created_at: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    switch (referenceName) {
      case "instructor_id":
        results = contentTransformer(results);
        break;
      case "user_id,reward_id":
        results = rewardClaimTransformer(results);
        break;
      default:
        results = defaultTransformer(results);
        break;
    }
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

export const deleteRecord = async (Model, id) => {
  try {
    if (!Model || !id) {
      throw new Error("Model and id required");
    }
    const deleteInfo = await Model.deleteOne({ _id: id });
    return deleteInfo;
  } catch (error) {
    throw error;
  }
};
