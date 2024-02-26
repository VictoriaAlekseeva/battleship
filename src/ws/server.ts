import WebSocket, { MessageEvent, WebSocketServer } from 'ws';
import { dataParse, dataStringify } from '../helpers/parser';
import { Player, players } from '../data/gameData'
import {consoleMessageColor} from '../data/consoleview'
import { createPlayer } from '../helpers/createUser';
import { createRoom } from '../helpers/createNewRoom';
import { updateRoom } from '../helpers/updateRoom'
import { addUserToRoom } from '../helpers/addUserToRoom';
import { addShips } from '../helpers/addShips';
import { attack } from '../helpers/attack';
import { randomAttack } from '../helpers/randomAttack';
import { logOffPlayer } from '../helpers/logOffPlayer';

export const startServer = () => {

  const WEBSOCKET_PORT = 3000;
  const wss = new WebSocketServer({ port: WEBSOCKET_PORT });

  wss.on('connection', (ws: WebSocket) => {
    console.log(consoleMessageColor.playerdata, 'New player connected');

    let currentUser = {} as Player;

    ws.on('message', (message: MessageEvent) => {
      try {
        console.log(consoleMessageColor.request,`Received message: ${message.toString()}`);
        const msg = JSON.parse(message.toString())
        const { type, data } = msg;
        const parsedData = dataParse(data);

        switch (type) {
          case "reg":
            const { name, password } = parsedData;
            const regUser = createPlayer(name, password, ws)
            currentUser = players.get(regUser.name)!;
            ws.send(dataStringify('reg', regUser));
            ws.send(updateRoom());
            break;
          case "create_room":
            createRoom(currentUser);
            wss.clients.forEach((client) => {
              client.send(updateRoom());
            });
            break;
          case "add_user_to_room":
            const indexRoom = parsedData.indexRoom
            addUserToRoom(currentUser, indexRoom);
            wss.clients.forEach((client) => {
              client.send(updateRoom());
            });
            break;
          case "add_ships":
            addShips(parsedData);
            break;
          case "attack":
            attack(parsedData);
            break;
          case "randomAttack":
            randomAttack(parsedData);
            break;
          case "single_play":
            console.log(`single_play user data ${data}`)
            break;
          default:
            break;
        }

      } catch (err) {
        console.error(consoleMessageColor.red, 'ERROR', err)
      }
    });

    ws.on('close', () => {
      logOffPlayer(currentUser);
      wss.clients.forEach((client) => {
        client.send(updateRoom());
      });
      console.log(consoleMessageColor.playerdata,`Player${currentUser.name ? ' ' +currentUser.name : ''} disconnected`);
    });
  });
  wss.on("listening", () => {
    console.log(consoleMessageColor.serverinfo, `WebSocket works on port ${WEBSOCKET_PORT}`);
  });
}

