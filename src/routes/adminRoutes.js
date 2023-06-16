const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const verifyRole = require("../middleware/verifyRole");
const adminController = require("../controllers/adminController");
const validator = require("../middleware/validator");
const multer = require("../middleware/multer");

const adminRoutes = express.Router();

//Get all user
adminRoutes.get(
  "/users",
  verifyToken,
  verifyRole("admin"),
  adminController.getAllUser
);

//Delete user by id
adminRoutes.delete(
  "/delete/:id",
  verifyToken,
  verifyRole("admin"),
  adminController.deleteUserById
);

//Add new admin
adminRoutes.post(
  "/add",
  validator.addAdmin,
  verifyToken,
  verifyRole("admin"),
  adminController.addNewAdmin
);

//Edit admin
adminRoutes.put(
  "/edit",
  validator.editAdmin,
  verifyToken,
  verifyRole("admin"),
  adminController.editAdminData
);

//Add new Fruit
adminRoutes.post(
  "/fruit/add",
  multer.single("image"),
  validator.addFruit,
  verifyToken,
  verifyRole("admin"),
  adminController.addNewFruit
);

//Edit fruit by id
adminRoutes.put(
  "/fruits/edit/:id",
  multer.single("image"),
  verifyToken,
  verifyRole("admin"),
  adminController.editFruitById
);

//Delete fruit by id
adminRoutes.delete(
  "/fruits/delete/:id",
  verifyToken,
  verifyRole("admin"),
  adminController.deleteFruitById
);

module.exports = adminRoutes;
