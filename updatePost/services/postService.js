const { dynamoDB } = require("../config/awsConfig");
const redisClient = require("../config/redisConfig");
module.exports.updatePost = async (postId, updatedData) => {
  const params = {
    TableName: dynamoDB.tableName,
    Key: { id: postId },
    UpdateExpression: "set content = :content, imageUrl = :imageUrl",
    ExpressionAttributeValues: {
      ":content": updatedData.content || null,
      ":imageUrl": updatedData.imageUrl || null
    },
    ReturnValues: "ALL_NEW"
  };

  const result = await dynamoDB.client.update(params).promise();
  redisClient.setex(postId, 3600, JSON.stringify(result.Attributes)); // Cache en Redis
  return result.Attributes;
};