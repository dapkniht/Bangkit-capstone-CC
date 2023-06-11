const express = require("express");
const session = require("express-session");
const SequelizeStore = require("express-session-sequelize")(session.Store);
const db = require("./config/db");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./middleware/swagger/swaggerDocument.js");

console.log(process.env)

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const sessionStore = new SequelizeStore({
  db: db,
  table: "session",
  checkExpirationInterval: 15 * 60 * 1000,
  expiration: 24 * 60 * 60 * 1000,
});

server.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

server.use("/user", userRoutes);
server.use("/auth", authRoutes);
server.use("/admin", adminRoutes);
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

server.get("/", (req, res) => {
  console.log(process.env.DB_HOST)
  res.redirect("/api-docs");
});

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`berjalan pada port ${port}`);
});
