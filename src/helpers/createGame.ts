import { RoomUsers, players } from "../data/gameData";
import { dataStringify } from "./parser";

export const createGame = (roomUsers: RoomUsers[]) => {
  const gameId = Math.floor(Math.random() * 1000);

  const player1 = players.get(roomUsers[0].name)
  const player2 = players.get(roomUsers[1].name)

  const data = {
    idGame: gameId,
    idPlayer: player2!.index
  }

  const response = dataStringify("create_game", data);

  player1?.ws?.send(response);
  player2?.ws?.send(response);

}