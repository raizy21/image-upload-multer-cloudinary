import Event from "../models/event.js";
import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({});
  res.json(events);
});

export const createEvent = asyncHandler(async (req, res) => {
  const {
    body,
    thumbnail: {
      secure_url: url,
      public_id: publicId,
      original_filename: filename,
    },
    images: images = [],
  } = req;
  const event = await Event.create({
    ...body,
    thumbnail: { url, publicId, filename },
    images: images.map((image) => ({
      url: image.secure_url,
      publicId: image.public_id,
      filename: image.original_filename,
    })),
  });
  res.status(201).json(event);
});

export const getEvent = asyncHandler(async (req, res) => {
  const {
    params: { id },
  } = req;
  // const event = await Event.findOne({ _id: id });
  const event = await Event.findById(id);
  if (!event) {
    throw new ErrorResponse(`Event with id ${id} not found`, 404);
  }

  res.json(event);
});

export const updateEvent = asyncHandler(async (req, res) => {
  const {
    params: { id },
    body,
  } = req;
  const event = await Event.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });
  if (!event) {
    throw new ErrorResponse(`Event with id ${id} not found`, 404);
  }
  res.json(event);
});

// without the async handler, you need to use try-catch block
export const deleteEvent = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      throw new ErrorResponse(`Event with id ${id} not found`, 404);
    }
    res.json("Event deleted");
  } catch (error) {
    next(error);
  }
};
