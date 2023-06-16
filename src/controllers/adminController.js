const fs = require("fs");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Fruit = require("../models/Fruit");
const { uploadImage } = require("../modules/cloudStorage");

const adminController = {};

//get all user data
adminController.getAllUser = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json({ message: "Success", data: users });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//add new admin
adminController.addNewAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const isAdded = await User.findOne({
      where: { email },
    });
    if (isAdded)
      return res.status(409).json({ message: "email has been registered" });

    const id = nanoid(10);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const addAdmin = await User.create({
      id,
      name,
      email,
      password: hash,
      role: "admin",
    });
    return res
      .status(201)
      .json({ message: "Success add admin", data: addAdmin });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//delete user by id
adminController.deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);

    const deleteUser = await User.destroy({
      where: {
        id,
      },
    });
    if (deleteUser == 0)
      return res.status(404).json({ message: "User id not found" });
    return res.status(200).json({ message: "Success delete user", data: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//edit admin by id
adminController.editAdminData = async (req, res) => {
  try {
    const { id } = jwt.decode(req.token);
    console.log(id);
    const admin = await User.findByPk(id);
    if (req.body.password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hash;
    }

    const {
      name = User.name,
      email = User.email,
      password = User.password,
    } = req.body;

    const editAdmin = await User.update(
      { name, email, password },
      {
        where: {
          id,
        },
      }
    );
    return res.status(200).json({
      message: "Succes edit admin data",
      data: { name, email, password },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Add new fruit
adminController.addNewFruit = async (req, res) => {
  if (req.file === undefined || !req.file.isimage)
    return res.status(400).json({
      message: "Only accept image file types with png, jpg, or jpeg types",
    });
  try {
    const isAdded = await Fruit.findOne({
      where: { name: req.body.name },
    });
    if (isAdded)
      return res
        .status(409)
        .json({ message: "fruit data has been added to the database" });

    const id = nanoid(10);
    const imageUrl = await uploadImage(req.file.filename, "ready2eat-bucket");
    if (imageUrl instanceof Error) throw new Error(imageUrl.message);
    const addFruit = await Fruit.create({ id, ...req.body, image: imageUrl });
    fs.unlinkSync(req.file.path);
    return res.status(200).json({
      message: "Success add fruit data",
      data: addFruit,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Edit fruit by id
adminController.editFruitById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!req.file || req.file) {
      const fruit = await Fruit.findByPk(id);
      if (fruit == null)
        return res.status(404).json({ message: "Fruit id not found" });

      for (let key in req.body) {
        if (req.body[key] == "") req.body[key] = fruit[key];
      }

      let imageUrl = "";
      if (!req.file) {
        imageUrl = fruit.image;
      } else {
        imageUrl = await imageToBucket(req.file.filename, "test12233");
        if (imageUrl instanceof Error) throw new Error(imageUrl.message);
      }

      const editFruit = await Fruit.update(
        { ...req.body, image: imageUrl },
        {
          where: {
            id,
          },
        }
      );
      return res.status(200).json({
        message: "Success edit fruit data",
        data: { ...req.body, image: imageUrl },
      });
    } else {
      throw new Error("Only accepts image file types");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Delete fruit By id
adminController.deleteFruitById = async (req, res) => {
  const { id } = req.params;
  try {
    const fruit = await Fruit.findByPk(id);

    const deleteFruit = await Fruit.destroy({
      where: {
        id,
      },
    });
    if (deleteFruit == 0)
      return res.status(404).json({ message: "Fruit id not found" });
    return res
      .status(200)
      .json({ message: "Success delete fruit", data: fruit });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = adminController;
