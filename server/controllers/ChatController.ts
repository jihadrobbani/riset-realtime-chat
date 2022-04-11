import { Request, Response } from "express";
import { Chat, Room } from "../models";
import { v4 as uuidv4 } from "uuid";
import { ChatInterface } from "../interfaces/Chat";

class Controller {
  static async sendChat(req: Request, res: Response) {
    const { user } = res.locals;
    const { roomId, text } = req.body;
    try {
      const payload = await Chat.create({
        id: uuidv4(),
        userId: user.dataValues.id,
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
    const { id } = req.params;

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

  static async getAllChats(req: Request, res: Response) {
    const { roomId } = req.params;
    try {
      const payload = await Chat.findAll({
        where: { roomId },
        order: [["createdAt", "DESC"]],
      });
      return res.json({ message: "Success", payload });
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  static async returnAllChats(roomId: string) {
    try {
      const payload = await Chat.findAll({
        where: { roomId },
        order: [["createdAt", "DESC"]],
      });
      return payload;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

export default Controller;
