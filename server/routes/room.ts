import { Router } from "express";
import Controller from "../controllers/RoomController";

const router = Router();

router.post("/find", Controller.createOrFindRoom);

export default router;
