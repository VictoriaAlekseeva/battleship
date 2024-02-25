import { GameInfo, RoomUsers, game, players } from "../data/gameData";
import { dataStringify } from "./parser";

export const createGame = (roomUsers: RoomUsers[]) => {
  const gameId = Math.floor(Math.random() * 1000);

  const player1 = players.get(roomUsers[0].name)
  const player2 = players.get(roomUsers[1].name)

  const response1 = dataStringify("create_game", {
    idGame: gameId,
    idPlayer: player1!.index
  });
  const response2 = dataStringify("create_game", {
    idGame: gameId,
    idPlayer: player2!.index
  });

  game[gameId] = {
    players: [],
    currentPlayer: 0
  };

  player1?.ws?.send(response1);
  player2?.ws?.send(response2);
}