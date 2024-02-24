import { Player, rooms } from "../data/gameData";
import { createGame } from "./createGame";

export const addUserToRoom = (currentUser: Player, roomId: number) => {
  const roomIndex = rooms.findIndex(room => room.roomId === roomId);
  const {name, index} = currentUser
  if (name && !rooms[roomIndex].roomUsers.find(user => user.name === name)) {
    rooms[roomIndex].roomUsers.push({name, index});
    createGame(rooms[roomIndex].roomUsers);
    rooms.splice(roomIndex, 1);

    const playerRoomIndex = rooms.findIndex(room => room.roomId === currentUser.room);
    rooms.splice(playerRoomIndex, 1);
    currentUser.room = null;
  }
  console.log(rooms)
}