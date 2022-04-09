import { Request, Response } from "express";
import { User, Chat, Room } from "../models";
import { v4 as uuidv4 } from "uuid";

class Controller {
  static async getAllChats(req: Request, res: Response) {
    const { roomId } = req.body;
    try {
      const payload = Chat.findAll({ where: { roomId } });
      return res.json({ message: "Success", payload });
    } catch (e) {
      return res.status(500).json(e);
    }
  }
}

export default Controller;
