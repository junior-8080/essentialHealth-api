import { codes } from "../constants/codes.js";
import VitalType from "../models/VitalType.js";

import { customCreate, deleteRecord, paginate } from "../utils/common.js";

export const createVitalType = async (payload) => {
	try {
		payload.publish_date = new Date(payload.publish_date);
		const vitalData = await VitalType.findOne({ type: payload.type });
		if (vitalData) {
			throw {
				code: codes.RESOURCE_EXISTS
			};
		}
		const vitalTypeData = await customCreate(VitalType, payload);
		return {
			code: codes.RESOURCE_CREATED,
			data: vitalTypeData
		};
	} catch (error) {
		throw error;
	}
};

export const updateVitalType = async (vitalTypeId, payload) => {
	try {
		await VitalType.updateOne({ _id: vitalTypeId }, { $set: payload });
		return {
			code: codes.RESOURCE_CREATED,
			data: {
				id: vitalTypeId
			}
		};
	} catch (error) {
		throw error;
	}
};

export const fetchVitalTypes = async (payload = {}) => {
	try {
		const { page, pageSize, ...filters } = payload;
		const result = await paginate({ Model: VitalType, page, pageSize, filters });
		return {
			code: codes.RESOURCE_FETCHED,
			data: result
		};
	} catch (error) {
		throw error;
	}
};

export const fetchVitalType = async (payload) => {
	try {
		const { vitalTypeId } = payload;
		const vitalType = await VitalType.findById(vitalTypeId);
		if (!vitalType) {
			throw {
				code: codes.NOT_FOUND
			};
		}
		const { _id, ...rest } = vitalType._doc;
		return {
			code: codes.RESOURCE_FETCHED,
			data: {
				id: _id,
				...rest
			}
		};
	} catch (error) {
		throw error;
	}
};

export const deleteVitalType = async (vitalTypeId) => {
	try {
		await deleteRecord(Content, vitalTypeId);
		return {
			code: codes.RESOURCE_DELETED
		};
	} catch (error) {
		throw error;
	}
};
