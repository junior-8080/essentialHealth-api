import User from "../models/User.js";
import Category from "../models/Category.js";
import { contentTransformer, defaultTransformer, rewardClaimTransformer } from "./dataTransformers.js";
import mongoose, { Model } from "mongoose";
import Transactions from "../models/Transactions.js";
import Subscription from "../models/Subscription.js";
import { fetchSubscription } from "../subscriptions/service.js";
import { fetchSubscriptionPlan } from "../subscriptionPlans/service.js";
import { createUser } from "../users/service.js";
import { codes } from "../constants/codes.js";
import DeviceToken from "../models/DeviceToken.js";
import { EventEmitter } from "events";

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

export const paginate = async ({ Model, page = 1, pageSize = 10, filters = {}, referenceName = "", sortOder }) => {
	try {
		if (!Model) {
			throw new Error("Model is required");
		}
		if (filters.ids) {
			filters = {
				...filters,
				_id: {
					$in: filters.ids.split(",")
				}
			};
			delete filters.ids;
		}
		if (filters.publish_date) {
			filters.publish_date = new Date(filters.publish_date);
			const endOfDay = new Date(filters.publish_date);
			endOfDay.setHours(23, 59, 59, 999);
			filters.publish_date = { $gte: filters.publish_date, $lt: endOfDay };
		}
		console.log(filters);
		if (filters.created_at) {
			filters.created_at = new Date(filters.created_at);
			const endOfDay = new Date(filters.created_at);
			endOfDay.setHours(23, 59, 59, 999);
			filters.created_at = { $gte: filters.created_at, $lt: endOfDay };
		}
		if (filters.challenge === "yes") {
			filters.publish_date = { $lte: Date.now() };
			filters.reward = { $exists: true };
			delete filters.challenge;
		}
		// console.log(filters);
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
			results
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

export const retrieveSubscriptionPlanOrder = async (userId) => {
	try {
		let subscriptionOrder = 0;
		const subscriptionData = await Subscription.findOne({ user_id: userId, expiry_date: { $gt: Date.now() } });
		if (subscriptionData) {
			const subscriptionPlanId = subscriptionData.subscriptionPlan_id?.toString();
			const { data } = await fetchSubscriptionPlan(subscriptionPlanId);
			subscriptionOrder = data.subscription_order;
		}
		return subscriptionOrder;
	} catch (error) {
		throw error;
	}
};

export const retrieveUserSubscriptionPlan = async (userId) => {
	const subscriptionData = await Subscription.findOne({ user_id: userId, expiry_date: { $gt: Date.now() } });
	if (subscriptionData) {
		const subscriptionPlanId = subscriptionData.subscriptionPlan_id?.toString();
		const { data } = await fetchSubscriptionPlan(subscriptionPlanId);
		return data;
	}
	return;
};

export const createAdmin = async (payload) => {
	try {
		await createUser(payload);
	} catch (error) {
		if (error.code === codes.RESOURCE_EXISTS) {
			return;
		} else {
			throw error;
		}
	}
};

export const fetchDeviceTokens = async (filters = {}) => {
	const deviceTokens = await DeviceToken.find(filters);
	const tokens = deviceTokens.map((item) => item.deviceToken);
	return [...new Set(tokens)];
};

export const reduceUserPoints = async (userId, points) => {
	const updatedUser = await User.findByIdAndUpdate({ _id: userId }, { $inc: { points: -points } }, { new: true });
	return updatedUser;
};

export const AppEventEmitter = new EventEmitter();
