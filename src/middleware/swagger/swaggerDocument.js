const userDocumentation = require("./userDocumentation");
const authDocumentation = require("./authDocumentation");
const adminDocumentation = require("./adminDocumentation");

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Ready2Eat API documentation",
    description: "Capstone project Bangkit Academy 2023: C23-PC660 Ready2Eat",
    version: "1.0.0",
  },
  servers: [{ url: "https://ready2eat-backend-kkszfyhisa-et.a.run.app" }],
  tags: [
    {
      name: "User",
      description:
        "to obtain information about the fruit and predict the ripeness level of the fruit",
    },
    {
      name: "Auth",
      description: "to perform authentication",
    },
    {
      name: "Admin",
      description:
        "only admins can access this endpoint (Required access token)",
    },
  ],
  paths: {
    ...userDocumentation.paths,
    ...authDocumentation.paths,
    ...adminDocumentation.paths,
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      ...userDocumentation.schemas,
      ...authDocumentation.schemas,
      ...adminDocumentation.schemas,
    },
  },
};

module.exports = swaggerDocument;
