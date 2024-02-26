import { Player, rooms, players } from "../data/gameData";
import { createGame } from "./createGame";

export const addUserToRoom = (currentUser: Player, roomId: number) => {
  const roomIndex = rooms.findIndex(room => room.roomId === roomId);
  const {name, index} = currentUser
  if (name && !rooms[roomIndex].roomUsers.find(user => user.name === name)) {
    rooms[roomIndex].roomUsers.push({name, index});
    createGame(rooms[roomIndex].roomUsers);
    rooms.splice(roomIndex, 1);

    rooms[roomIndex].roomUsers.forEach(user => {
      const player = players.get(user.name) as Player;
      player.room = null
    })

    const playerRoomIndex = rooms.findIndex(room => room.roomId === currentUser.room);
    rooms.splice(playerRoomIndex, 1);

  }
  console.log(rooms)
}