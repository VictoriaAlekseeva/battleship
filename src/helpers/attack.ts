import { Player, Ships, game, players, playersID } from "../data/gameData";
import { dataParse, dataStringify } from "./parser";
import { turn } from "./turn";

export const attack = (parsedData: { gameId: number, indexPlayer: number, x: number, y: number }) => {

  const { gameId, indexPlayer, x, y } = parsedData;
  const playerTurn = game[gameId].players[game[gameId].currentPlayer];

  const attackResult = {
    position: { x, y },
    currentPlayer: playerTurn,
    status: "miss"
  }

  if (playerTurn !== indexPlayer) {
    console.log('Not your turn!');
    return
  }

  const playerShips = game[gameId].ships[(game[gameId].currentPlayer + 1) % game[gameId].ships.length]

  const ship = playerShips.find(ship => {
    const shipLength = ship.length;

    const positionX = ship.position.x;
    const positionY = ship.position.y;

    const positionXEnd = ship.direction ? positionX : positionX + shipLength - 1;
    const positionYEnd = ship.direction ? positionY + shipLength - 1 : positionY;

    return (positionX <= x && x <= positionXEnd) && (positionY <= y && y <= positionYEnd)
  })

  if (!ship) {
    const turnResponse = turn(gameId, true);
    game[gameId].players.forEach(user => {
      const gamePlayer = players.get(playersID[user]);

      const res = dataStringify("attack", attackResult);

      gamePlayer?.ws.send(res);
      gamePlayer?.ws.send(turnResponse);
    })
    return;
  }

  if (!ship.shotsCoordinates) ship.shotsCoordinates = [];

  const wasShot = ship.shotsCoordinates.find(item => item.x === x && item.y === y);

  if (!wasShot) {
    ship.shotsCoordinates.push({ x, y });
    ship.status = "shot";
  }

  if (ship.shotsCoordinates.length === ship.length) ship.status = "killed";

  if (ship.status === "shot") {
    const turnResponse = turn(gameId, false);
    game[gameId].players.forEach(user => {
      const gamePlayer = players.get(playersID[user]);

      attackResult.status = "shot";

      const res = dataStringify("attack", attackResult);

      gamePlayer?.ws.send(res);
      gamePlayer?.ws.send(turnResponse)
    })
  } else if (ship.status === "killed") {
    const turnResponse = turn(gameId, false);

    ship.shotsCoordinates.forEach(coordinate => {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const missedFieldsX = coordinate.x + i;
          const missedFieldsY = coordinate.y + j;

          if (missedFieldsX >= 0 && missedFieldsX <= 9) attackResult.position.x = missedFieldsX
          if (missedFieldsY >= 0 && missedFieldsY <= 9) attackResult.position.y = missedFieldsY
          attackResult.status="miss";
          game[gameId].players.forEach(user => {
            const gamePlayer = players.get(playersID[user]);

            const res = dataStringify("attack", attackResult);

            gamePlayer?.ws.send(res);
          })
        }
      }
    })

    ship.shotsCoordinates.forEach(coordinate => {
      attackResult.position = coordinate;
      attackResult.status = "killed";

      game[gameId].players.forEach(user => {
        const gamePlayer = players.get(playersID[user]);

        const res = dataStringify("attack", attackResult);

        gamePlayer?.ws.send(res);
        gamePlayer?.ws.send(turnResponse);
      })
    })
  }
}
