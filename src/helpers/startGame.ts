import { Player, game, players, playersID } from "../data/gameData";
import { dataStringify } from "./parser";
import { turn } from "./turn";

export const startGame = (gameId: number) => {
  const playerTurn = turn(gameId, false)

  if (game[gameId].players.length === 2) {

    game[gameId].players.forEach((gameItem, index) => {

      const response = dataStringify("start_game", {
        ships: game[gameId].ships[index],
        currentPlayerIndex: gameItem
      });

      const player = players.get(playersID[gameItem]);
      player?.ws.send(response)
      player?.ws.send(playerTurn)
      console.log(game)
    })
}}