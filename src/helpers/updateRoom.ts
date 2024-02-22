import { rooms } from "../data/gameData"
import { dataStringify } from "./parser"

export const updateRoom = () => {
  // const roomsWithOnePlayer = rooms.filter(room => room.roomUsers.length === 1)
  return dataStringify('update_room', rooms);
}