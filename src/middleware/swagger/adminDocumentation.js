const adminDocumentation = {};

adminDocumentation.paths = {
  "/admin/admins": {
    get: {
      tags: ["Admin"],
      summary: "Get all users",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          message: "Success",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/admins",
              },
            },
          },
        },
      },
    },
  },
  "/admin/add": {
    post: {
      tags: ["Admin"],
      summary: "Add new admin",
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  example: "John doe",
                },
                email: {
                  type: "string",
                  format: "email",
                },
                password: {
                  type: "string",
                  example: "Password123",
                },
              },
              required: ["name", "email", "password"],
            },
          },
        },
      },
      responses: {
        201: {
          message: "Success",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/addAdmin",
              },
            },
          },
        },
      },
    },
  },
  "/admin/edit": {
    put: {
      tags: ["Admin"],
      summary: "Edit admin data",
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        required: false,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  example: "John smith",
                },
                email: {
                  type: "string",
                  format: "email",
                  example: "john1@gmail.com",
                },
                password: {
                  type: "string",
                  example: "Password12!",
                },
              },
              required: ["name", "email", "password"],
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
                $ref: "#/components/schemas/editAdmin",
              },
            },
          },
        },
      },
    },
  },
  "/admin/delete/{id}": {
    delete: {
      tags: ["Admin"],
      summary: "Delete user by id",
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "id of the user who wants to be deleted",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          message: "Success",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/deleteAdmin",
              },
            },
          },
        },
      },
    },
  },
  "/admin/fruit/add": {
    post: {
      tags: ["Admin"],
      summary: "Add new fruit data",
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  example: "Orange",
                },
                scientific_name: {
                  type: "string",
                  example: "Citrus",
                },
                description: {
                  type: "string",
                  example:
                    "An orange is a fruit of various citrus species in the family Rutaceae",
                },
                image: {
                  type: "string",
                  format: "binary",
                  description: "File gambar yang ingin diunggah",
                },
                portion: {
                  type: "string",
                  example: "100 g",
                },
                calories: {
                  type: "string",
                  example: "47",
                },
                fat: {
                  type: "string",
                  example: "0,1 g",
                },
                colestrol: {
                  type: "string",
                  example: "0 mg",
                },
                sodium: {
                  type: "string",
                  example: "0 mg",
                },
                potassium: {
                  type: "string",
                  example: "181 mg",
                },
                carbohydrates: {
                  type: "string",
                  example: "12 g",
                },
                sugar: {
                  type: "string",
                  example: "9 g",
                },
                vitamin_c: {
                  type: "string",
                  example: "53,2 mg",
                },
                iron: {
                  type: "string",
                  example: "0,1 mg",
                },
                calcium: {
                  type: "string",
                  example: "40 mg",
                },
                magnesium: {
                  type: "string",
                  example: "10 mg",
                },
                vitamin_b6: {
                  type: "string",
                  example: "0,1 mg",
                },
                vitamin_d: {
                  type: "string",
                  example: "0 IU",
                },
                vitamin_b12: {
                  type: "string",
                  example: "0 µg",
                },
              },
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
                $ref: "#/components/schemas/addFruit",
              },
            },
          },
        },
      },
    },
  },
  "/admin/fruits/edit/{id}": {
    put: {
      tags: ["Admin"],
      summary: "Edit fruit data by id",
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "Id of the fruit whose data you want to change",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                scientific_name: {
                  type: "string",
                },
                description: {
                  type: "string",
                },
                image: {
                  type: "string",
                  format: "binary",
                  description: "File gambar yang ingin diunggah",
                },
                portion: {
                  type: "string",
                },
                calories: {
                  type: "string",
                },
                fat: {
                  type: "string",
                },
                colestrol: {
                  type: "string",
                },
                sodium: {
                  type: "string",
                },
                potassium: {
                  type: "string",
                },
                carbohydrates: {
                  type: "string",
                },
                sugar: {
                  type: "string",
                },
                vitamin_c: {
                  type: "string",
                },
                iron: {
                  type: "string",
                },
                calcium: {
                  type: "string",
                },
                magnesium: {
                  type: "string",
                },
                vitamin_b6: {
                  type: "string",
                },
                vitamin_d: {
                  type: "string",
                },
                vitamin_b12: {
                  type: "string",
                },
              },
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
                $ref: "#/components/schemas/editFruit",
              },
            },
          },
        },
      },
    },
  },
  "/admin/fruits/delete/{id}": {
    delete: {
      tags: ["Admin"],
      summary: "Delete fruits by id",
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "Id of the fruit that you want to delete",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          message: "Success",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/deleteFruit",
              },
            },
          },
        },
      },
    },
  },
};

