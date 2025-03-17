import Joi from "joi";

export const createEventSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  date: Joi.date().required(),
  location: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500),
});

export const updateEventSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  date: Joi.date().iso(),
  location: Joi.string().min(3).max(100),
  description: Joi.string().max(500),
}).min(1);
