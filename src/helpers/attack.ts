import { Player, Ships, game, players, playersID } from "../data/gameData";
import { dataParse, dataStringify } from "./parser";
import { turn } from "./turn";

export const attack = (parsedData: { gameId: number, indexPlayer: number, x: number, y: number }, currentUser: Player) => {

  const { gameId, indexPlayer, x, y } = parsedData;
  const playerTurn = game[gameId].players[game[gameId].currentPlayer];

  if (playerTurn !== indexPlayer) {
    console.log('Not your turn!');
    return
  }

  const playerShips = players.get(playersID[playerTurn])!.ships as Ships[];

  const attackResult = {
    position: { x, y },
    currentPlayer: playerTurn,
    status: "miss"
  }

  playerShips.forEach(ship => {
    const shipLength = ship.length;

    const positionX = ship.position.x;
    const positionY = ship.position.y;

    const positionXEnd = ship.direction ? positionX : positionX + shipLength - 1;
    const positionYEnd = ship.direction ? positionY + shipLength - 1 : positionY;

    if ((positionX <= x && x <= positionXEnd) && (positionY <= y && y <= positionYEnd)) {
      ship.shots ? ship.shots++ : 1;
      if (ship.shots === shipLength) {
        ship.status = "killed";
        attackResult.status = ship.status;
      } else {
        ship.status = "shot";
        attackResult.status = ship.status;
      }
    }
  })

  let turnResponse = '';

  switch (attackResult.status) {
    case "killed":
      turnResponse = turn(gameId, false);
      break
    case "shot":
      turnResponse = turn(gameId, false);
      break
    case "missed":
      turnResponse = turn(gameId, true);
      break
  }

  const attackResponse = dataStringify('attack', attackResult)


  sendResponse(game[gameId].players, attackResponse, turnResponse)

}

const sendResponse = (users: number[], ...arg: string[]) => {

  users.forEach(user => {
    const currentUser = players.get(playersID[user]);

    for (const res of arg) {
      currentUser?.ws.send(res)

    }
  })
}