import { Request, Response, Router } from "express";
import Controller from "../controllers/UserController";
import jwtChecker from "../middlewares/jwtChecker";
import { Socket } from "socket.io";

const router = Router();

router.post("/login", Controller.login);
router.post("/logout", Controller.setUserOffline);
router.get("/getUser", jwtChecker, Controller.getUser);
router.get("/getUsers", jwtChecker, Controller.getUsers);
router.get("/getUserById/:id", Controller.getUserById);

export default router;
