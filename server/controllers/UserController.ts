import { Request, Response } from "express";
import { User } from "../models";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

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
      // const data = await User.update(
      //   {
      //     isOnline: true,
      //   },
      //   { where: { username }, returning: true }
      // );
      let token = jwt.sign({ ...user }, process.env.JWT_KEY!);
      return res.json({ message: "Login success", token });
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

  static async getUsers(req: Request, res: Response) {
    const { user } = res.locals;
    try {
      const data = await User.findAll({
        where: { id: { [Op.notLike]: user.dataValues.id } },
      });
      return res.json({ message: "Success", payload: data });
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default Controller;
