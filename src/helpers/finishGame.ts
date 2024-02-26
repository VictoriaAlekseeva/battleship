import { consoleMessageColor } from "../data/consoleview";
import { game, players, playersID, winners } from "../data/gameData";
import { dataStringify } from "./parser";

export const finishGame = (gameId: number | string) => {
  game[gameId].ships.forEach((playersShips) => {
    if (playersShips.every(ship => ship.status === "killed")) {

      const winner= game[gameId].players[game[gameId].currentPlayer];
      const data = { winPlayer: winner };
      const winnerName = playersID[winner];

      winners[winnerName] = winners[winnerName] ? ++winners[winnerName] : 1;

      const winnersResponseData: Record<string, string | number>[] = []

      Object.entries(winners).forEach(winner => {
        winnersResponseData.push({name: winner[0], wins: winner[1] })
      })

      const winnersResponse = dataStringify("update_winners", winnersResponseData)

      game[gameId].players.forEach((gameItem) => {

        const response = dataStringify("finish", data);

        const player = players.get(playersID[gameItem]);
        player?.ws.send(response)
        player?.ws.send(winnersResponse)
      })
      console.log(consoleMessageColor.result, `Game over. The winner is ${winnerName}`);
    }
  })
}