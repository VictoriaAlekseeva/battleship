import WebSocket from 'ws';
import { players } from '../data/gameData';

export const createPlayer = (name: string, password: string, ws: WebSocket) => {

  if (players.has(name)) {
    const player = players.get(name);
    if (player && player.password === password) {
      console.log(name, password)
      players.set(name, {...player, ws} )
      return { name, index: player.index, error: false, errorText: "" }
    } else {
      return { error: true, errorText: "Incorrect password" } }
  } else {
    const playerIndex = players.size + 1;
    const newPlayer = {
      name,
      password,
      index: playerIndex,
      id: 0,
      ws
    }

    players.set(name, newPlayer)
    return { name, index: newPlayer.index, error: false, errorText: "" };
  }
}