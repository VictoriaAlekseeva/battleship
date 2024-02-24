import { game, Player, players, playersID, Ships } from '../data/gameData';
import { dataStringify } from './parser';

export const addShips = (parsedData: { gameId: number, ships: Ships[], indexPlayer: number }, currentUser: Player) => {

  const { gameId, ships, indexPlayer } = parsedData;

  currentUser.ships = ships;

  game[gameId].push({ indexPlayer });

  console.log('game began', game, currentUser);

  if (game[gameId].length === 2) {

    game[gameId].forEach(gameItem => {

      const response = dataStringify("start_game", {
        ships: currentUser.ships,
        currentPlayerIndex: gameItem.indexPlayer
      });

      const player = players.get(playersID[gameItem.indexPlayer]);
      player?.ws.send(response)

    })
  }

}