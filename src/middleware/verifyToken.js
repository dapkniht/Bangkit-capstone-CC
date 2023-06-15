const jwt = require("jsonwebtoken");
const Session = require("../models/Session");
const db = require("../config/db");

const verifyToken = async (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res.status(404).json({ message: "Access token not found" });
  }
  const accessToken = req.headers["authorization"].split(" ")[1];

  const token = await Session.findOne({
    where: db.literal('data->>"$.token.token" = :tokenValue'),
    replacements: { tokenValue: accessToken },
  });

  if (!token) return res.status(401).json({ message: "You must be logged in" });

  try {
    jwt.verify(accessToken, process.env.SECRET_KEY);
    req.token = accessToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = verifyToken;