adminDocumentation.schemas = {
  admins: {
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
            password:
              "$2b$10$KLIMz8s/0wgqOaIDs9M2d.dz2GWuaUJpm3mLWc4lKMQC6fiinGMxq",
          },
        ],
      },
    },
  },
  addAdmin: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Success add admin",
      },

      data: {
        type: "array",
        example: [
          {
            id: "dk34SX32ff",
            name: "John Doe",
            email: "user@example.com",
            password:
              "$2b$10$KLIMz8s/0wgqOaIDs9M2d.dz2GWuaUJpm3mLWc4lKMQC6fiinGMxq",
          },
        ],
      },
    },
  },
  editAdmin: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Success edit admin data",
      },

      data: {
        type: "array",
        example: [
          {
            id: "dk34SX32ff",
            name: "John Doe",
            email: "user@example.com",
            password:
              "$2b$10$KLIMz8s/0wgqOaIDs9M2d.dz2GWuaUJpm3mLWc4lKMQC6fiinGMxq",
          },
        ],
      },
    },
  },
  deleteAdmin: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Success delete user",
      },

      data: {
        type: "array",
        example: [
          {
            id: "dk34SX32ff",
            name: "John Doe",
            email: "user@example.com",
            password:
              "$2b$10$KLIMz8s/0wgqOaIDs9M2d.dz2GWuaUJpm3mLWc4lKMQC6fiinGMxq",
          },
        ],
      },
    },
  },
  addFruit: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Success add fruit data",
      },

      data: {
        type: "array",
        example: [
          {
            id: "JHWnGqrApF",
            carbohydrates: "12 g",
            scientific_name: "Citrus",
            vitamin_b6: "0,1 mg",
            calories: "47",
            portion: "100 g",
            iron: "0,1 mg",
            colestrol: "0 mg",
            name: "Orange",
            calcium: "40 mg",
            potassium: "181 mg",
            sugar: "9 g",
            vitamin_c: "53,2 mg",
            vitamin_b12: "0 µg",
            vitamin_d: "0 IU",
            magnesium: "10 mg",
            sodium: "0 mg",
            fat: "0,1 g",
            description:
              "An orange is a fruit of various citrus species in the family Rutaceae",
            image:
              "https://storage.googleapis.com/test12233/1685953168279-482945475-DrAxeOrangeNutrition_Thumbnail.jpg",
          },
        ],
      },
    },
  },
  editFruit: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Success edit fruit data",
      },

      data: {
        type: "array",
        example: [
          {
            id: "JHWnGqrApF",
            carbohydrates: "12 g",
            scientific_name: "Citrus",
            vitamin_b6: "0,1 mg",
            calories: "47",
            portion: "100 g",
            iron: "0,1 mg",
            colestrol: "0 mg",
            name: "Orange",
            calcium: "40 mg",
            potassium: "181 mg",
            sugar: "9 g",
            vitamin_c: "53,2 mg",
            vitamin_b12: "0 µg",
            vitamin_d: "0 IU",
            magnesium: "10 mg",
            sodium: "0 mg",
            fat: "0,1 g",
            description:
              "An orange is a fruit of various citrus species in the family Rutaceae",
            image:
              "https://storage.googleapis.com/test12233/1685953168279-482945475-DrAxeOrangeNutrition_Thumbnail.jpg",
          },
        ],
      },
    },
  },
  deleteFruit: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Success delete fruit",
      },

      data: {
        type: "array",
        example: [
          {
            id: "JHWnGqrApF",
            carbohydrates: "12 g",
            scientific_name: "Citrus",
            vitamin_b6: "0,1 mg",
            calories: "47",
            portion: "100 g",
            iron: "0,1 mg",
            colestrol: "0 mg",
            name: "Orange",
            calcium: "40 mg",
            potassium: "181 mg",
            sugar: "9 g",
            vitamin_c: "53,2 mg",
            vitamin_b12: "0 µg",
            vitamin_d: "0 IU",
            magnesium: "10 mg",
            sodium: "0 mg",
            fat: "0,1 g",
            description:
              "An orange is a fruit of various citrus species in the family Rutaceae",
            image:
              "https://storage.googleapis.com/test12233/1685953168279-482945475-DrAxeOrangeNutrition_Thumbnail.jpg",
          },
        ],
      },
    },
  },
};

module.exports = adminDocumentation;
