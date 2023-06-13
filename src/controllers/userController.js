const Fruit = require("../models/Fruit");
const fs = require("fs");
const { Op } = require("sequelize");
const imageToBucket = require("../modules/imageToBucket");

const userController = {};

userController.predict = async (req, res) => {
  try {
    const upload = await imageToBucket(req.file.filename, "ready2eat-predict-bucket");
    console.log(upload);
    res.send("under development");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

userController.getAllFruits = async (req, res) => {
  const { name } = req.query;
  try {
    const fruits = await Fruit.findAll({
      attributes: ["id", "name", "image"],
      where: {
        name: {
          [Op.like]: name ? `%${name}%` : "%%",
        },
      },
    });
    return res.status(200).json({ message: "Success", data: fruits });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

userController.getFruitById = async (req, res) => {
  const { id } = req.params;
  const fruit = await Fruit.findByPk(id);
  try {
    if (fruit == null)
      return res.status(404).json({ message: "Fruit id not found" });
    return res.status(200).json({ message: "Success", data: { ...fruit.dataValues } });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = userController;
