import { codes } from "../constants/codes.js";
import { validateRequestPayload } from "../utils/helpers.js";
import {
	userActivityValidationSchema,
	userLabSchema,
	userUpdateValidationSchema,
	userValidationSchema,
	vitalTargetValidationSchema
} from "../utils/schemaValidators.js";
import * as userServices from "./service.js";
import responseHandler from "../utils/responseHandler.js";

export const createUser = async (request, response, next) => {
	try {
		const requestPayload = { ...request.body };
		const validPayload = await validateRequestPayload(userValidationSchema, requestPayload);
		const responsePayload = await userServices.createUser(validPayload);
		return responseHandler(responsePayload, response);
	} catch (error) {
		next(error);
	}
};

export const fetchUsers = async (request, response, next) => {
	try {
		const responsePayload = await userServices.fetchUsers();
		return responseHandler(responsePayload, response);
	} catch (error) {
		next(error);
	}
};

export const fetchUser = async (request, response, next) => {
	try {
		const requestPayload = { ...request.params };
		const responsePayload = await userServices.fetchUser(requestPayload);
		return responseHandler(responsePayload, response);
	} catch (error) {
		next(error);
	}
};

export const updateUser = async (request, response, next) => {
	try {
		const requestPayload = { ...request.body };
		const validPayload = await validateRequestPayload(userUpdateValidationSchema, requestPayload);
		const userId = request.userDetails.id;
		const responsePayload = await userServices.updateUser(userId, validPayload);
		return responseHandler(responsePayload, response);
	} catch (error) {
		next(error);
	}
};

export const createUserMediaActivity = async (request, response, next) => {
	try {
		const requestPayload = {
			user_id: request.userDetails.id,
			...request.body
		};
		const validPayload = await validateRequestPayload(userActivityValidationSchema, requestPayload);
		const responsePayload = await userServices.createUserMediaActivity(validPayload);
		return responseHandler(responsePayload, response);
	} catch (error) {
		next(error);
	}
};

export const createUserVitalTarget = async (request, response, next) => {
	try {
		const requestPayload = {
			user_id: request.userDetails.id,
			vitals: { ...request.body }
		};
		const validPayload = await validateRequestPayload(vitalTargetValidationSchema, requestPayload);
		const responsePayload = await userServices.createUserVitalTarget(validPayload);
		return responseHandler(responsePayload, response);
	} catch (error) {
		next(error);
	}
};

export const fetchUserVital = async (request, response, next) => {
	try {
		const requestPayload = { ...request.params, ...request.query };
		const responsePayload = await userServices.fetchUserVitalNewNew(requestPayload);
		return responseHandler(responsePayload, response);
	} catch (error) {
		next(error);
	}
};

export const fetchUserReward = async (request, response, next) => {
	try {
		const requestPayload = {
			user_id: request.params.userId,
			page: request.query.page,
			pageSize: request.query.pageSize
		};
		const responsePayload = await userServices.fetchUserReward(requestPayload);
		return responseHandler(responsePayload, response);
	} catch (error) {
		next(error);
	}
};

export const createDeviceToken = async (request, response, next) => {
	try {
		const requestPayload = {
			user_id: request.userDetails.id,
			deviceToken: request.body.deviceToken
		};
		const responsePayload = await userServices.createDeviceToken(requestPayload);
		return responseHandler(responsePayload, response);
	} catch (error) {
		next(error);
	}
};

export const createUserRecommendedLabResult = async (request, response, next) => {
	try {
		const requestPayload = { ...request.body, type: "recommended" };
		const validPayload = await validateRequestPayload(userLabSchema, requestPayload);
		validPayload.user_id = request.userDetails.id;
		const responsePayload = await userServices.createUserRecommendedLabResult(validPayload);
		return responseHandler(responsePayload, response);
	} catch (error) {
		next(error);
	}
};

export const fetchUserRecommendedLabs = async (request, response, next) => {
	try {
		const userId = request.userDetails.role === "Admin" ? request.params.userId : request.userDetails.id;
		const responsePayload = await userServices.fetchUserRecommendedLabs({ userId });
		return responseHandler(responsePayload, response);
	} catch (error) {
		next(error);
	}
};

export const createUserLab = async (request, response, next) => {
	try {
		const requestPayload = {
			name: request.body.name,
			user_id: request.userDetails.id,
			lab_result: request.body.lab_result,
			type: "unrecommended"
		};
		const responsePayload = await userServices.createUserLab(requestPayload);
		return responseHandler(responsePayload, response);
	} catch (error) {
		next(error);
	}
};

export const fetchUserLabs = async (request, response, next) => {
	try {
		const userRole = request.userDetails.role;
		const userId = userRole === "Admin" ? request.params.userId : request.userDetails.id;
		if (!userId) {
			throw { code: codes.INVALID_PARAMETERS, message: "invalid user" };
		}
		const requestPayload = { user_id: userId };
		if (userRole === "User") {
			requestPayload.type = "unrecommended";
		}
		const responsePayload = await userServices.fetchUserLabs(requestPayload);
		return responseHandler(responsePayload, response);
	} catch (error) {
		next(error);
	}
};

export const fetchUntrackedVitals = async (request, response, next) => {
	try {
		const userRole = request.userDetails.role;
		const userId = userRole === "Admin" ? request.params.userId : request.userDetails.id;
		if (!userId) {
			throw { code: codes.INVALID_PARAMETERS, message: "invalid user" };
		}
		const responsePayload = await userServices.fetchUntrackedVitals({ userId });
		return responseHandler(responsePayload, response);
	} catch (error) {
		next(error);
	}
};

export const deleteUser = async (request, response, next) => {
	try {
		const userId = request.params.userId;
		const responsePayload = await userServices.deleteUser(userId);
		return responseHandler(responsePayload, response);
	} catch (error) {
		next(error);
	}
};