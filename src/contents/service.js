import { codes } from "../constants/codes.js";
import { customCreate, paginate } from "../utils/common.js";
import Content from "../models/Content.js";
import { contentTransformer } from "../utils/dataTransformers.js";

export const createContent = async (payload) => {
  try {
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

export const fetchContents = async (payload = {}) => {
  try {
    const { page, pageSize } = payload;
    payload.content_type = payload.content_type ? payload.content_type : "main";
    console.log(payload);
    const referenceName = "category_id instructor_id";
    const result = await paginate({ Model: Content, page, pageSize, payload, referenceName });
    return {
      code: codes.RESOURCE_FETCHED,
      data: result,
    };
  } catch (error) {
    // console.log("🚀 ~ file: service.js:27 ~ fetchContents ~ error:", error);
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
    const referenceName = "category_id instructor_id";
    const result = await paginate({ Model: Content, page, pageSize, payload, referenceName });
    return {
      code: codes.RESOURCE_FETCHED,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

export const fetchContentSections = async (contentId) => {
  try {
    const mainContent = (await Content.findById({ _id: contentId })) || {};
    const sectionPayload = {
      ids: (mainContent.sections || []).join(","),
      content_type: "part",
    };
    const {
      data: { results },
    } = await fetchContents(sectionPayload);
    return {
      code: codes.RESOURCE_FETCHED,
      data: results,
    };
  } catch (error) {
    throw error;
  }
};
