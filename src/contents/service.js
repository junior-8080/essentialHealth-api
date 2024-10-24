import { codes } from "../constants/codes.js";
import {
  AppEventEmitter,
  customCreate,
  deleteRecord,
  fetchDeviceTokens,
  paginate,
  retrieveSubscriptionPlanOrder
} from "../utils/common.js";
import Content from "../models/Content.js";
import { contentTransformer } from "../utils/dataTransformers.js";
import { userMediaActivity } from "../users/service.js";
import Subscription from "../models/Subscription.js";
import { fetchSubscription } from "../subscriptions/service.js";
import { fetchSubscriptionPlan } from "../subscriptionPlans/service.js";
import firebase from "../utils/firebase.js";

export const createContent = async (payload) => {
  try {
    payload.publish_date = payload.content_type === "main" ? new Date(payload.publish_date) : undefined;
    if (payload.subscriptionId) {
      const { data } = await fetchSubscriptionPlan(payload.subscriptionPlanId);
      payload.subscription_order = data.subscription_order;
    } else {
      payload.subscription_order = 0;
    }
    const contentData = await customCreate(Content, payload);
    AppEventEmitter.emit("new-content", {
      type: "content",
      data: contentData
    });
    return {
      code: codes.RESOURCE_CREATED,
      data: contentData
    };
  } catch (error) {
    throw error;
  }
};

export const updateContent = async (contentId, payload) => {
  try {
    await Content.updateOne({ _id: contentId }, { $set: payload });
    return {
      code: codes.RESOURCE_CREATED,
      data: {
        id: contentId
      }
    };
  } catch (error) {
    throw error;
  }
};

export const fetchContents = async (payload = {}, userId = "", userRole) => {
  try {
    const { page, pageSize, ...filters } = payload;
    filters.content_type = filters.content_type ? filters.content_type : "main";
    if (filters.tags) {
      filters.tags = { $all: filters.tags.split(",") };
    }
    if (userRole === "User") {
      const userSubscriptionOrder = await retrieveSubscriptionPlanOrder(userId);
      filters.subscription_order = { $lte: userSubscriptionOrder };
    }
    const referenceName = "instructor_id,category_id";
    const sortOder = { publish_date: -1 };
    let data = await paginate({ Model: Content, page, pageSize, filters, referenceName, sortOder });
    if (userId) {
      data.results = await userMediaActivity(data.results, userId);
    }
    return {
      code: codes.RESOURCE_FETCHED,
      data: data
    };
  } catch (error) {
    throw error;
  }
};

export const fetchContent = async (contentId) => {
  try {
    const filters = {
      _id: contentId
    };
    const page = 1;
    const pageSize = 1;
    const referenceName = "instructor_id";
    const { results } = await paginate({ Model: Content, page, pageSize, filters, referenceName });
    if (results.length === 0) {
      throw {
        code: codes.NOT_FOUND
      };
    }
    return {
      code: codes.RESOURCE_FETCHED,
      data: results[0]
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
      content_type: "part"
    };
    const {
      data: { results }
    } = await fetchContents(sectionPayload, userId);
    return {
      code: codes.RESOURCE_FETCHED,
      data: results
    };
  } catch (error) {
    throw error;
  }
};

export const deleteContent = async (contentId) => {
  try {
    await deleteRecord(Content, contentId);
    return {
      code: codes.RESOURCE_DELETED
    };
  } catch (error) {
    throw error;
  }
};

AppEventEmitter.on("new-content", async (data) => {
  const deviceTokenData = await fetchDeviceTokens();
  firebase.sendNotificationToMemberById("12", data, deviceTokenData);
});
