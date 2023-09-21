import Joi from "joi";

export const signUpValidationSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email(),
  phoneNumber: Joi.string().required(),
  imageURL: Joi.string().allow(""),
});

export const userValidationSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),
  imageURL: Joi.string().allow(""),
  role: Joi.string(),
});

export const authValidationSchema = Joi.object({
  phoneNumber: Joi.string().required(),
});

export const verifyOtpValidationSchema = Joi.object({
  phoneNumber: Joi.string().required(),
  code: Joi.number().required(),
});

export const categoriesValidationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  imageURL: Joi.string(),
});

export const mediaValidationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
});

export const instructorSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email(),
  phoneNumber: Joi.string(),
  imageURL: Joi.string(),
  introUrl: Joi.string(),
  state: Joi.string().valid("Active", "Inactive"),
});

export const contentSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  content_type: Joi.string().valid("main", "part"),
  cover: Joi.string().required(),
  sections: Joi.array().items(Joi.string()),
  intro: Joi.string(),
  source: Joi.object({
    type: Joi.string().valid("text", "audio", "video", "image", "body"),
    body: Joi.string(),
  }),
  category_id: Joi.string(),
  instructor_id: Joi.string(),
  subscriber_type: Joi.string().valid("standard", "premium").default("standard"),
});