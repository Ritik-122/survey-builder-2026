const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3 = new S3Client({
  region: process.env.AWS_REGION,
});

const uploadToS3 = async (key, body) => {
  const safeKey = String(key);

  const uploadCommand = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: safeKey,
    Body: body,
    ContentType: "text/csv",
  });
  await s3.send(uploadCommand);

  // Generate download URL
  const downloadCommand = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: safeKey,
  });

  const downloadurl = await getSignedUrl(s3, downloadCommand, {
    expiresIn: 60 * 5,
  }); //5minutes

  return downloadurl;
};
module.exports = { uploadToS3 };
