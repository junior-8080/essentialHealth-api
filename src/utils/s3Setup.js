import { getFileCategory } from "./helpers.js";
import AWS from "aws-sdk";
import fs from "fs";
const privateS3Url = "https://d3i6i25ynczqbh.cloudfront.net";
// const AWS = require("aws-sdk");
// const fs = require("fs");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1",
});
const s3 = new AWS.S3();
const bucketName = "essentials-s3-bucket";

export const uploadToS3 = (filePath, fileName, mediaType, directory) => {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(filePath);
    const params = {
      Bucket: bucketName,
      Key: `${directory}/${fileName}`,
      Body: fileStream,
      ContentType: mediaType,
    };
    s3.upload(params, (err, data) => {
      if (err) {
        console.error(`Error uploading file to S3: ${err}`);
        reject(err);
      } else {
        const fileUrl = `${privateS3Url}/${data.Key}`;
        fs.rm(filePath, (err, data) => {
          if (err) console.log(err);
          resolve(fileUrl);
        });
      }
    });
  });
};
