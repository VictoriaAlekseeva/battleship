import { Player, rooms, players } from "../data/gameData";
import {consoleMessageColor} from '../data/consoleview';
import { createGame } from "./createGame";

export const addUserToRoom = (currentUser: Player, roomId: number) => {
  const roomIndex = rooms.findIndex(room => room.roomId === roomId);
  const {name, index} = currentUser
  if (name && !rooms[roomIndex].roomUsers.find(user => user.name === name)) {
    rooms[roomIndex].roomUsers.push({name, index});
    console.log(consoleMessageColor.result, `Player ${name} added to the room ${roomId}. The room is full.`)
    createGame(rooms[roomIndex].roomUsers);

    rooms[roomIndex].roomUsers.forEach(user => {
      const player = players.get(user.name) as Player;
      player.room = null;
    })

    rooms.splice(roomIndex, 1);
    const playerRoomIndex = rooms.findIndex(room => room.roomId === currentUser.room);
    rooms.splice(playerRoomIndex, 1);
  } else {
    console.log(consoleMessageColor.warning, `Player ${name} already in the room ${roomId}`)
  }
}