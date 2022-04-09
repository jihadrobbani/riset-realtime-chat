import { Router } from "express";
import Controller from "../controllers/ChatController";

const router = Router();

router.post("/send", Controller.sendChat);

export default router;
