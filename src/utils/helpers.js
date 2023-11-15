import jwt from "jsonwebtoken";
import { codes } from "../constants/codes.js";
import fs from "fs";
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
        data: errorFormatter(error),
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

export const defaultVitalsTargets = {
  blood_pressure: 130,
  sugar_level: 6.0,
  steps: 10000,
  water_cups: 8,
};
