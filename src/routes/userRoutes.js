const express = require("express");
const userController = require("../controllers/userController.js");
const multer = require("../middleware/multer");

const userRoutes = express.Router();

//Predict fruit ripeness by image
userRoutes.post("/predict", multer.single("image"), userController.predict);

//Get all fruits
userRoutes.get("/fruits", userController.getAllFruits);

//Get fruit detail by id
userRoutes.get("/fruits/:id", userController.getFruitById);

module.exports = userRoutes;
