import WebSocket from 'ws';
import { Player, players, playersID } from '../data/gameData';

interface RegError {
  error: boolean,
  errorText: string
}

export const createPlayer = (name: string, password: string, ws: WebSocket): Pick<Player, 'name'| 'index' > & RegError => {

  if (players.has(name)) {
    const player = players.get(name);
    if (player && player.password === password) {
      console.log(name, password)
      players.set(name, {...player, ws} )
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
    return { name, index: newPlayer.index, error: false, errorText: "" };
  }
}