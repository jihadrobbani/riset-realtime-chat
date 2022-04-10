import { Request, Response } from "express";
import { User, Chat, Room } from "../models";
import { v4 as uuidv4 } from "uuid";

class Controller {
  static async createOrFindRoom(req: Request, res: Response) {
    let { userIds } = req.body;
    try {
      let room = await Room.findOne({ where: { userIds } });
      if (!room) {
        room = await Room.create({
          id: uuidv4(),
          userIds,
        });
      }
      return res.json({ message: "Succes", payload: room });
    } catch (e) {
      return res.status(500).json(e);
    }
  }
}

export default Controller;
