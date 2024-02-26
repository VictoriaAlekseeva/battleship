import WebSocket, { MessageEvent, WebSocketServer } from 'ws';
import { dataParse, dataStringify } from '../helpers/parser';
import { Player, players } from '../data/gameData'
import { createPlayer } from '../helpers/createUser';
import { createRoom } from '../helpers/createNewRoom';
import { updateRoom } from '../helpers/updateRoom'
import { addUserToRoom } from '../helpers/addUserToRoom';
import { addShips } from '../helpers/addShips';
import { attack } from '../helpers/attack';
import { randomAttack } from '../helpers/randomAttack';

export const startServer = () => {

  const WEBSOCKET_PORT = 3000;
  const wss = new WebSocketServer({ port: WEBSOCKET_PORT });

  wss.on('connection', (ws: WebSocket) => {
    console.log('New client connected');

    let currentUser = {} as Player;

    ws.on('message', (message: MessageEvent) => {
      try {
        console.log(`Received message:`, message.toString());
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
            console.log(players);
            break;
          case "create_room":
            createRoom(currentUser);
            console.log(`create_room user data ${parsedData}, type ${type}`)
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
            console.log(`add_user_to_room user data ${data}`)
            break;
          case "add_ships":
            addShips(parsedData, currentUser)
            console.log(`add_ships user data ${data}`)
            break;
          case "attack":
            attack(parsedData)
            console.log(`attack user data ${data}`)
            break;
          case "randomAttack":
            randomAttack(parsedData);
            console.log(`randomAttack user data ${data}`)
            break;
          case "single_play":
            console.log(`single_play user data ${data}`)
            break;
          default:
            break;
        }

      } catch (err) {
        console.error('!!!!MESSAGE', err)
      }
    });

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });
}
