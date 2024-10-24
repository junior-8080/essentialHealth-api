import { validateRequestPayload } from "../utils/helpers.js";
import { vitalValidationSchema, vitalUpdateValidationSchema } from "../utils/schemaValidators.js";
import * as vitalServices from "./service.js";

export const createVital = async (request, response, next) => {
	try {
		const requestPayload = {
			...request.body
		};
		const validPayload = await validateRequestPayload(vitalValidationSchema, requestPayload);
		const responsePayload = await vitalServices.createVital(validPayload);
		response.locals.responsePayload = {
			...responsePayload
		};
		next();
	} catch (error) {
		response.locals.responsePayload = error;
		next();
	}
};

export const updateVital = async (request, response, next) => {
	try {
		const requestPayload = {
			...request.body
		};
		const vitalId = request.params.vitalId;
		const validPayload = await validateRequestPayload(vitalUpdateValidationSchema, requestPayload);
		const responsePayload = await vitalServices.updateVital(vitalId, validPayload);
		response.locals.responsePayload = {
			...responsePayload
		};
		next();
	} catch (error) {
		response.locals.responsePayload = error;
		next();
	}
};

export const fetchVitals = async (request, response, next) => {
	try {
		const requestPayload = {
			...request.query
		};
		const role = request.userDetails?.role;
		const userId = request.userDetails?.id;
		if (role === "User") {
			requestPayload.user_id = userId;
		}
		const responsePayload = await vitalServices.fetchVitals(requestPayload);
		response.locals.responsePayload = {
			...responsePayload
		};
		next();
	} catch (error) {
		response.locals.responsePayload = error;
		next();
	}
};

export const fetchVital = async (request, response, next) => {
	try {
		const requestPayload = {
			...request.params
		};
		const responsePayload = await vitalServices.fetchVital(requestPayload);
		response.locals.responsePayload = {
			...responsePayload
		};
		next();
	} catch (error) {
		response.locals.responsePayload = error;
		next();
	}
};
