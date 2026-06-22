const urlService = require("../services/url.service");
const asyncHandler = require("../utils/asyncHandler");

// async function createUrl(req, res) {
//   try {
//     const { originalUrl } = req.body;
//     const result = await urlService.createShortUrl(originalUrl);

//     return res.status(201).json(result);
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({
//       message: "Internal  Server Error",
//     });
//   }
// }

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

// async function getAllUrls(req, res) {
//   try {
//     const result = await urlService.getUrls();

//     return res.status(200).json(result);
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({
//       message: "Internal  Server Error",
//     });
//   }
// }

const getAllUrls = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const result = await urlService.getUrls(userId);

  return res.status(200).json(result);
});

// async function redirectUrl(req, res) {
//   try {
//     const { shortCode } = req.params;
//     const url = await urlService.getUrlByShortCode(shortCode);
//     if (!url) {
//       return res.status(404).json({
//         message: "Url Not Found",
//       });
//     }

//     await urlService.incrementClickCount(shortCode);
//     return res.redirect(url.originalUrl);
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({
//       message: "Internal Server Error",
//     });
//   }
// }

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

// async function deleteUrl(req, res) {
//   const { shortCode } = req.params;
//   await urlService.deleteUrl(shortCode);

//   return res.status(204).json({
//     message: "Url deleted Succesfully",
//   });
// }

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

module.exports = {
  createUrl,
  getAllUrls,
  redirectUrl,
  getUrlStats,
  deleteUrl,
};
