import { Router } from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  sendMessageController,
  getMessageController,
  getUserForSidebar,
} from "../controllers/message.controllers.js";

const router = Router();

router.get("/converstations", protectRoute, getUserForSidebar);
router.get("/:id", protectRoute, getMessageController);
router.post("/send/:id", protectRoute, sendMessageController);

export default router;
