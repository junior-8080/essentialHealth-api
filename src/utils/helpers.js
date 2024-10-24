import jwt from "jsonwebtoken";
import {codes} from "../constants/codes.js";
import fs from "fs";
import VitalType from "../models/VitalType.js";
// import path from "path";

const errorFormatter = function (error) {
  const { details } = error;
  const messages = details.map((detail) => detail.message.replace(/"/g, ""));
  return messages;
};

export const validateRequestPayload = function (schema, payload) {
  return new Promise((resolve, reject) => {
    const { error, value } = schema.validate(payload, { abortEarly: false });
    if (error) {
      reject({
        code: codes.INVALID_PARAMETERS,
        data: errorFormatter(error)
      });
    }
    return resolve(value);
  });
};

export const generateToken = function (payload) {
  const token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY, { expiresIn: "30d" });
  return token;
};

export const decodeJwtToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
};

const base = "/Users/abdulmukhsinahmed";

export const createUploadDirectories = () => {
  const absolutePath =
    process.env.NODE_ENV === "development" ? `${base}/${process.env.FILE_UPLOAD_DIR}` : process.env.FILE_UPLOAD_DIR;
  if (!fs.existsSync(absolutePath)) {
    fs.mkdirSync(absolutePath, { recursive: true });
  }
  console.log("Upload Directory Created");
};

export const getFileCategory = (mimeType) => {
  switch (true) {
    case mimeType.startsWith("video/"):
      return "video";
    case mimeType.startsWith("audio/"):
      return "audio";
    case mimeType.startsWith("image/"):
      return "image";
    case mimeType === "application/pdf":
      return "pdf";
    default:
      return "other";
  }
};

export const calculateEndDate = (startDate, durationMonths) => {
  const startDateObj = new Date(startDate);
  const endDate = new Date(startDateObj.setMonth(startDateObj.getMonth() + durationMonths));
  const formattedEndDate = endDate.toISOString().split("T")[0];

  return formattedEndDate;
};

export const isDateLessThanToday = (inputDate) => {
  const inputDateObj = new Date(inputDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return inputDateObj < today;
};

export const defaultVitalsTargets = {
  blood_pressure: 130,
  sugar_level: 6.0,
  steps: 10000,
  water_cups: 8,
  sys: 90,
  dia: 86,
  pulse: 81,
  sugar: 4.7
};

export const chunkArray = (array, chunkSize) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

export const dateDifference = (startDate, endDate, unit) => {
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
  const oneMonth = 30 * oneDay; // approximation for a month (30 days)
  const diffMilliseconds = Math.abs(endDate - startDate);
  switch (unit.toLowerCase()) {
    case "years":
      return Math.floor(diffMilliseconds / (365.25 * oneDay));
    case "months":
      return Math.floor(diffMilliseconds / oneMonth);
    case "days":
      return Math.floor(diffMilliseconds / oneDay);
    default:
      throw new Error('Invalid unit. Please use "years", "months", or "days".');
  }
};

export const createDictionary = (list, key) => {
  return list.reduce((dictionary, item) => {
    const keyValue = item[key];
    if (keyValue) {
      const keyValueString = keyValue.toString();
      dictionary[keyValueString] = item;
    }
    return dictionary;
  }, {});
};

export const vitalDetailsTransformer =  (vitals,vitalTypes)  =>{
  try {

    // Create a mapping for vital types for easy lookup
    const vitalTypeMapping = {};
    vitalTypes.forEach(vitalType => {
      vitalTypeMapping[vitalType._id] = {
        title: vitalType.title,
        icon: vitalType.icon,
        variables: vitalType.variables.reduce((acc, variable) => {
          acc[variable.keyword] = {
            unit: variable.unit,
            dataType: variable.data_type
          };
          return acc;
        }, {})
      }
    });

    // Map each vital to its corresponding variables and enrich with units and types
    const allVitals = vitals.map(vital => {
      const variableMapping = vitalTypeMapping[vital.vital_id].variables || {};
      const vitalName = vitalTypeMapping[vital.vital_id].title;
      const vitalIcon = vitalTypeMapping[vital.vital_id].icon;
      const resolvedVariables = vital.variables.map(variable => {
        const details = variableMapping[variable.keyword];
        return {
          keyword: variable.keyword,
          value: variable.value,
          unit: details ? details.unit : null,
          dataType: details ? details.dataType : null
        };
      });

      return {
        vital_id: vital.id,
        title: vitalName,
        icon: vitalIcon,
        created_at: vital.created_at,
        variables: resolvedVariables
      };
    }); // Return an array of resolved vitals
    return allVitals
  } catch (error) {
    console.error(error);
    throw error; // Or handle the error as needed
  }
}

export const userVitalDetailsTransformer = (vitals, vitalTypes, userVitalPreferences) => {
  // Create a mapping for vital types for easy lookup
  const vitalTypeMapping = {};
  vitalTypes.forEach(vitalType => {
    vitalTypeMapping[vitalType._id] = {
      title: vitalType.title,
      icon: vitalType.icon,
      variables: vitalType.variables.reduce((acc, variable) => {
        acc[variable.keyword] = {
          unit: variable.unit,
          dataType: variable.data_type
        };
        return acc;
      }, {})
    };
  });

  // Map each vital to its corresponding variables and enrich with units and types
  const allVitals = userVitalPreferences.map(preferenceId => {
    const vital = vitals.find(v => v.vital_id.toString() === preferenceId.toString());

    if (vital) {
      // If the vital exists, return it with its details
      const variableMapping = vitalTypeMapping[vital.vital_id].variables || {};
      const vitalName = vitalTypeMapping[vital.vital_id].title;
      const vitalIcon = vitalTypeMapping[vital.vital_id].icon;

      const resolvedVariables = vital.variables.map(variable => {
        const details = variableMapping[variable.keyword];
        return {
          keyword: variable.keyword,
          value: variable.value,
          unit: details ? details.unit : null,
          dataType: details ? details.dataType : null
        };
      });

      return {
        vital_id: vital.vital_id,
        title: vitalName,
        icon: vitalIcon,
        created_at: vital.created_at,
        variables: resolvedVariables,
        is_recorded: true // Mark as recorded
      };
    } else {
      // If the vital doesn't exist, return a default object
      const vitalTypeDetails = vitalTypeMapping[preferenceId];

      return {
        vital_id: preferenceId,
        title: vitalTypeDetails ? vitalTypeDetails.title : "Unknown Vital",
        icon: vitalTypeDetails ? vitalTypeDetails.icon : null,
        created_at: new Date().toDateString(), // No timestamp if not recorded
        variables: Object.keys(vitalTypeDetails.variables).map(keyword => ({
          keyword,
          value: 0, // Default value when not recorded
          unit: vitalTypeDetails.variables[keyword].unit,
          dataType: vitalTypeDetails.variables[keyword].dataType
        })),
        is_recorded: false // Mark as not recorded
      };
    }
  });

  return allVitals; // Return the array of resolved vitals
};

