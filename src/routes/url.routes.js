const express = require("express");

const router = express.Router();

const {
  createUrl,
  getAllUrls,
  getUrlStats,
  updateUrl,
} = require("../controllers/url.controller");
const validate = require("../middlewares/validate.middleware");
const {
  createUrlSchema,
  updateUrlSchema,
} = require("../validators/url.validator");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/", authMiddleware, validate(createUrlSchema), createUrl);
router.get("/", authMiddleware, getAllUrls);
router.get("/:shortCode/stats", authMiddleware, getUrlStats);
router.patch(
  "/:shortCode",
  authMiddleware,
  validate(updateUrlSchema),
  updateUrl,
);

module.exports = router;
