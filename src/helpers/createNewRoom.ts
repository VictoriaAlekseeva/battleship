import { Player, rooms, Room } from '../data/gameData';

export const createNewRoom = (currentUser: Player) => {
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
    rooms.push(newRoom)
  }
  console.log(rooms)
}