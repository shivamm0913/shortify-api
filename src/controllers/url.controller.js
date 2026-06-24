const urlService = require("../services/url.service");
const asyncHandler = require("../utils/asyncHandler");

const createUrl = asyncHandler(async (req, res) => {
  const { originalUrl, customAlias, expiresAt } = req.body;
  const userId = req.user.userId;
  const result = await urlService.createShortUrl(
    originalUrl,
    customAlias,
    expiresAt,
    userId,
  );

  return res.status(201).json(result);
});

const getAllUrls = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const { page = 1, limit = 10 } = req.query;
  const result = await urlService.getUrls(userId, Number(page), Number(limit));

  return res.status(200).json(result);
});

const redirectUrl = asyncHandler(async (req, res) => {
  const { shortCode } = req.params;

  const url = await urlService.getUrlByShortCode(shortCode);

  if (!url) {
    return res.status(404).json({
      message: "Url Not Found",
    });
  }

  await urlService.incrementClickCount(shortCode);

  return res.redirect(url.originalUrl);
});

const deleteUrl = asyncHandler(async (req, res) => {
  const { shortCode } = req.params;
  const userId = req.user.userId;

  await urlService.deleteUrl(shortCode, userId);

  return res.sendStatus(204);
});

const getUrlStats = asyncHandler(async (req, res) => {
  const { shortCode } = req.params;
  const userId = req.user.userId;
  const result = await urlService.getUrlStats(shortCode, userId);
  if (!result) {
    return res.status(404).json({
      message: "Url Not Found",
    });
  }

  return res.status(200).json(result);
});

const updateUrl = asyncHandler(async (req, res) => {
  const { shortCode } = req.params;
  const userId = req.user.userId;

  const result = await urlService.updateUrl(shortCode, userId, req.body);

  return res.status(200).json(result);
});

module.exports = {
  createUrl,
  getAllUrls,
  redirectUrl,
  getUrlStats,
  deleteUrl,
  updateUrl,
};
