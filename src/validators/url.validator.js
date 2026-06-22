const { z } = require("zod");

const createUrlSchema = z.object({
  originalUrl: z
    .string({
      required_error: "URL is required",
      invalid_type_error: "URL must be a string",
    })
    .min(1, "URL is require")
    .url("Must be a valid string"),
  //custom Alias
  customAlias: z
    .string()
    .min(3, "Alias must be at least 3 characters")
    .optional(),
  // expiry
  expiresAt: z.string().datetime().optional(),
});

module.exports = {
  createUrlSchema,
};
