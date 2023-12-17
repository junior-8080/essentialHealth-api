import { codes } from "../constants/codes.js";
import Media from "../models/Media.js";
import { customCreate, deleteRecord, paginate } from "../utils/common.js";

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
    const { mediaId } = payload;
    const { _doc } = await Media.findById(mediaId);

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

export const deleteMedia = async (mediaId) => {
  try {
    await deleteRecord(Media, mediaId);
    return {
      code: codes.RESOURCE_DELETED,
    };
  } catch (error) {
    throw error;
  }
};
