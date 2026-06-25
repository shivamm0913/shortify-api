const express = require("express");
const validate = require("../middlewares/validate.middleware");
const { registerSchema, loginSchema } = require("../validators/auth.validator");
const {
  registerUser,
  loginUser,
  authMe,
} = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  registerLimiter,
  loginLimiter,
} = require("../middlewares/rateLimit.middleware");

const router = express.Router();

router.post(
  "/register",
  registerLimiter,
  validate(registerSchema),
  registerUser,
);
router.post("/login", loginLimiter, validate(loginSchema), loginUser);
router.get("/me", authMiddleware, authMe);
module.exports = router;
