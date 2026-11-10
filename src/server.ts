import "dotenv/config";
import app from "./app";
import { connectDB } from "./config/db";
import { provisionAdminAccount } from "./services/adminAccount";

const PORT = Number(process.env.PORT) || 7000;

connectDB().then(async () => {
  await provisionAdminAccount();
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
