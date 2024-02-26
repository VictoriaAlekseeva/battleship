import { game, Player, players, playersID, Ships } from '../data/gameData';
import { dataStringify } from './parser';
import { startGame } from './startGame';

export const addShips = (parsedData: { gameId: number, ships: Ships[], indexPlayer: number }, currentUser: Player) => {

  const { gameId, ships, indexPlayer } = parsedData;

  // currentUser.ships = ships;

  game[gameId].ships.push(ships);

  game[gameId].players.push(indexPlayer);

  // const turnResponse = dataStringify("turn", {
  //       currentPlayer: game[gameId].players[game[gameId].currentPlayer]
  //     })

  console.log('game began', game, currentUser);
  startGame(gameId);

  // if (game[gameId].players.length === 2) {

  //   game[gameId].players.forEach(gameItem => {

  //     const response = dataStringify("start_game", {
  //       ships: currentUser.ships,
  //       currentPlayerIndex: gameItem
  //     });

  //     const player = players.get(playersID[gameItem]);
  //     player?.ws.send(response)
  //     player?.ws.send(turnResponse)
  //     console.log(game)
  //   })
  // }

}