import { ObjectId } from "bson";
import { codes } from "../constants/codes.js";
import { fetchContent } from "../contents/service.js";
import DeviceToken from "../models/DeviceToken.js";
import Labs from "../models/Lab.js";
import User from "../models/User.js";
import UserLabs from "../models/UserLabs.js";
import UserMediaActivity from "../models/UserMediaActivity.js";
import Vital from "../models/Vital.js";
import UserTargetVital from "../models/VitalTarget.js";
import { fetchRewardClaims } from "../rewardClaims/service.js";
import { fetchUserByPhoneNumber } from "../utils/common.js";
import { createDictionary, dateDifference, defaultVitalsTargets, isDateLessThanToday } from "../utils/helpers.js";

export const createUser = async (payload) => {
	try {
		const userExists = await fetchUserByPhoneNumber(payload.phoneNumber);
		if (userExists) {
			throw {
				code: codes.RESOURCE_EXISTS,
				message: "phonenumber already exists",
				data: payload
			};
		}
		const userData = await customCreate(User, payload);
		return {
			code: codes.RESOURCE_CREATED,
			data: userData
		};
	} catch (error) {
		throw error;
	}
};

export const fetchUsers = async (payload = {}) => {
	try {
		const { page, pageSize, ...filters } = payload;
		const result = await paginate({ Model: User, page, pageSize, filters });
		return {
			code: codes.RESOURCE_FETCHED,
			data: result
		};
	} catch (error) {
		throw error;
	}
};

export const fetchUser = async (payload) => {
	try {
		const { userId } = payload;
		let userData = null;
		let isSubscriptionExpired = false;
		const user = await User.findById(userId);
		if (!user) {
			throw {
				code: codes.NOT_FOUND
			};
		}
		const { _id, ...rest } = user._doc;
		userData = {
			id: _id,
			...rest
		};
		if (userData.subscription_type) {
			isSubscriptionExpired = isDateLessThanToday(userData.subscription_type.expiry_date);
		}
		const userSubscriptionData = retrieveUserSubscriptionPlan(userId);
		if (!userSubscriptionData || isSubscriptionExpired) {
			userData = await revokeUserSubscription(userId);
		}
		return {
			code: codes.RESOURCE_FETCHED,
			data: userData
		};
	} catch (error) {
		throw error;
	}
};

export const updateUser = async (userId, payload) => {
	try {
		const { _doc: updatedUser } = await User.findOneAndUpdate({ _id: userId }, { $set: payload }, { new: true });
		const { _id, ...rest } = updatedUser;
		return {
			code: codes.RESOURCE_UPDATED,
			data: {
				id: _id,
				...rest
			}
		};
	} catch (error) {
		throw error;
	}
};

export const revokeUserSubscription = async (userId) => {
	try {
		const { _doc: updatedUser } = await User.findOneAndUpdate(
			{ _id: userId },
			{ $unset: { subscription: "" } },
			{ new: true }
		);
		const { _id, ...rest } = updatedUser;
		return {
			code: codes.RESOURCE_UPDATED,
			data: {
				id: _id,
				...rest
			}
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
				watched: watchedContent[content.id] ? true : false
			};
		});
		return data;
	} catch (error) {
		console.error("Error updating content:", error);
	}
};

export const createUserMediaActivity = async (payload) => {
	try {
		const { data } = await fetchContent(payload.content_id);
		const contentReward = data.reward;
		const userActivities = await UserMediaActivity.findOne({
			content_id: payload.content_id,
			user_id: payload.user_id,
			isChallenge: contentReward ? "yes" : "no"
		});
		if (!userActivities) {
			payload.points = contentReward ? contentReward.points : 0;
			payload.isChallenge = contentReward ? "yes" : "no";
			await customCreate(UserMediaActivity, payload);
		}
		const contentRewardPoints = !userActivities && contentReward ? contentReward.points : 0;
		const updatedUser = await User.findByIdAndUpdate(
			{ _id: payload.user_id },
			{ $inc: { points: contentRewardPoints } },
			{ new: true }
		);
		return {
			code: codes.RESOURCE_CREATED,
			data: {
				points: updatedUser.points
			}
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
			data: userVitalData
		};
	} catch (error) {
		throw error;
	}
};
export const fetchUserVital = async (payload) => {
	try {
		let { userId, created_at } = payload;
		if (!created_at) {
			created_at = new Date(Date.now()).toISOString();
			created_at = created_at.split("T")[0];
		}

		const result = await Vital.find({
			created_at: { $gte: created_at },
			user_id: userId
		});
		let userVitals = result[0];
		const defaultVitals = {
			blood_pressure: {
				dia: {
					progress: 0,
					target: defaultVitalsTargets.dia,
					unit: "mmHg"
				},
				sys: {
					progress: 0,
					target: defaultVitalsTargets.sys,
					unit: "mmHg"
				},
				pulse: {
					progress: 0,
					target: defaultVitalsTargets.pulse,
					unit: "heart rate"
				}
			},
			sugar_level: {
				progress: 0,
				target: defaultVitalsTargets.sugar_level,
				unit: "mmol/L"
			},
			steps: {
				progress: 0,
				target: defaultVitalsTargets.steps,
				unit: "steps"
			},
			water_cups: {
				progress: 0,
				target: defaultVitalsTargets.water_cups,
				unit: "cups"
			},
			user_id: userId
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
			data
		};
	} catch (error) {
		throw error;
	}
};

