const express = require("express");
const urlRoutes = require("./src/routes/url.routes");
const authRoutes = require("./src/routes/auth.routes");
const redirectRoutes = require("./src/routes/redirect.routes");
const errorHandler = require("./src/middlewares/error.middleware");

const app = express();

app.use(express.json());

app.use("/urls", urlRoutes);
app.use("/auth", authRoutes);
app.use("/", redirectRoutes);

app.use(errorHandler);

module.exports = app;
