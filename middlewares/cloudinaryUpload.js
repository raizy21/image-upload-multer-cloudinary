import { unlink } from "fs/promises";
import cloudinary from "cloudinary";
import asyncHandler from "../utils/asyncHandler.js";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const cloudinaryUploadFile = asyncHandler(async (req, res, next) => {
  const { file } = req;

  const result = await cloudinary.v2.uploader.upload(file.path);
  unlink(file.path);
  // req.thumbnail = {}
  req[file.fieldname] = result;

  next();
});

export const cloudinaryUploadFiles = asyncHandler(async (req, res, next) => {
  const { files } = req;
  const results = [];
  const fieldName = files[0].fieldname;
  for (const file of files) {
    const result = await cloudinary.v2.uploader.upload(file.path);
    results.push(result);
    unlink(file.path);
  }
  // req.images = [{}. {}]
  req[fieldName] = results;
  next();
});

export const cloudinaryUploadMultipleFields = (singleFields) => {
  return asyncHandler(async (req, res, next) => {
    const { files: fields } = req;

    for (const field in fields) {
      const files = fields[field];
      const results = [];

      for (const file of files) {
        const result = await cloudinary.v2.uploader.upload(file.path);
        results.push(result);
        unlink(file.path);
      }

      if (singleFields.includes(field)) {
        req[field] = results[0];
      } else {
        req[field] = results;
      }
    }

    next();
  });
};
