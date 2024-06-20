import { codes } from "../constants/codes.js";
import Short from "../models/Short.js";
import { customCreate, deleteRecord, paginate } from "../utils/common.js";

export const createShort = async (payload) => {
	try {
		payload.publish_date = new Date(payload.publish_date);
		const shortData = await customCreate(Short, payload);
		return {
			code: codes.RESOURCE_CREATED,
			data: shortData
		};
	} catch (error) {
		throw error;
	}
};

export const updateShort = async (shortId, payload) => {
	try {
		await Short.updateOne({ _id: shortId }, { $set: payload });
		return {
			code: codes.RESOURCE_CREATED,
			data: {
				id: shortId
			}
		};
	} catch (error) {
		throw error;
	}
};

export const fetchShorts = async (payload = {}) => {
	try {
		const { page, pageSize, ...filters } = payload;
		const sortOder = { publish_date: -1 };
		const referenceName = "tag_id";
		const result = await paginate({ Model: Short, page, pageSize, filters, sortOder, referenceName });
		return {
			code: codes.RESOURCE_FETCHED,
			data: result
		};
	} catch (error) {
		throw error;
	}
};

export const fetchShort = async (payload) => {
	try {
		const { shortId } = payload;
		const short = await Short.findById(shortId);
		if (!short) {
			throw {
				code: codes.NOT_FOUND
			};
		}
		const { _id, ...rest } = short._doc;
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

export const deleteShort = async (shortId) => {
	try {
		await deleteRecord(Content, shortId);
		return {
			code: codes.RESOURCE_DELETED
		};
	} catch (error) {
		throw error;
	}
};
