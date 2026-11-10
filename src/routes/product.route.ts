import { Router } from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productcontrollers";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";

const router = Router();
router.get("/", getAllProducts);

router.post("/",authenticate,authorize("admin"),createProduct);
router.put("/:id",authenticate,authorize("admin"),updateProduct);
router.delete("/:id", authenticate, authorize("admin"), deleteProduct);

export default router;