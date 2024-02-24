import { Player, rooms, Room } from '../data/gameData';

export const createRoom = (currentUser: Player) => {
  if (currentUser.room !== null) return;
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

    rooms.push(newRoom)
  }
  console.log(rooms)
}