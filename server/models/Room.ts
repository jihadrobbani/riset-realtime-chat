import { Model, DataTypes } from "sequelize";
import db from "../config/database.config";

interface RoomAttributes {
  id: string;
  userIds: string;
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
      type: DataTypes.STRING,
      get: function () {
        return JSON.parse(this.getDataValue("userIds"));
      },
      set: function (val) {
        return this.setDataValue("userIds", JSON.stringify(val));
      },
    },
  },
  { sequelize: db, tableName: "Rooms" }
);
