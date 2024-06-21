import { Router } from "express";

const router = Router();

router.get("/conversations", (req, res) => {
  res.send("two people are connected");
});

export default router;
