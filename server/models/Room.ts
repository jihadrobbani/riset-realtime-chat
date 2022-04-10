import { Model, DataTypes } from "sequelize";
import db from "../config/database.config";

interface RoomAttributes {
  id: string;
  userIds: Array<string>;
}

export class Room extends Model<RoomAttributes> {}

Room.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    userIds: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  { sequelize: db, tableName: "Rooms" }
);
