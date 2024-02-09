import { initializeApp } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";

const setup = () => {
  initializeApp({
    //credential: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    serviceAccount: process.env.GOOGLE_APPLICATION_CREDENTIALS
  });
};

const sendNotificationToMemberById = (memberId, data) => {
  // This registration token comes from the client FCM SDKs.
  const registrationToken =
    "duxMeta0nJG9340Exv0_XB:APA91bE-9m-vbRGPj05i7XKOBMcZ1_tmLr1niCAP785DpNzPidmoQiNVMB7GmfhcVQtCtxCYPb2n3-1GNB69qFotHJXFaMU0_6WRxO5EXTk4ImvpT-GYtQ2Pddy_1nskgRCgwZQrtMKn";

  const message = {
    data: {
      score: "850",
      time: "2:45"
    },
    token: registrationToken
  };

  getMessaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
};

export default { setup, sendNotificationToMemberById };
