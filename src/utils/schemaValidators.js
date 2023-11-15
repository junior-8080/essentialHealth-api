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

export const userUpdateValidationSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().email(),
  phoneNumber: Joi.string(),
  imageURL: Joi.string(),
}).min(1);

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

export const categoriesUpdateValidationSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  imageURL: Joi.string(),
}).min(1);

export const tagValidationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  imageURL: Joi.string(),
});

export const updateTagValidationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  imageURL: Joi.string(),
}).min(1);

// export const mediaValidationSchema = Joi.object({
//   title: Joi.string().required(),
//   description: Joi.string(),
// });

export const instructorSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email(),
  phoneNumber: Joi.string(),
  imageURL: Joi.string(),
  introUrl: Joi.string(),
  state: Joi.string().valid("Active", "Inactive"),
});

export const contentValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  content_type: Joi.string().valid("main", "part"),
  cover: Joi.string().required(),
  sections: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
  intro: Joi.string(),
  source: Joi.object({
    type: Joi.string().valid("audio", "video", "image", "session", "article"),
    body: Joi.string().when("type", {
      is: "session",
      then: Joi.string().allow(""),
    }),
  }),
  category_id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
  tags: Joi.array()
    .items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/))
    .required(),
  instructor_id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),
  subscriber_type: Joi.string().valid("standard", "premium").default("standard"),
  publish_date: Joi.date().required(),
  created_by: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
});

export const contentUpdatedValidationSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  content_type: Joi.string().valid("main", "part"),
  cover: Joi.string(),
  sections: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
  intro: Joi.string(),
  source: Joi.object({
    type: Joi.string().valid("text", "audio", "video", "image", "body"),
    body: Joi.string().when("type", {
      is: "session",
      then: Joi.string().allow(""),
    }),
  }),
  category_id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
  tags: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
  instructor_id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
  subscriber_type: Joi.string().valid("standard", "premium").default("standard"),
  publish_date: Joi.date().required(),
  created_by: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
});

export const mediaValidationSchema = Joi.object({
  title: Joi.string(),
  fileUrl: Joi.string().required(),
  name: Joi.string(),
  description: Joi.string(),
});

export const shortValidationSchema = Joi.object({
  resource: Joi.string(),
  type: Joi.string().allow("image", "note", "short-video"),
  publish_date: Joi.date().required(),
});

export const shortUpdateValidationSchema = Joi.object({
  resource: Joi.string(),
  type: Joi.string().allow("image", "note", "short-video"),
  publish_date: Joi.date(),
});

export const vitalValidationSchema = Joi.object({
  blood_pressure: {
    progress: Joi.number(),
    target: Joi.number(),
    unit: Joi.string(),
  },
  sugar_level: {
    progress: Joi.number(),
    target: Joi.number(),
    unit: Joi.string(),
  },
  steps: {
    progress: Joi.number(),
    target: Joi.number(),
    unit: Joi.string(),
  },
  water_cups: {
    progress: Joi.number(),
    target: Joi.number(),
    unit: Joi.string(),
  },
});

export const vitalTargetValidationSchema = Joi.object({
  vitals: Joi.object({
    blood_pressure: Joi.number(),
    sugar_level: Joi.number(),
    steps: Joi.number(),
    water_cups: Joi.number(),
  }),
  user_id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
});

export const userActivityValidationSchema = Joi.object({
  user_id: Joi.string().required(),
  content_id: Joi.string().required(),
});
