import { Router } from "express";
import Controller from "../controllers/ChatController";

const router = Router();

router.post("/", Controller.getAllChats);
router.post("/send", Controller.sendChat);
router.post("/read", Controller.readChat);

export default router;
