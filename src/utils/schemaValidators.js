import e from "express";
import Joi from "joi";

const measureSchema = Joi.object({
  measure: Joi.number().required(),
  measure_unit: Joi.string().required(),
});

export const signUpValidationSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email(),
  phoneNumber: Joi.string().required(),
  imageURL: Joi.string().allow(""),
  dob: Joi.date(),
  gender: Joi.string().allow("Male", "Female"),
  height: measureSchema,
  weight: measureSchema,
});

export const userValidationSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),
  profileImage: Joi.string().allow(""),
  role: Joi.string(),
  dob: Joi.date(),
  gender: Joi.string().allow("Male", "Female"),
  height: measureSchema,
  weight: measureSchema,
});

export const userUpdateValidationSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().email(),
  phoneNumber: Joi.string(),
  profileImage: Joi.string(),
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
  tags: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
  instructor_id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),
  subscriber_type: Joi.string().valid("standard", "premium").default("standard"),
  publish_date: Joi.date().when("content_type", {
    is: "main",
    then: Joi.optional(),
    otherwise: Joi.forbidden(),
  }),
  reward: Joi.object({
    points: Joi.number().min(1).max(1000000),
    description: Joi.string(),
  }),
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
    type: Joi.string().valid("audio", "video", "image", "session", "article"),
    body: Joi.string().when("type", {
      is: "session",
      then: Joi.string().allow(""),
    }),
  }),
  category_id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
  tags: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
  instructor_id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
  subscriber_type: Joi.string().valid("standard", "premium").default("standard"),
  publish_date: Joi.date(),
  reward: Joi.object({
    points: Joi.number().min(1).max(1000000),
    description: Joi.string(),
  }),
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
  category_id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),
  publish_date: Joi.date().required(),
});

export const shortUpdateValidationSchema = Joi.object({
  resource: Joi.string(),
  type: Joi.string().allow("image", "note", "short-video"),
  category_id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
  publish_date: Joi.date(),
});

export const vitalValidationSchema = Joi.object({
  blood_pressure: Joi.object({
    dia: Joi.object({
      progress: Joi.number().required(),
      target: Joi.number().required(),
      unit: Joi.string().valid("mmHg").required(),
    }).required(),
    sys: Joi.object({
      progress: Joi.number().required(),
      target: Joi.number().required(),
      unit: Joi.string().valid("mmHg").required(),
    }).required(),
    pulse: Joi.object({
      progress: Joi.number().required(),
      target: Joi.number().required(),
      unit: Joi.string().valid("heart rate").required(),
    }).required(),
  }).required(),
  sugar_level: Joi.object({
    progress: Joi.number().required(),
    target: Joi.number().required(),
    unit: Joi.string().valid("mmol/L").required(),
  }).required(),
  steps: Joi.object({
    progress: Joi.number().required(),
    target: Joi.number().required(),
    unit: Joi.string().valid("steps").required(),
  }).required(),
  water_cups: Joi.object({
    progress: Joi.number().required(),
    target: Joi.number().required(),
    unit: Joi.string().valid("cups").required(),
  }).required(),
  user_id: Joi.string().required(),
});

export const vitalUpdateValidationSchema = Joi.object({
  blood_pressure: Joi.object({
    dia: Joi.object({
      progress: Joi.number().required(),
      target: Joi.number().required(),
      unit: Joi.string().valid("mmHg").required(),
    }).required(),
    sys: Joi.object({
      progress: Joi.number().required(),
      target: Joi.number().required(),
      unit: Joi.string().valid("mmHg").required(),
    }).required(),
    pulse: Joi.object({
      progress: Joi.number().required(),
      target: Joi.number().required(),
      unit: Joi.string().valid("heart rate").required(),
    }).required(),
  }).required(),
  sugar_level: Joi.object({
    progress: Joi.number().required(),
    target: Joi.number().required(),
    unit: Joi.string().valid("mmol/L").required(),
  }).required(),
  steps: Joi.object({
    progress: Joi.number().required(),
    target: Joi.number().required(),
    unit: Joi.string().valid("steps").required(),
  }).required(),
  water_cups: Joi.object({
    progress: Joi.number().required(),
    target: Joi.number().required(),
    unit: Joi.string().valid("cups").required(),
  }).required(),
  // user_id: Joi.string().required(),
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
  user_id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),
  content_id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),
});

export const rewardValidationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  type: Joi.string().valid("digital", "physical"),
  image: Joi.string().uri(),
  voucher_code: Joi.string().required(),
  points: Joi.number().min(1).max(10000000).required(),
  location: Joi.string(),
  status: Joi.string().valid("active", "redeemed"),
});

export const rewardUpdateValidationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  type: Joi.string().valid("digital", "physical"),
  image: Joi.string().uri(),
  points: Joi.number().min(1).max(10000000),
  voucher_code: Joi.string().required(),
  location: Joi.string(),
  status: Joi.string().valid("active", "redeemed"),
});

export const rewardClaimValidationSchema = Joi.object({
  user_id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
  reward_id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
});

export const rewardClaimUpdatedValidationSchema = Joi.object({
  status: Joi.string().valid("Fulfilled"),
  rewardClaimId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
});

export const subscriptionPlanSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow("", null),
  duration_in_months: Joi.number().integer().min(1).required(),
});

export const subscriptionPlanUpdateSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  duration_in_months: Joi.number().integer().min(1),
});
