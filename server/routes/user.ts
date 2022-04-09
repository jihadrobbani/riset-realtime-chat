import { Router } from "express";
import Controller from "../controllers/UserController";

const router = Router();

router.post("/login", Controller.login);
router.post("/logout", Controller.logout);

export default router;
