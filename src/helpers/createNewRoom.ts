import { Player, rooms, Room } from '../data/gameData';
import {consoleMessageColor} from '../data/consoleview';

export const createRoom = (currentUser: Player) => {
  if (currentUser.room !== null) {
    console.log(consoleMessageColor.warning, `Player already has a room ${currentUser.room}. No more than 1 room per player.`)
    return
  };

  const newRoomId = Math.round(Math.random() * 1000);

  const {name, index} = currentUser

  if (name && index) {
    const newRoom: Room = {
      roomId: newRoomId,
      roomUsers: [
        {
          name,
          index
        }
      ]
    }
    currentUser.room = newRoomId;

    rooms.push(newRoom);
    console.log(consoleMessageColor.result, `New room №${newRoomId} created by player ${name}`)
  }
}