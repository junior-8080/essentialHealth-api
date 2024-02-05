import { codes } from "../constants/codes.js";
import Media from "../models/Media.js";
import { customCreate, deleteRecord, paginate } from "../utils/common.js";

export const createMedia = async (payload) => {
  try {
    let mediaData = payload;
    if (payload.name !== "userProfileImage") {
      mediaData = await customCreate(Media, payload);
    }
    return {
      code: codes.RESOURCE_CREATED,
      data: mediaData
    };
  } catch (error) {
    throw error;
  }
};

export const fetchAllMedia = async (payload = {}) => {
  try {
    const { page, pageSize, ...filters } = payload;
    const result = await paginate({ Model: Media, page, pageSize, filters });
    return {
      code: codes.RESOURCE_FETCHED,
      data: result
    };
  } catch (error) {
    throw error;
  }
};

export const fetchMedia = async (payload) => {
  try {
    const { mediaId } = payload;
    const media = await Media.findById(mediaId);
    if (!media) {
      throw {
        code: codes.NOT_FOUND
      };
    }
    const { _id, ...rest } = media._doc;
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

export const deleteMedia = async (mediaId) => {
  try {
    await deleteRecord(Media, mediaId);
    return {
      code: codes.RESOURCE_DELETED
    };
  } catch (error) {
    throw error;
  }
};
