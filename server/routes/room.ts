import { Router } from "express";
import Controller from "../controllers/RoomController";

const router = Router();

router.post("/send", Controller.getAllChats);

export default router;
