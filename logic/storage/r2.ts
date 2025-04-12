// logic/storage/r2.ts
import AWS from "aws-sdk"

const s3 = new AWS.S3({
  endpoint: `https://${process.env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY,
  secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_KEY,
  signatureVersion: "v4",
  s3ForcePathStyle: true,
  region: "auto",
})

// Aseguramos que el nombre del bucket sea "netherious"
export const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME || "netherious"

export const uploadFile = async ({
  file,
  fileName,
  folder,
}: {
  file: Buffer
  fileName: string
  folder: string
}) => {
  const params = {
    Bucket: bucketName,
    Key: `${folder}/${fileName}`,
    Body: file,
    ACL: "public-read",
  }

  return s3.upload(params).promise()
}

export const listObjects = async (prefix = "") => {
  const params = {
    Bucket: bucketName,
    Prefix: prefix,
  }

  return s3.listObjectsV2(params).promise()
}

export const getObjectStream = async (key: string) => {
  const params = {
    Bucket: bucketName,
    Key: key,
  }

  return s3.getObject(params).createReadStream()
}

export const getObject = async (key: string) => {
  const params = {
    Bucket: bucketName,
    Key: key,
  }

  return s3.getObject(params).promise()
}

export const getObjectUrl = (key: string) => {
  const params = {
    Bucket: bucketName,
    Key: key,
    Expires: 60 * 5, // URL válida por 5 minutos
  }

  return s3.getSignedUrl("getObject", params)
}

export const checkObjectExists = async (key: string): Promise<boolean> => {
  try {
    const params = {
      Bucket: bucketName,
      Key: key,
    }
    await s3.headObject(params).promise()
    return true
  } catch (error) {
    return false
  }
}

export default s3
