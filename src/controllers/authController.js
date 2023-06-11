const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");
const Session = require("../models/Session");

const authController = {};

authController.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const session = await Session.findByPk(req.sessionID);
    if (session)
      return res.status(200).json({
        message: "You are already logged in",
        data: { acessToken: req.session.token.token },
      });

    const admin = await Admin.findOne({
      where: { email },
    });
    if (admin == null) return res.status(401).json({ message: "Wrong email" });

    const isPasswordMatch = bcrypt.compareSync(password, admin.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Wrong password" });
    } else {
      const { id, name, email } = admin;
      const accessToken = jwt.sign(
        { id, name, email },
        process.env.SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );
      req.session.token = { token: accessToken };
      console.log(req.session.token);
      return res
        .status(200)
        .json({ message: "Success", data: { id, name, email, accessToken } });
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
