import { Request, Response } from "express";
import { Chat, Room } from "../models";
import { v4 as uuidv4 } from "uuid";

class Controller {
  static async sendChat(req: Request, res: Response) {
    const { userId, roomId, text } = req.body;
    try {
      const payload = await Chat.create({
        id: uuidv4(),
        userId,
        roomId,
        read: false,
        text,
      });
      return res.json({ message: "Chat sent", payload });
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  static async readChat(req: Request, res: Response) {
    const { id } = req.body;
    try {
      const data = await Chat.update(
        { read: true },
        { where: { id }, returning: true }
      );
      return res.json({ message: "Chat read", payload: data[1][0].get() });
    } catch (e) {
      return res.status(500).json(e);
    }
  }
}

export default Controller;
