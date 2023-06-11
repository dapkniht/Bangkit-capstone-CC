const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const adminController = require("../controllers/adminController");
const validator = require("../middleware/validator");
const multer = require("../middleware/multer");

const adminRoutes = express.Router();

//Get all admin
adminRoutes.get("/admins", verifyToken, adminController.getAllAdmin);

//Delete admin by id
adminRoutes.delete("/delete/:id", verifyToken, adminController.deleteAdminById);

//Add new admin
adminRoutes.post(
  "/add",
  validator.addAdmin,
  verifyToken,
  adminController.addNewAdmin
);

//Edit admin
adminRoutes.put(
  "/edit",
  validator.editAdmin,
  verifyToken,
  adminController.editAdminData
);

//Add new Fruit
adminRoutes.post(
  "/fruit/add",
  multer.single("image"),
  validator.addFruit,
  verifyToken,
  adminController.addNewFruit
);

//Edit fruit by id
adminRoutes.put(
  "/fruits/edit/:id",
  multer.single("image"),
  verifyToken,
  adminController.editFruitById
);

//Delete fruit by id
adminRoutes.delete(
  "/fruits/delete/:id",
  verifyToken,
  adminController.deleteFruitById
);

module.exports = adminRoutes;
