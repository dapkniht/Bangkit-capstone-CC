const authDocumentation = {};

authDocumentation.paths = {
  "/auth/register": {
    post: {
      tags: ["Auth"],
      summary: "to create a new account",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  format: "email",
                },
                password: {
                  type: "string",
                  example: "Password123",
                },
              },
              required: ["email", "password"],
            },
          },
        },
      },
      responses: {
        200: {
          message: "Success",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/register",
              },
            },
          },
        },
      },
    },
  },
  "/auth/login": {
    post: {
      tags: ["Auth"],
      summary: "login with email and password to get access token",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  format: "email",
                },
                password: {
                  type: "string",
                  example: "Password123",
                },
              },
              required: ["email", "password"],
            },
          },
        },
      },
      responses: {
        200: {
          message: "Success",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/login",
              },
            },
          },
        },
      },
    },
  },
  "/auth/logout": {
    get: {
      tags: ["Auth"],
      summary: "to end the session",
      responses: {
        200: {
          message: "Success",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/logout",
              },
            },
          },
        },
      },
    },
  },
};

authDocumentation.schemas = {
  register: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Registration successful",
      },
      data: {
        type: "array",
        example: {
          id: "2lnokG3l20",
          email: "JohnDoe@gmail.com",
          password:
            "$2b$10$T4/KpTRX4RwIGxK3blJRluPxiwBzdFxcR7Yyw8moQn3/mPLcnGIsO",
        },
      },
    },
  },
  login: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Success",
      },
      data: {
        type: "array",
        example: [
          {
            id: "dk34SX32ff",
            name: "John Doe",
            email: "user@example.com",
            accessToken:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
          },
        ],
      },
    },
  },
  logout: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Logout successful",
      },
    },
  },
};

module.exports = authDocumentation;
