const userDocumentation = {};

userDocumentation.paths = {
  "/user/fruits": {
    get: {
      tags: ["User"],
      summary: "get all fruits",
      parameters: [
        {
          name: "name",
          in: "query",
          description: "filter all fruits by name",
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
                $ref: "#/components/schemas/fruits",
              },
            },
          },
        },
      },
    },
  },
  "/user/fruits/{id}": {
    get: {
      tags: ["User"],
      summary: "get fruits detail by id",
      parameters: [
        {
          name: "id",
          in: "path",
          required: "true",
          description: "id of the fruits",
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
                $ref: "#/components/schemas/fruitsdetail",
              },
            },
          },
        },
      },
    },
  },
  "/user/predict": {
    post: {
      tags: ["User"],
      summary: "prediction of fruit ripeness from images (Under Development)",
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                image: {
                  type: "string",
                  format: "binary",
                  description: "File gambar yang ingin diunggah",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          message: "Success",
        },
      },
    },
  },
};

userDocumentation.schemas = {
  fruits: {
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
            id: "kSew3X",
            name: "Apple",
            image: "http://www.google.com/ldkksREAoa32ed",
            description: "Apple is a fruit",
          },
        ],
      },
    },
  },
  fruitsdetail: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Success",
      },
      data: {
        type: "object",
        example: {
          fruit: {
            id: "425PEj4PIY",
            scientific_name: "Malus domestica",
            name: "Apple",
            description: "Apple is a fruit",
            image: "www.google.com/djksanfiuefdsafaafrag",
            portion: "100g",
            calories: "52",
            fat: "0,2 g",
            colestrol: "0 mg",
            sodium: "1 mg",
            potassium: "107 mg",
            carbohydrates: "14 g",
            sugar: "10 g",
            vitamin_c: "4,6 mg",
            iron: "0,1 mg",
            calcium: "6 mg",
            magnesium: "5 mg",
            vitamin_b6: "0 mg",
            vitamin_d: "0 IU",
            vitamin_b12: "0 µg",
          },
        },
      },
    },
  },
};

module.exports = userDocumentation;
