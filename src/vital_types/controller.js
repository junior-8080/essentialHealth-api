import { validateRequestPayload } from "../utils/helpers.js";
import { vitalTypeSchema, updateVitalTypeScheme } from "../utils/schemaValidators.js";
import * as vitalTypeServices from "./service.js";

export const createVitalType = async (request, response, next) => {
	try {
		const requestPayload = {
			...request.body
		};
		const validPayload = await validateRequestPayload(vitalTypeSchema, requestPayload);
		const responsePayload = await vitalTypeServices.createVitalType(validPayload);
		response.locals.responsePayload = {
			...responsePayload
		};
		next();
	} catch (error) {
		response.locals.responsePayload = error;
		next();
	}
};

export const updateVitalType = async (request, response, next) => {
	try {
		const requestPayload = {
			...request.body
		};
		const vitalTypeId = request.params.vitalTypeId;
		const validPayload = await validateRequestPayload(updateVitalTypeScheme, requestPayload);
		const responsePayload = await vitalTypeServices.updateVitalType(vitalTypeId, validPayload);
		response.locals.responsePayload = {
			...responsePayload
		};
		next();
	} catch (error) {
		response.locals.responsePayload = error;
		next();
	}
};

export const fetchVitalTypes = async (request, response, next) => {
	try {
		const requestPayload = {
			...request.query
		};
		const responsePayload = await vitalTypeServices.fetchVitalTypes(requestPayload);
		response.locals.responsePayload = {
			...responsePayload
		};
		next();
	} catch (error) {
		response.locals.responsePayload = error;
		next();
	}
};

export const fetchVitalType = async (request, response, next) => {
	try {
		const requestPayload = {
			...request.params
		};
		const responsePayload = await vitalTypeServices.fetchVitalType(requestPayload);
		response.locals.responsePayload = {
			...responsePayload
		};
		next();
	} catch (error) {
		response.locals.responsePayload = error;
		next();
	}
};

export const deleteVitalType = async (request, response, next) => {
	try {
		const shortId = request.params.vitalTypeId;
		const responsePayload = await vitalTypeServices.deleteVitalType(vitalTypeId);
		response.locals.responsePayload = {
			...responsePayload
		};
		next();
	} catch (error) {
		response.locals.responsePayload = error;
		next();
	}
};
