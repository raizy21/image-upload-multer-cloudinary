import { Schema, model } from "mongoose";

const imageSchema = new Schema({
  url: { type: String, required: true },
  filename: { type: String, required: true },
  publicId: { type: String, required: true },
});

const eventSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: imageSchema },
  images: { type: [imageSchema] },
});

const Event = model("Event", eventSchema);
export default Event;
