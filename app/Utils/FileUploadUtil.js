"use client";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const auth = {
  region: "us-east-1",
  credentials: {
    accessKeyId: "AKIAYZMHEXSYIO5JNKIT",
    secretAccessKey: "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",
  },
};

async function uploadFileToS3(file, fileName) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const params = {
    Bucket: "ischat",
    Key: `${fileName}`,
    Body: buffer,
    ContentType: file.type,
  };

  const command = new PutObjectCommand(params);
  try {
    const s3Client = new S3Client(auth);
    await s3Client.send(command);
    const url = `https://ischat.s3.amazonaws.com/${fileName}`;
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

    const url = `https://ischat.s3.amazonaws.com/${uniqueFileName}`;

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
