import { Request, Response, Router } from "express";
import { Socket } from "socket.io";
import userRoutes from "./user";
import chatRoutes from "./chat";
import roomRoutes from "./room";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  const io: Socket = req.app.get("socketio");
  io.on("connection", (socket: Socket) => {
    console.log("connected", socket.id);
    socket.on("test", () => {
      console.log("masuk test");
    });
  });
  res.json({ message: "Realtime Chat runs" });
});

router.use("/", userRoutes);
router.use("/chats", chatRoutes);
router.use("/rooms", roomRoutes);

export default router;
