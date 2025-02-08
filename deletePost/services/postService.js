const { dynamoDB, s3 } = require("../config/awsConfig");
const redisClient = require("../config/redisConfig");
module.exports.deletePost = async (postId) => {
  const params = { TableName: dynamoDB.tableName, Key: { id: postId } };
  const post = await dynamoDB.client.get(params).promise();
  
  if (!post.Item) throw new Error("Post not found");
  
  // Eliminar de DynamoDB
  await dynamoDB.client.delete(params).promise();
  
  // Eliminar de Redis
  redisClient.del(postId);
  
  // Si el post tenía una imagen, eliminarla de S3
  if (post.Item.imageUrl) {
    const s3Params = { Bucket: s3.bucketName, Key: post.Item.imageUrl.split("/").pop() };
    await s3.client.deleteObject(s3Params).promise();
  }
};
