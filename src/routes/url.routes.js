const express = require("express");

const router = express.Router();

const {
  createUrl,
  getAllUrls,
  getUrlStats,
  updateUrl,
  generateQRCode,
} = require("../controllers/url.controller");
const validate = require("../middlewares/validate.middleware");
const {
  createUrlSchema,
  updateUrlSchema,
} = require("../validators/url.validator");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  createUrlLimiter,
  updateUrlLimiter,
} = require("../middlewares/rateLimit.middleware");

router.post(
  "/",
  authMiddleware,
  createUrlLimiter,
  validate(createUrlSchema),
  createUrl,
);
router.get("/", authMiddleware, getAllUrls);
router.get("/:shortCode/stats", authMiddleware, getUrlStats);
router.patch(
  "/:shortCode",
  authMiddleware,
  updateUrlLimiter,
  validate(updateUrlSchema),
  updateUrl,
);
router.get("/:shortCode/qr", authMiddleware, generateQRCode);

module.exports = router;
