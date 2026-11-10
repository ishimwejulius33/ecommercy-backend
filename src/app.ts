import cors from "cors";
import express from "express";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.route";

const app = express();

const configuredOrigins = (process.env.FRONTEND_URL ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins: (string | RegExp)[] = [
  "http://localhost:5173",
  ...configuredOrigins,
  /^https:\/\/([a-z0-9-]+\.)*vercel\.app$/i,
  /^https:\/\/([a-z0-9-]+\.)*onrender\.com$/i,
];

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;