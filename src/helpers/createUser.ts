import WebSocket from 'ws';
import { Player, players, playersID } from '../data/gameData';
import { consoleMessageColor } from '../data/consoleview';

interface RegError {
  error: boolean,
  errorText: string
}

export const createPlayer = (name: string, password: string, ws: WebSocket): Pick<Player, 'name'| 'index' > & RegError => {

  if (players.has(name)) {
    const player = players.get(name);
    if (player && player.password === password) {
      players.set(name, {...player, ws, room: null} );
      console.log(consoleMessageColor.result, `Player ${name} logged in`);
      return { name, index: player.index, error: false, errorText: "" }
    } else {
      return { name, index: player!.index, error: true, errorText: "Incorrect password" } }
  } else {
    const playerIndex = players.size + 1;
    const newPlayer = {
      name,
      password,
      index: playerIndex,
      id: 0,
      room: null,
      gameId: null,
      ws
    }

    players.set(name, newPlayer);
    playersID[playerIndex] = name;
    console.log(consoleMessageColor.result, `New player ${name} registered`);
    return { name, index: newPlayer.index, error: false, errorText: "" };
  }
}