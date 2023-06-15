const { DataTypes } = require("sequelize");
const db = require("../config/db");

const History = db.define(
  "history",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fruit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    predict: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = History;
