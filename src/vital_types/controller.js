import { validateRequestPayload } from "../utils/helpers.js";
import { vitalTypeSchema, updateVitalTypeScheme } from "../utils/schemaValidators.js";
import * as vitalTypeServices from "./service.js";
import responseHandler from "../utils/responseHandler.js";

export const createVitalType = async (request, response, next) => {
	try {
		const requestPayload = { ...request.body };
		const validPayload = await validateRequestPayload(vitalTypeSchema, requestPayload);
		const responsePayload = await vitalTypeServices.createVitalType(validPayload);
		return responseHandler(responsePayload, response);
	} catch (error) {
		next(error);
	}
};

export const updateVitalType = async (request, response, next) => {
	try {
		const requestPayload = { ...request.body };
		const vitalTypeId = request.params.vitalTypeId;
		const validPayload = await validateRequestPayload(updateVitalTypeScheme, requestPayload);
		const responsePayload = await vitalTypeServices.updateVitalType(vitalTypeId, validPayload);
		return responseHandler(responsePayload, response);
	} catch (error) {
		next(error);
	}
};

export const fetchVitalTypes = async (request, response, next) => {
	try {
		const requestPayload = { ...request.query };
		const responsePayload = await vitalTypeServices.fetchVitalTypes(requestPayload);
		return responseHandler(responsePayload, response);
	} catch (error) {
		next(error);
	}
};

export const fetchVitalType = async (request, response, next) => {
	try {
		const requestPayload = { ...request.params };
		const responsePayload = await vitalTypeServices.fetchVitalType(requestPayload);
		return responseHandler(responsePayload, response);
	} catch (error) {
		next(error);
	}
};

export const deleteVitalType = async (request, response, next) => {
	try {
		const vitalTypeId = request.params.vitalTypeId;
		const responsePayload = await vitalTypeServices.deleteVitalType(vitalTypeId);
		return responseHandler(responsePayload, response);
	} catch (error) {
		next(error);
	}
};