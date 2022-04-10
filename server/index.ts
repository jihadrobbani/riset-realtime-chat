import "dotenv/config";
import express from "express";
import db from "./config/database.config";
import cors from "cors";
import routes from "./routes";
import { createServer } from "http";
import { Server } from "socket.io";

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
const io = new Server(server);
app.set("socketio", io);
app.use("/", routes);

app.listen(port, () => {
  console.log(`App listens on port ${port}`);
});
