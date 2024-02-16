import { codes } from "../constants/codes.js";
import { AppEventEmitter, customCreate, deleteRecord, fetchDeviceTokens, paginate } from "../utils/common.js";
import Message from "../models/Message.js";
import { fetchUser } from "../users/service.js";

export const createMessage = async (payload) => {
  console.log("🚀 ~ createMessage ~ payload:", payload);
  try {
    const { data: userData } = await fetchUser({ userId: payload.created_by });
    if (userData.role === "User" && userData.points < parseInt(process.env.MESSAGE_POINTS)) {
      throw {
        code: codes.FORBIDDEN,
        message: "Not enough points to send a message"
      };
    }
    //for now using the notification. this can be updated to pushe
    if (userData.role === "Admin") {
      AppEventEmitter.emit("new-message", {
        type: "message",
        userId: payload.user_id,
        data: contentData
      });
    }
    const MessageData = await customCreate(Message, payload);
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

export const fetchMessageChats = async (payload) => {
  try {
    const latestChats = await Message.aggregate([
      {
        $sort: { created_at: -1 } // Sort by descending order of created_at
      },
      {
        $group: {
          _id: "$created_by",
          messages: { $push: "$$ROOT" } // Store the whole document in the 'messages' array
        }
      },
      {
        $project: {
          _id: 0,
          user: "$_id",
          messages: { $slice: ["$messages", 10] } // Take only the latest 10 messages
        }
      }
    ]);
    console.log(latestChats);
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
  const deviceTokenData = await fetchDeviceTokens({ user_id: data.userId });
  delete data.userId;
  firebase.sendNotificationToMemberById("12", data, deviceTokenData);
});
