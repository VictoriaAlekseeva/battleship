import { game } from "../data/gameData"
import { dataStringify } from "./parser"

export const turn = (gameId: number) => {
  console.log(gameId)

  game[gameId].currentPlayer = (game[gameId].currentPlayer + 1) % game[gameId].players.length

  const response = dataStringify('turn', {currentPlayer: game[gameId].currentPlayer})

  return response;

  // user.ws?.send(dataStringify('turn', {currentPlayer: game[gameId][playerTurn].indexPlayer}))

//   {
//     type: "turn",
//     data:
//         {
//             currentPlayer: <number>, /* id of the player in the current game session */
//         },
//     id: 0,
// }

}
