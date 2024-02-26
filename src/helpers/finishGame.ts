import WebSocket from "ws";
import { consoleMessageColor } from "../data/consoleview";
import { game, players, playersID, winners } from "../data/gameData";
import { updateWinners } from "./updateWinners";
import { dataStringify } from "./parser";
import { IncomingMessage } from "http";

export const finishGame = (gameId: number | string, wss: WebSocket.Server<typeof WebSocket, typeof IncomingMessage>) => {
  game[gameId].ships.forEach((playersShips) => {
    if (playersShips.every(ship => ship.status === "killed")) {

      const winner= game[gameId].players[game[gameId].currentPlayer];
      const data = { winPlayer: winner };
      const winnerName = playersID[winner];

      winners[winnerName] = winners[winnerName] ? ++winners[winnerName] : 1;

      game[gameId].players.forEach((gameItem) => {

        const response = dataStringify("finish", data);

        const player = players.get(playersID[gameItem]);
        player?.ws.send(response)
      })
      console.log(consoleMessageColor.result, `Game over. The winner is ${winnerName}`);
    }

    wss.clients.forEach((client) => {
      client.send(updateWinners());
    })
  })
}