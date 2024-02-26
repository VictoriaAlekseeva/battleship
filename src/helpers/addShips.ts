import { game, Player, Ships, playersID } from '../data/gameData';
import {consoleMessageColor} from '../data/consoleview';
import { startGame } from './startGame';

export const addShips = (parsedData: { gameId: number, ships: Ships[], indexPlayer: number }) => {

  const { gameId, ships, indexPlayer } = parsedData;

  game[gameId].ships.push(ships);

  game[gameId].players.push(indexPlayer);

  console.log(consoleMessageColor.result, `Player ${playersID[indexPlayer]} added ships to game ${gameId}`);

  startGame(gameId);
}