import { User } from "./User";
import { Chat } from "./Chat";
import { Room } from "./Room";

User.hasMany(Chat, {
  sourceKey: "id",
  foreignKey: "userId",
});

Room.hasMany(Chat, {
  sourceKey: "id",
  foreignKey: "roomId",
});

Chat.belongsTo(User, {
  foreignKey: "userId",
  as: "User",
});

Chat.belongsTo(Room, {
  foreignKey: "roomId",
  as: "Room",
});

export { User, Room, Chat };
