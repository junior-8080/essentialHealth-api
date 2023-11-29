import { codes } from "../constants/codes.js";
import { customCreate, paginate } from "../utils/common.js";
import Content from "../models/Content.js";
import { contentTransformer } from "../utils/dataTransformers.js";
import { userMediaActivity } from "../users/service.js";

export const createContent = async (payload) => {
  try {
    payload.publish_date = payload.content_type === "main" ? new Date(payload.publish_date) : undefined;
    const contentData = await customCreate(Content, payload);
    return {
      code: codes.RESOURCE_CREATED,
      data: contentData,
    };
  } catch (error) {
    throw error;
  }
};

export const updateContent = async (contentId, payload) => {
  try {
    const responseData = await Content.updateOne({ _id: contentId }, { $set: payload });
    return {
      code: codes.RESOURCE_CREATED,
      data: {
        id: contentId,
      },
    };
  } catch (error) {
    throw error;
  }
};

export const fetchContents = async (payload = {}, userId = "") => {
  try {
    const { page, pageSize } = payload;
    payload.content_type = payload.content_type ? payload.content_type : "main";
    if (payload.tags) {
      payload.tags = { $all: payload.tags.split(",") };
    }

    const referenceName = "instructor_id";
    const sortOder = { publish_date: -1 };
    let data = await paginate({ Model: Content, page, pageSize, payload, referenceName, sortOder });
    if (userId) {
      data.results = await userMediaActivity(data.results, userId);
    }
    return {
      code: codes.RESOURCE_FETCHED,
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

export const fetchContent = async (contentId) => {
  try {
    const payload = {
      _id: contentId,
    };
    const page = 1;
    const pageSize = 1;
    const referenceName = "instructor_id";
    const { results } = await paginate({ Model: Content, page, pageSize, payload, referenceName });
    if (results.length === 0) {
      throw {
        code: codes.NOT_FOUND,
      };
    }
    return {
      code: codes.RESOURCE_FETCHED,
      data: results[0],
    };
  } catch (error) {
    throw error;
  }
};

export const fetchContentSections = async (contentId, userId) => {
  try {
    const mainContent = (await Content.findById({ _id: contentId })) || {};
    const sectionPayload = {
      ids: (mainContent.sections || []).join(","),
      content_type: "part",
    };
    const {
      data: { results },
    } = await fetchContents(sectionPayload, userId);
    // console.log("🚀 ~ file: service.js:83 ~ fetchContentSections ~ results:", results);

    return {
      code: codes.RESOURCE_FETCHED,
      data: results,
    };
  } catch (error) {
    throw error;
  }
};
