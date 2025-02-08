const AWS = require("aws-sdk");

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

module.exports = {
  dynamoDB: {
    tableName: process.env.DYNAMODB_TABLE,
    client: new AWS.DynamoDB.DocumentClient()
  },
  s3: {
    bucketName: process.env.S3_BUCKET,
    client: new AWS.S3()
  }
};
