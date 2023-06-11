const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Fruit = db.define(
  "fruits",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    scientific_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    portion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    calories: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fat: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    colestrol: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sodium: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    potassium: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    carbohydrates: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sugar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vitamin_c: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    iron: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    calcium: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    magnesium: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vitamin_b6: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vitamin_d: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vitamin_b12: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Fruit;
