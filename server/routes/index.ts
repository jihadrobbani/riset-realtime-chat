import { Request, Response, Router } from "express";
import { Socket } from "socket.io";
import userRoutes from "./user";
import chatRoutes from "./chat";
import roomRoutes from "./room";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Realtime Chat runs" });
});

router.use("/", userRoutes);
router.use("/chats", chatRoutes);
router.use("/rooms", roomRoutes);

export default router;
