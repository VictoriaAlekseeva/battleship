import { Player, rooms } from "../data/gameData";

export const addUserToRoom = (currentUser: Player, roomId: number) => {
  const roomIndex = rooms.findIndex(room => room.roomId === roomId);
  const {name} = currentUser
  if (name && !rooms[roomIndex].roomUsers.find(user => user.name === name)) {
    rooms[roomIndex].roomUsers.push({name, index: 2})
  }
}