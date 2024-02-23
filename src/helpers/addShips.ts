import { game, Player, players } from '../data/gameData';
import { dataStringify } from './parser';

export const addShips = (parsedData: any, currentUser: Player) => {

  const { gameId, ships, indexPlayer } = parsedData;

  game[gameId].push({ indexPlayer, ships });

  console.log('game began', game);

  if (game[gameId].length === 2) {

    game[gameId].forEach(gameItem => {

      const responce = dataStringify("start_game", {
        ships: gameItem.ships,
        currentPlayerIndex: gameItem.indexPlayer
      });

      for (let user of players.values()) {
        if (user.index === gameItem.indexPlayer) {
          user.ws?.send(responce)
        }
      }
    })

  }

}