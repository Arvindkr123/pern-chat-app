import { Router } from "express";
import {
  userLoginController,
  userLogoutController,
  userSignUpController,
  getCurrentUserController,
} from "../controllers/auth.controllers.js";
import protectRoute from "../middleware/protectRoute.js";

const router = Router();

router.get("/me", protectRoute, getCurrentUserController);
router.post("/signup", userSignUpController);
router.post("/login", userLoginController);
router.get("/logout", userLogoutController);

export default router;
