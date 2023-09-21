const AWS = require("aws-sdk");
const fs = require("fs");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const s3 = new AWS.S3();

// const localFilePath = "path/to/your/local/file.txt";
// const bucketName = "your-s3-bucket-name";
// const objectKey = "folder/file.txt";

export const uploadToS3 = (filePath, bucketName, objectKey) => {
  const fileStream = fs.createReadStream(filePath);
  const params = {
    Bucket: bucketName,
    Key: objectKey,
    Body: fileStream,
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        console.error(`Error uploading file to S3: ${err}`);
        reject(err);
      } else {
        console.log(`File uploaded to S3 at ${data.Location}`);
        resolve(data.Location);
      }
    });
  });
};
