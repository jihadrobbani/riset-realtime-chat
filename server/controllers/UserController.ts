import { Request, Response } from "express";
import { User } from "../models";
import { v4 as uuidv4 } from "uuid";

class Controller {
  static async login(req: Request, res: Response) {
    const { username } = req.body;
    try {
      let user = await User.findOne({ where: { username } });
      if (!user) {
        user = await User.create({
          id: uuidv4(),
          username,
          isOnline: false,
        });
      }
      const data = await User.update(
        {
          isOnline: true,
        },
        { where: { username }, returning: true }
      );
      return res.json(data[1][0].get());
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async logout(req: Request, res: Response) {
    const { username } = req.body;
    try {
      const data = await User.update(
        {
          isOnline: false,
        },
        { where: { username }, returning: true }
      );
      return res.json(data[1][0].get());
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default Controller;