export const fetchUserVitalNew = async (payload) => {
	try {
		let { userId, created_at } = payload;
		if (!created_at) {
			created_at = new Date(Date.now()).toISOString();
			created_at = created_at.split("T")[0];
		}
		const userData = await User.findById(userId);
		if (!userData) {
			throw {
				code: codes.NOT_FOUND
			};
		}
		const userVitalPreferences = userData.preference.vitals;
		const userVitalResults = await Vital.find({
			created_at: { $gte: created_at },
			user_id: userId
		});
		const userVitalsDictionary = createDictionary(userVitalResults, "type");
		const vitalsNotFound = [];
		userVitalPreferences.map((userVital) => {
			if (!userVitalsDictionary[userVital.type]) {
				const defaultValue = {
					type: userVital.type,
					unit: userVital.unit,
					data_type: userVital.data_type,
					target: userVital.target,
					value: userVital.data_type === "string" ? "0" : 0,
					user_id: new ObjectId(userId)
				};
				vitalsNotFound.push(defaultValue);
			}
		});
		if (vitalsNotFound.length > 0) {
			await Vital.insertMany(vitalsNotFound);
		}
		const results = await Vital.find({
			created_at: { $gte: created_at },
			user_id: userId
		});
		console.log(results);
		const formattedData = results.map((result) => {
			return {
				id: result._id.toString(),
				type: result.type,
				unit: result.unit,
				data_type: result.data_type,
				value: result.value,
				target: result.target,
				user_id: result.user_id.toString(),
				created_at: result.created_at
			};
		});
		return {
			code: codes.RESOURCE_FETCHED,
			data: formattedData
		};
	} catch (error) {
		console.log("🚀 ~ fetchUserVitalNew ~ error:", error);
		throw error;
	}
};

export const fetchUserVitals = async (payload) => {
	try {
		return await fetchRewardClaims(payload);
	} catch (error) {
		throw error;
	}
};

export const deleteUser = async (userId) => {
	try {
		await deleteRecord(Content, userId);
		return {
			code: codes.RESOURCE_DELETED
		};
	} catch (error) {
		throw error;
	}
};

export const fetchUserRecommendedLabs = async (payload) => {
	try {
		const { userId } = payload;
		const { data: userData } = await fetchUser({ userId });
		const ageEndDate = new Date();
		const ageUnit = "years";
		const userAge = dateDifference(userData.dob, ageEndDate, ageUnit);
		const recommendationFilter = {
			"criteria.min_age": { $lte: userAge },
			"criteria.max_age": { $gte: userAge },
			"criteria.gender": { $in: [userData.gender] }
		};
		const recommendedLabs = await Labs.find(recommendationFilter);
		const userLabs = await UserLabs.find({ user_id: userId });
		const userLabsDictionaryKey = "lab_id";
		const userLabsDictionary = createDictionary(userLabs, userLabsDictionaryKey);
		const results = recommendedLabs.map((lab) => {
			const labWithStatus = {
				id: lab._id,
				title: lab.title,
				isCompleted: "no"
			};
			const keyValue = lab._id.toString();
			const userLabData = userLabsDictionary[keyValue];
			if (userLabData) {
				labWithStatus.isCompleted = "yes";
				if (lab.criteria.duration_in_days > 0) {
					console.log(lab);
					const endDate = new Date();
					const startDate = userLabData.created_at;
					const unit = "months";
					const durationInMonth = dateDifference(startDate, endDate, unit);
					if (durationInMonth > lab.criteria.duration_in_days) {
						labWithStatus.isExpired = "yes";
						labWithStatus.created_at = userLabData.created_at;
					}
				}
			}
			labWithStatus.result = userLabData;
			return labWithStatus;
		});
		return {
			code: codes.RESOURCE_FETCHED,
			data: results
		};
	} catch (error) {
		throw error;
	}
};

export const createUserLabResult = async (payload) => {
	try {
		const userLabData = await customCreate(UserLabs, payload);
		return {
			code: codes.RESOURCE_CREATED,
			data: userLabData
		};
	} catch (error) {
		throw error;
	}
};

export const createDeviceToken = async (payload) => {
	try {
		const data = await DeviceToken.find({ user_id: payload.user_id });
		if (data.length === 0) {
			await customCreate(DeviceToken, payload);
		} else {
			await DeviceToken.updateOne({ user_id: payload.user_id }, { $set: { deviceToken: payload.deviceToken } });
		}
		return {
			code: codes.RESOURCE_CREATED
		};
	} catch (error) {
		throw error;
	}
};
