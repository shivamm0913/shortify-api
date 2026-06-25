const rateLimit = require("express-rate-limit");

function createRateLimiter(windowMs, max, message) {
  return rateLimit({
    windowMs,
    max,

    standardHeaders: true,
    legacyHeaders: false,
    statusCode: 429,

    message: {
      success: false,
      message,
    },
  });
}
const ONE_MINUTE = 60 * 1000;

const loginLimiter = createRateLimiter(
  ONE_MINUTE,
  5,
  "Too many login attempts. Please try again after a while ",
);
const registerLimiter = createRateLimiter(
  ONE_MINUTE,
  3,
  "Too many registration attempts. Please try again after a while",
);
const createUrlLimiter = createRateLimiter(
  ONE_MINUTE,
  50,
  "Too many URLs created. Please try again later",
);
const updateUrlLimiter = createRateLimiter(
  ONE_MINUTE,
  30,
  "Too many update requests. Please try again later",
);

module.exports = {
  loginLimiter,
  registerLimiter,
  createUrlLimiter,
  updateUrlLimiter,
};
