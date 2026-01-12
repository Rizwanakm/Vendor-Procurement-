// src/swagger.ts
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Vendor Procurement API",
      version: "1.0.0",
      description: "API documentation for Vendor Procurement project",
    },
    servers: [
      {
        url: "http://localhost:3001", // change for production
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // read docs from routes
};

// Export the swagger spec for use elsewhere
export const swaggerSpec = swaggerJsdoc(options);

// Setup function to register Swagger in Express
export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
