const { dynamoDB } = require("../config/awsConfig");
const redisClient = require("../config/redisConfig");
module.exports.getPost = async (postId) => {
  return new Promise((resolve, reject) => {
    redisClient.get(postId, async (err, cachedPost) => {
      if (cachedPost) {
        return resolve(JSON.parse(cachedPost));
      }
      
      try {
        const params = { TableName: dynamoDB.tableName, Key: { id: postId } };
        const post = await dynamoDB.client.get(params).promise();
        if (!post.Item) throw new Error("Post not found");
        redisClient.setex(postId, 3600, JSON.stringify(post.Item)); // Cache en Redis
        resolve(post.Item);
      } catch (error) {
        reject(error);
      }
    });
  });
};
