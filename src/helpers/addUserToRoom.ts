import { Player, rooms } from "../data/gameData";
import { createGame } from "./createGame";

export const addUserToRoom = (currentUser: Player, roomId: number) => {
  const roomIndex = rooms.findIndex(room => room.roomId === roomId);
  const {name} = currentUser
  if (name && !rooms[roomIndex].roomUsers.find(user => user.name === name)) {
    rooms[roomIndex].roomUsers.push({name, index: 2});
    createGame(rooms[roomIndex].roomUsers);
    rooms.splice(roomIndex, 1);
  }
  console.log(rooms)
}