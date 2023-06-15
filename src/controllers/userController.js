const Fruit = require("../models/Fruit");
const History = require("../models/History");
const fs = require("fs");
const { Op } = require("sequelize");
const imageToBucket = require("../modules/imageToBucket");
const axios = require("axios");
const { nanoid } = require("nanoid");
const jwt = require("jsonwebtoken");

const userController = {};

userController.predict = async (req, res) => {
  if (req.file === undefined || !req.file.isimage)
    return res.status(400).json({
      message: "Only accept image file types with png, jpg, or jpeg types",
    });
  try {
    const image_url = await imageToBucket(
      req.file.filename,
      "ready2eat-predict-bucket"
    );
    const response = await axios.post(
      "https://ml-service-kkszfyhisa-et.a.run.app/predict",
      {
        url: image_url,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.error) throw new Error(response.data.error);

    const id = nanoid(10);
    const user = jwt.decode(req.token);
    await History.create({
      id: id,
      user_id: user.id,
      fruit: response.data.fruit,
      predict: response.data.predict,
      image: image_url,
    });

    res.status(200).json({ message: "Success", data: response.data });
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
    return res
      .status(200)
      .json({ message: "Success", data: { ...fruit.dataValues } });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

userController.getHistory = async (req, res) => {
  const { id } = jwt.decode(req.token);
  try {
    const history = await History.findAll({
      where: { user_id: id },
    });
    return res.status(200).json({ message: "Success", data: history });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

userController.deleteAllHistory = async (req, res) => {
  const { id } = jwt.decode(req.token);
  try {
    const history = await History.findAll({
      where: { user_id: id },
    });

    await History.destroy({
      where: {
        user_id: id,
      },
    });
    return res
      .status(200)
      .json({ message: "Success delete all history", data: history });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

userController.deleteHistoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const history = await History.findByPk(id);

    const deleteHistory = await History.destroy({
      where: {
        id,
      },
    });
    if (deleteHistory == 0)
      return res.status(404).json({ message: "History id not found" });
    return res
      .status(200)
      .json({ message: "Success delete history", data: history });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = userController;
