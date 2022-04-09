import { Model, DataTypes } from "sequelize";
import db from "../config/database.config";

interface ChatAttributes {
  id: string;
  userId: string;
  roomId: string;
  read: boolean;
  text: string;
}

export class Chat extends Model<ChatAttributes> {}

Chat.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roomId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, tableName: "Chats" }
);
