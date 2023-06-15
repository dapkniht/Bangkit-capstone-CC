const jwt = require("jsonwebtoken");
const Session = require("../models/Session");

const verifyToken = async (req, res, next) => {
  const token = await Session.findByPk(req.sessionID);
  console.log(req.session.cookie);

  if (token == null)
    return res.status(401).json({ message: "You must be logged in" });

  console.log(req.headers["authorization"]);
  if (!req.headers["authorization"]) {
    return res.status(404).json({ message: "Access token not found" });
  }
  const accessToken = req.headers["authorization"].split(" ")[1];

  if (accessToken != req.session.token.token)
    return res.status(401).json({ message: "Invalid access token" });

  try {
    jwt.verify(accessToken, process.env.SECRET_KEY);
    req.token = accessToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = verifyToken;
