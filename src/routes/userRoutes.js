const express = require("express");
const userController = require("../controllers/userController.js");
const multer = require("../middleware/multer");
const verifyToken = require("../middleware/verifyToken");

const userRoutes = express.Router();

//Predict fruit ripeness by image
userRoutes.post(
  "/predict",
  multer.single("image"),
  verifyToken,
  userController.predict
);

//Get all fruits
userRoutes.get("/fruits", verifyToken, userController.getAllFruits);

//Get fruit detail by id
userRoutes.get("/fruits/:id", verifyToken, userController.getFruitById);

//Get predicted fruit history
userRoutes.get("/history", verifyToken, userController.getHistory);

//Delete all History
userRoutes.delete(
  "/history/delete",
  verifyToken,
  userController.deleteAllHistory
);

//Delete History By Id
userRoutes.delete(
  "/history/delete/:id",
  verifyToken,
  userController.deleteHistoryById
);

module.exports = userRoutes;
