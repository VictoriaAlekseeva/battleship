import { RoomUsers, game, players } from "../data/gameData";
import { dataStringify } from "./parser";
import { consoleMessageColor } from '../data/consoleview';

export const createGame = (roomUsers: RoomUsers[]) => {
  const gameId = Math.floor(Math.random() * 1000);

  const player1 = players.get(roomUsers[0].name);
  const player2 = players.get(roomUsers[1].name);

  player1!.gameId = gameId;
  player2!.gameId = gameId;

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
    ships: [],
    currentPlayer: 0
  };

  player1?.ws?.send(response1);
  player2?.ws?.send(response2);

  console.log(consoleMessageColor.result, `New game ${gameId} created`)
}