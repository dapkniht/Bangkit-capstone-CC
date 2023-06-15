const express = require("express");
const authController = require("../controllers/authController");
const validator = require("../middleware/validator");

const authRoutes = express.Router();

//Login to get access token
authRoutes.post("/register", validator.register, authController.register);
authRoutes.post("/login", validator.login, authController.login);
authRoutes.get("/logout", authController.logout);

module.exports = authRoutes;
