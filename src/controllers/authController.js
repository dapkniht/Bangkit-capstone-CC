const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const User = require("../models/User");
const Session = require("../models/Session");
const db = require("../config/db");

const authController = {};

authController.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isAdded = await User.findOne({
      where: { email },
    });
    if (isAdded)
      return res.status(409).json({ message: "user has been registered" });

    const id = nanoid(10);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const addUser = await User.create({
      id,
      email,
      password: hash,
      role: "user",
    });
    return res.status(201).json({ message: "Success add user", data: addUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

authController.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const session = await Session.findOne({
      where: db.literal('data->>"$.token.token" = :tokenValue'),
      replacements: { tokenValue: accessToken },
    });

    if (session)
      return res.status(200).json({
        message: "You are already logged in",
        data: { acessToken: session.data.token.token },
      });

    const user = await User.findOne({
      where: { email },
    });
    if (user == null) return res.status(401).json({ message: "Wrong email" });

    const isPasswordMatch = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Wrong password" });
    } else {
      let accessToken;
      if (user.role == "user") {
        const { id, email, role } = user;
        accessToken = jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
          expiresIn: "30d",
        });
        req.session.token = { token: accessToken };
        return res
          .status(200)
          .json({ message: "Success", data: { id, email, accessToken } });
      } else {
        const { id, name, email, role } = user;
        const accessToken = jwt.sign(
          { id, name, email, role },
          process.env.SECRET_KEY,
          {
            expiresIn: "1d",
          }
        );
        req.session.token = { token: accessToken };
        return res
          .status(200)
          .json({ message: "Success", data: { id, name, email, accessToken } });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

authController.logout = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) throw new Error(err.message);
      return res.status(200).json({ message: "Logout successful" });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = authController;
