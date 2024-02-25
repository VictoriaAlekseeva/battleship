import { game } from "../data/gameData"
import { dataStringify } from "./parser"

export const turn = (gameId: number, isTurnChange: boolean) => {

  if (isTurnChange) game[gameId].currentPlayer = (game[gameId].currentPlayer + 1) % game[gameId].players.length

  const response = dataStringify('turn', {currentPlayer: game[gameId].currentPlayer})

  return response;

}
