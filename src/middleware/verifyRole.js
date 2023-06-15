const jwt = require("jsonwebtoken");

const verifyRole = (userRole) => {
  return (req, res, next) => {
    try {
      const { role } = jwt.decode(req.session.token.token);
      if (role != userRole) throw new Error("unauthorized");
      next();
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  };
};

module.exports = verifyRole;
