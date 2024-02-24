import { dataStringify } from "./parser"

export const game = () => {
  let turnIndex = 0;
  // user.ws?.send(dataStringify('turn', {currentPlayer: game[gameId][playerTurn].indexPlayer}))

  return () => {
    turnIndex = (turnIndex + 1) % 2;
    return turnIndex;
  }

  // return dataStringify('turn', {currentPlayer})

}
