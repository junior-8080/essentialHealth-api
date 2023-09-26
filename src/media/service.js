import { codes } from "../constants/codes.js";
import Media from "../models/Media.js";
import { customCreate, paginate } from "../utils/common.js";

export const createMedia = async (payload) => {
  try {
    const mediaData = await customCreate(Media, payload);
    return {
      code: codes.RESOURCE_CREATED,
      data: mediaData,
    };
  } catch (error) {
    throw error;
  }
};

export const fetchAllMedia = async (payload = {}) => {
  try {
    const { page, pageSize } = payload;
    const result = await paginate({ Model: Media, page, pageSize, payload });
    return {
      code: codes.RESOURCE_FETCHED,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

export const fetchMedia = async (payload) => {
  try {
    const { media_id } = payload;
    const { _doc } = await Media.findById(media_id);

    return {
      code: codes.RESOURCE_FETCHED,
      data: {
        ..._doc,
      },
    };
  } catch (error) {
    throw error;
  }
};
