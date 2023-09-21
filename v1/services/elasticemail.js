import axios from "axios";

const API_Base = process.env.ELASTIC_EMAIL_BASE_URL;

// SEND EMAIL
const sendEmail = (emailList = [], templateName, templateData = {}) => {
  const emailObjectList = emailList.map((email) => {
    return { email: email };
  });

  const data = {
    recipients: emailObjectList,
    Content: {
      Merge: templateData,
      TemplateName: templateName,
    },
  };

  const config = {
    method: "post",
    url: `${API_Base}/emails`,
    headers: {
      "X-ElasticEmail-ApiKey": process.env.ELASTIC_EMAIL_API_KEY,
    },
    data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default {
  sendEmail,
};
