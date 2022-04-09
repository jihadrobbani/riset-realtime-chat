import { Model, DataTypes } from "sequelize";
import db from "../config/database.config";

interface UserAttributes {
  id: string;
  username: string;
  isOnline: boolean;
}

export class User extends Model<UserAttributes> {}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isOnline: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { sequelize: db, tableName: "Users" }
);
