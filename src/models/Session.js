const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Session = db.define(
  "Sessions",
  {
    session_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    expires: {
      type: DataTypes.DATE,
    },
    data: {
      type: DataTypes.TEXT,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "Sessions",
    timestamps: false,
  }
);

module.exports = Session;
