import { game, Player, Ships } from '../data/gameData';
import { startGame } from './startGame';

export const addShips = (parsedData: { gameId: number, ships: Ships[], indexPlayer: number }, currentUser: Player) => {

  const { gameId, ships, indexPlayer } = parsedData;

  game[gameId].ships.push(ships);

  game[gameId].players.push(indexPlayer);

  console.log('game began', game, currentUser);

  startGame(gameId);
}