import { Router } from "express";
import Controller from "../controllers/UserController";
import jwtChecker from "../middlewares/jwtChecker";

const router = Router();

router.post("/login", Controller.login);
router.post("/logout", Controller.logout);
router.get("/getUsers", jwtChecker, Controller.getUsers);

export default router;
