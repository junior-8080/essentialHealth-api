import { codes } from "../constants/codes.js";
import {
  AppEventEmitter,
  customCreate,
  deleteRecord,
  fetchDeviceTokens,
  paginate,
  reduceUserPoints
} from "../utils/common.js";
import Message from "../models/Message.js";
import { fetchUser } from "../users/service.js";
import firebase from "../utils/firebase.js";

export const createMessage = async (payload) => {
  try {
    const { data: userData } = await fetchUser({ userId: payload.created_by });
    if (userData.role === "User" && userData.points < parseInt(process.env.MESSAGE_POINTS)) {
      throw {
        code: codes.FORBIDDEN,
        message: "Not enough points to send a message"
      };
    }
    if (userData.role === "User") {
      payload.user_id = payload.created_by;
    }
    const MessageData = await customCreate(Message, payload);
    const data = await reduceUserPoints(userData.id, process.env.MESSAGE_POINTS);
    if (userData.role === "Admin") {
      AppEventEmitter.emit("new-message", {
        type: "message",
        user_id: payload.user_id,
        data: payload
      });
    }
    return {
      code: codes.RESOURCE_CREATED,
      data: MessageData
    };
  } catch (error) {
    throw error;
  }
};

export const fetchMessages = async (payload = {}) => {
  try {
    const { page, pageSize, ...filters } = payload;
    const result = await paginate({ Model: Message, page, pageSize, filters });
    result.results = (result.results || []).reverse();
    return {
      code: codes.RESOURCE_FETCHED,
      data: result
    };
  } catch (error) {
    throw error;
  }
};

export const fetchMessage = async (payload) => {
  try {
    const { messageId } = payload;
    const message = await Message.findById(messageId);
    if (!message) {
      throw {
        code: codes.NOT_FOUND
      };
    }
    const { _id, ...rest } = message._doc;
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

export const fetchMessageChats = async (payload = { page: 1, pageSize: 50 }) => {
  try {
    const { page, pageSize } = payload;
    const skip = (page - 1) * pageSize;

    const latestChats = await Message.aggregate([
      {
        $sort: { created_at: -1 }
      },
      {
        $group: {
          _id: "$user_id",
          messages: { $push: "$$ROOT" }
        }
      },
      {
        $project: {
          _id: 0,
          user: "$_id",
          messages: { $slice: ["$messages", 1] }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $unwind: "$user"
      },
      {
        $project: {
          user: {
            id: "$user._id",
            firstName: "$user.firstName",
            lastName: "$user.lastName",
            profileImage: "$user.profileImage"
            // Include other user fields as needed
          },
          messages: 1
        }
      }
    ]);
    return {
      code: codes.RESOURCE_FETCHED,
      data: {
        page,
        pageSize,

        latestChats
      }
    };
  } catch (error) {
    throw error;
  }
};

export const deleteMessage = async (messageId) => {
  try {
    const result = await deleteRecord(Message, messageId);
    return {
      code: codes.RESOURCE_DELETED
    };
  } catch (error) {
    throw error;
  }
};

AppEventEmitter.on("new-message", async (data) => {
  const deviceTokenData = await fetchDeviceTokens({ user_id: data.user_id });
  console.log("🚀 ~ AppEventEmitter.on ~ deviceTokenData:", deviceTokenData);
  delete data.userId;
  firebase.sendNotificationToMemberById("12", data, deviceTokenData);
});
