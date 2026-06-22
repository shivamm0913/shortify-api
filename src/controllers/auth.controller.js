const authService = require("../services/auth.service");
const asyncHandler = require("../utils/asyncHandler");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await authService.registerUser(name, email, password);

  return res.status(201).json({
    success: true,
    data: user,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUser(email, password);

  return res.status(200).json({
    success: true,
    data: user,
  });
});

const authMe = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const user = await authService.authMe(userId);

  return res.status(200).json({
    success: true,
    data: user,
  });
});

module.exports = { registerUser, loginUser, authMe };
