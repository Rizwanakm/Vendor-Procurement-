import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const SERVER_URL = process.env.SERVER_URL || "http://localhost:3001";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Vendor Procurement API",
      version: "1.0.0",
      description: "API documentation for Vendor Procurement project",
    },
    servers: [
      { url: SERVER_URL },
    ],
  },
  apis: ["./src/routes/*.ts"], // Swagger reads from your routes
};

// Export the swagger spec for manual use if needed
export const swaggerSpec = swaggerJsdoc(options);

// Setup Swagger in Express
export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
