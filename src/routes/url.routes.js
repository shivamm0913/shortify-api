const express = require("express");

const router = express.Router();

const {
  createUrl,
  getAllUrls,
  getUrlStats,
  updateUrl,
  generateQRCode,
  deleteUrl,
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

/**
 * @swagger
 * /urls:
 *   post:
 *     summary: Create a short URL
 *     description: Creates a new shortened URL.
 *     tags:
 *       - URLs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUrlRequest'
 *     responses:
 *       201:
 *         description: URL created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Url'
 *       400:
 *         description: Invalid request.
 *       409:
 *         description: Alias already exists.
 */

router.post(
  "/",
  authMiddleware,
  createUrlLimiter,
  validate(createUrlSchema),
  createUrl,
);

/**
 * @swagger
 * /urls:
 *   get:
 *     summary: Get all URLs
 *     description: Returns paginated URLs belonging to the authenticated user.
 *     tags:
 *       - URLs
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: URLs fetched successfully.
 */

router.get("/", authMiddleware, getAllUrls);

/**
 * @swagger
 * /urls/{shortCode}/stats:
 *   get:
 *     summary: Get URL statistics
 *     description: Returns analytics for a shortened URL.
 *     tags:
 *       - URLs
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UrlStats'
 *       404:
 *         description: URL not found.
 */
router.get("/:shortCode/stats", authMiddleware, getUrlStats);

/**
 * @swagger
 * /urls/{shortCode}:
 *   patch:
 *     summary: Update a URL
 *     description: Updates an existing short URL.
 *     tags:
 *       - URLs
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUrlRequest'
 *     responses:
 *       200:
 *         description: URL updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Url'
 *       404:
 *         description: URL not found.
 */
router.patch(
  "/:shortCode",
  authMiddleware,
  updateUrlLimiter,
  validate(updateUrlSchema),
  updateUrl,
);

/**
 * @swagger
 * /urls/{shortCode}/qr:
 *   get:
 *     summary: Generate QR Code
 *     description: Returns a QR code image for the shortened URL.
 *     tags:
 *       - URLs
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: QR code image.
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: URL not found.
 */
router.get("/:shortCode/qr", authMiddleware, generateQRCode);

/**
 * @swagger
 * /urls/{shortCode}:
 *   delete:
 *     summary: Delete a URL
 *     description: Deletes a shortened URL.
 *     tags:
 *       - URLs
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: URL deleted successfully.
 *       404:
 *         description: URL not found.
 */
router.delete("/:shortCode", authMiddleware, deleteUrl);

module.exports = router;
