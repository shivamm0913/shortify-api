const express = require("express");
const { redirectUrl } = require("../controllers/url.controller");

const router = express.Router();

/**
 * @swagger
 * /{shortCode}:
 *   get:
 *     summary: Redirect to original URL
 *     description: Redirects the user to the original URL using the short code.
 *     tags:
 *       - Redirect
 *     security: []
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       302:
 *         description: Redirects to the original URL.
 *       404:
 *         description: URL not found.
 *       410:
 *         description: URL has expired.
 */
router.get("/:shortCode", redirectUrl);

module.exports = router;
