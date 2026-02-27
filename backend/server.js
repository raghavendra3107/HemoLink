import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import donorRoutes from "./routes/donorRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import facilityRoutes from "./routes/facilityRoutes.js";
import bloodLabRoutes from "./routes/bloodLabRoutes.js";
import hospitalRoutes from "./routes/hospitalRoutes.js";

import { swaggerUi, swaggerDocs } from "./openapi/index.js";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();

// =======================
// Middleware
// =======================

app.use(express.json());

// ✅ Flexible Production CORS (Recommended)
app.use(
  cors({
    origin: true, // allow all Vercel preview + production domains
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


// =======================
// Swagger
// =======================

app.use("/api/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// =======================
// Routes
// =======================

app.use("/api/auth", authRoutes);
app.use("/api/donor", donorRoutes);
app.use("/api/facility", facilityRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/blood-lab", bloodLabRoutes);
app.use("/api/hospital", hospitalRoutes);

// =======================
// Health Check Route
// =======================

app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

// =======================
// Database
// =======================

connectDB();

// =======================
// Error Handler
// =======================

app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// =======================
// Start Server
// =======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});