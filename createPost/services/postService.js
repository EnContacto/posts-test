const { v4: uuidv4 } = require("uuid");
const { dynamoDB, s3 } = require("../config/awsConfig");
const redisClient = require("../config/redisConfig");
module.exports.createPost = async ({ user, content, imageUrl }) => {
  const id = uuidv4();
  const timestamp = new Date().toISOString();
  const newPost = { id, user, content, imageUrl, timestamp };
  
  await dynamoDB.client.put({ TableName: dynamoDB.tableName, Item: newPost }).promise();
  redisClient.setex(id, 3600, JSON.stringify(newPost));
  
  return newPost;
};

module.exports.uploadImageToS3 = async (fileBuffer, fileName, mimeType) => {
  const uploadParams = {
    Bucket: s3.bucketName,
    Key: fileName,
    Body: fileBuffer,
    ContentType: mimeType
  };
  
  const result = await s3.client.upload(uploadParams).promise();
  return result.Location;
};