import { Router } from "express";
import Controller from "../controllers/ChatController";
import jwtChecker from "../middlewares/jwtChecker";

const router = Router();

router.get("/:roomId", Controller.getAllChats);
router.post("/send", jwtChecker, Controller.sendChat);
router.post("/read/:id", Controller.readChat);

export default router;
