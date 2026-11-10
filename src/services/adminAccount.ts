import bcrypt from "bcrypt";
import { User } from "../models/user.model";

export async function provisionAdminAccount() {
  const username = process.env.ADMIN_USERNAME?.trim();
  const password = process.env.ADMIN_PASSWORD;

  if (!username && !password) return;
  if (!username || !password) {
    throw new Error("Set both ADMIN_USERNAME and ADMIN_PASSWORD to provision the admin account");
  }

  const email = `${username.toLowerCase()}@admin.local`;
  const hashedPassword = await bcrypt.hash(password, 10);

  await User.findOneAndUpdate(
    { email },
    { $set: { name: username, password: hashedPassword, role: "admin" } },
    { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true }
  );
}