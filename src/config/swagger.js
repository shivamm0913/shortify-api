const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Shortify API",
      version: "1.0.0",
      description:
        "A production-ready URL shortening API built with Express, Prisma and PostgreSQL.",
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:3000",
        description: "Development Server",
      },
    ],
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      {
        name: "Authentication",
        description: "Authentication and user management",
      },
      {
        name: "URLs",
        description: "Short URL management and analytics",
      },
      {
        name: "Redirect",
        description: "Public URL redirection",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            name: {
              type: "string",
              example: "Shivam",
            },
            email: {
              type: "string",
              format: "email",
              example: "shivam@example.com",
            },
          },
          required: ["id", "name", "email"],
        },
        RegisterRequest: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "Shivam",
            },
            email: {
              type: "string",
              format: "email",
              example: "shivam@example.com",
            },
            password: {
              type: "string",
              example: "password123",
            },
          },
          required: ["name", "email", "password"],
        },

        LoginRequest: {
          type: "object",
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "shivam@example.com",
            },
            password: {
              type: "string",
              example: "password123",
            },
          },
          required: ["email", "password"],
        },

        AuthResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            data: {
              type: "object",
              properties: {
                user: {
                  $ref: "#/components/schemas/User",
                },
                token: {
                  type: "string",
                  example:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjF9.signature",
                },
              },
              required: ["user", "token"],
            },
          },
        },

        CreateUrlRequest: {
          type: "object",
          properties: {
            originalUrl: {
              type: "string",
              format: "uri",
              example: "https://google.com",
            },
            customAlias: {
              type: "string",
              example: "google",
            },
            expiresAt: {
              type: "string",
              format: "date-time",
              example: "2027-01-01T00:00:00.000Z",
            },
          },
          required: ["originalUrl"],
        },
        UpdateUrlRequest: {
          type: "object",
          properties: {
            originalUrl: {
              type: "string",
              format: "uri",
              example: "https://github.com",
            },
            customAlias: {
              type: "string",
              example: "github",
            },
            expiresAt: {
              type: "string",
              format: "date-time",
              example: "2027-01-01T00:00:00.000Z",
            },
          },
        },

        Url: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            originalUrl: {
              type: "string",
              format: "uri",
              example: "https://google.com",
            },
            shortCode: {
              type: "string",
              example: "google",
            },
            clickCount: {
              type: "integer",
              example: 15,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            expiresAt: {
              type: "string",
              format: "date-time",
              nullable: true,
            },
          },
          required: [
            "id",
            "originalUrl",
            "shortCode",
            "clickCount",
            "createdAt",
          ],
        },

        Pagination: {
          type: "object",
          properties: {
            page: {
              type: "integer",
              example: 1,
            },
            limit: {
              type: "integer",
              example: 10,
            },
            total: {
              type: "integer",
              example: 57,
            },
            totalPages: {
              type: "integer",
              example: 6,
            },
          },
        },

        RecentVisit: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 12,
            },
            visitedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        UrlStats: {
          allOf: [
            {
              $ref: "#/components/schemas/Url",
            },
            {
              type: "object",
              properties: {
                recentVisits: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/RecentVisit",
                  },
                },
              },
            },
          ],
        },

        ErrorResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              example: "Invalid credentials",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
