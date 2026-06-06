import { validateRequestPayload } from "../utils/helpers.js";
import { vitalValidationSchema, vitalUpdateValidationSchema } from "../utils/schemaValidators.js";
import * as vitalServices from "./service.js";
import responseHandler from "../utils/responseHandler.js";

export const createVital = async (request, response, next) => {
	try {
		const requestPayload = { ...request.body };
		const validPayload = await validateRequestPayload(vitalValidationSchema, requestPayload);
		const responsePayload = await vitalServices.createVital(validPayload);
		return responseHandler(responsePayload, response);
	} catch (error) {
		next(error);
	}
};

export const updateVital = async (request, response, next) => {
	try {
		const requestPayload = { ...request.body };
		const vitalId = request.params.vitalId;
		const validPayload = await validateRequestPayload(vitalUpdateValidationSchema, requestPayload);
		const responsePayload = await vitalServices.updateVital(vitalId, validPayload);
		return responseHandler(responsePayload, response);
	} catch (error) {
		next(error);
	}
};

export const fetchVitals = async (request, response, next) => {
	try {
		const requestPayload = { ...request.query };
		const role = request.userDetails?.role;
		if (role === "User") {
			requestPayload.user_id = request.userDetails.id;
		}
		const responsePayload = await vitalServices.fetchVitals(requestPayload);
		return responseHandler(responsePayload, response);
	} catch (error) {
		next(error);
	}
};

export const fetchVital = async (request, response, next) => {
	try {
		const requestPayload = { ...request.params };
		const responsePayload = await vitalServices.fetchVital(requestPayload);
		return responseHandler(responsePayload, response);
	} catch (error) {
		next(error);
	}
};