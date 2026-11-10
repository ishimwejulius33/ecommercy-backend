import { Router } from "express";
import { register, login, profile, forgotPassword, resetPassword, getUsers } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticate, profile);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/users", authenticate, authorize("admin"), getUsers);

export default router;
