import express from "express";
import {
  getEvents,
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/events.js";
import validateSchema from "../middlewares/validateSchema.js";
import { createEventSchema, updateEventSchema } from "../schemas/events.js";

import { upload } from "../middlewares/multerUpload.js";
import {
  cloudinaryUploadFile,
  cloudinaryUploadFiles,
  cloudinaryUploadMultipleFields,
} from "../middlewares/cloudinaryUpload.js";

const router = express.Router();

router
  .route("/")
  .get(getEvents)
  .post(
    // upload.single("thumbnail"), // for one file
    // upload.array("images"),  // for multiple files
    // for multiple fields with files
    upload.fields([
      { name: "thumbnail", single: true },
      { name: "images", maxCount: 8 },
    ]), // for multiple fields
    // validateSchema(createEventSchema),
    // cloudinaryUploadFile, // for one file
    // cloudinaryUploadFiles, // for multiple files
    cloudinaryUploadMultipleFields(["thumbnail"]), // for multiple fields
    createEvent
  );
router
  .route("/:id")
  .get(getEvent)
  .put(validateSchema(updateEventSchema), updateEvent)
  .delete(deleteEvent);

export default router;
