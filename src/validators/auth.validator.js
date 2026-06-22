const { z } = require("zod");

const registerSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),

  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, "Password must be at least 8 characters"),
});

const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(1, "Password is required"),
});

module.exports = {
  registerSchema,
  loginSchema,
};
