import { initializeApp } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";

const setup = () => {
  initializeApp({
    //credential: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    serviceAccount: process.env.GOOGLE_APPLICATION_CREDENTIALS
  });
};

const sendNotificationToMemberById = (memberId, data, tokens) => {
  let title = "Essential Health";
  let notificationData = {};
  switch (data.type) {
    case "content":
      title = "New Content Available!!!🥳";
      data = { title: data.data.title, description: data.data.description };
      break;
    case "message":
      title = "You have a new message📩";
      data = data.data;
    default:
      break;
  }
  getMessaging()
    .sendMulticast({
      notification: { title },
      data: notificationData,
      tokens,
      android: { priority: "high" }
    })
    .then((response) => {
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
};

export default { setup, sendNotificationToMemberById };
