const express = require("express");
const { redirectUrl, deleteUrl } = require("../controllers/url.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/:shortCode", redirectUrl);
router.delete("/:shortCode", authMiddleware, deleteUrl);

module.exports = router;
