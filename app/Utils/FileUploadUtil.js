"use client";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const auth = {
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.MY_AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};

async function uploadFileToS3(file, fileName) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${fileName}`,
    Body: buffer,
    ContentType: file.type,
  };

  const command = new PutObjectCommand(params);
  try {
    const s3Client = new S3Client(auth);
    await s3Client.send(command);
    const url = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
    return {
      status: "success",
      message: "File has been uploaded.",
      fileName: file.name,
      url: url,
    };
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
}

export async function uploadFileMain(formData) {
  try {
    const file = formData.get("file");
    if (file.size === 0) {
      return { status: "error", message: "Please select a file." };
    }
    const uniqueFileName = `${Date.now()}_${uuidv4()}`;
    await uploadFileToS3(file, uniqueFileName);

    const url = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${uniqueFileName}`;

    const response = {
      status: "success",
      message: "File has been uploaded.",
      fileName: file.name,
      url: url,
    };
    return response;
  } catch (error) {
    return { status: "error", message: error.toString() };
  }
}
