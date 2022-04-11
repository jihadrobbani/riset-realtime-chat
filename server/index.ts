import "dotenv/config";
import express from "express";
import db from "./config/database.config";
import cors from "cors";
import routes from "./routes";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

import UserController from "./controllers/UserController";
import ChatController from "./controllers/ChatController";
import RoomController from "./controllers/RoomController";
import { UserInterface } from "./interfaces/User";

db.authenticate()
  .then(() => {
    console.log("db authenticated");
    return db.sync();
  })
  .then(() => {
    console.log("db synced");
  })
  .catch((err) => {
    console.log("error connecting db", err);
  });

const app = express();
const port = process.env.PORT || 9000;
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));

const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
app.use("/", routes);

io.on("connection", (socket: Socket) => {
  socket.join("lobby");
  socket.on("login", async (user: UserInterface) => {
    const data = await UserController.setUserOnline(user);
    socket.broadcast.emit("newUser", data);
  });
  socket.on("logout", async (user: UserInterface) => {
    const data = await UserController.setUserOffline(user);
    socket.broadcast.emit("newUser", data);
  });

  socket.on("joinRoom", (roomId: string) => {
    socket.join(roomId);
  });
  socket.on("chat", (roomId: string) => {
    setTimeout(async () => {
      const data = await ChatController.returnAllChats(roomId);
      io.sockets.in(roomId).emit("newChat", data);
      // socket.to(roomId).emit("newChat", data);
    }, 1000);
  });
});

server.listen(port, () => {
  console.log(`App listens on port ${port}`);
});
