import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import requestRoutes from "./routes/requestRoutes";
import purchaseRoutes from "./routes/purchaseRoutes";
import poRoutes from "./routes/poRoutes";
import vendorRoutes from "./routes/vendorRoutes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec, setupSwagger } from "./swagger";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/purchases", purchaseRoutes); // changed base path
app.use("/api/po", poRoutes);
app.use("/api/vendor", vendorRoutes);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
setupSwagger(app);

// Start server
app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
  console.log("Swagger docs available on http://localhost:3001/api-docs");
});

export default app;
