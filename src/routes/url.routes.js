const express = require("express");

const router = express.Router();

const {
  createUrl,
  getAllUrls,
  getUrlStats,
} = require("../controllers/url.controller");
const validate = require("../middlewares/validate.middleware");
const { createUrlSchema } = require("../validators/url.validator");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/", authMiddleware, validate(createUrlSchema), createUrl);
router.get("/", authMiddleware, getAllUrls);
router.get("/:shortCode/stats", authMiddleware, getUrlStats);

module.exports = router;
