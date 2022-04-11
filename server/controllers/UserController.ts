import { Request, Response } from "express";
import { User } from "../models";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import { UserInterface } from "../interfaces/User";

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
      let token = jwt.sign({ ...user }, process.env.JWT_KEY!);
      return res.json({ message: "Login success", token });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async setUserOnline(user: UserInterface) {
    const { id } = user;
    try {
      await User.update(
        {
          isOnline: true,
        },
        { where: { id } }
      );
      const data = await User.findAll({
        order: [
          ["isOnline", "DESC"],
          ["username", "asc"],
        ],
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  static async setUserOffline(user: UserInterface) {
    const { id } = user;
    try {
      await User.update(
        {
          isOnline: false,
        },
        { where: { id } }
      );
      const data = await User.findAll({
        order: [
          ["isOnline", "DESC"],
          ["username", "asc"],
        ],
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  static async getUser(req: Request, res: Response) {
    const { user } = res.locals;
    try {
      const data = await User.findOne({
        where: { id: user.dataValues.id },
      });
      return res.json({ message: "Success", payload: data?.get() });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async getUsers(req: Request, res: Response) {
    const { user } = res.locals;
    try {
      const data = await User.findAll({
        where: { id: { [Op.notLike]: user.dataValues.id } },
        order: [
          ["isOnline", "DESC"],
          ["username", "asc"],
        ],
      });
      return res.json({ message: "Success", payload: data });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await User.findOne({ where: { id } });
      return res.json({ message: "Success", payload: data });
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default Controller;
