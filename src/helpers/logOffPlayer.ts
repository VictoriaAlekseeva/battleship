import { Player, game, players, playersID, rooms, winners } from "../data/gameData";
import { dataStringify } from "./parser";

export const logOffPlayer = (user: Player) => {

  const roomId = user.room;
  const gameId = user.gameId;
  const userIndex = user.index;

  if (roomId) {
    const removeRoomIndex = rooms.findIndex(room => room.roomId === roomId);
    rooms.splice(removeRoomIndex, 1);
    user.room = null
    return
  }

  if (gameId) {
    user.gameId = null;
    game[gameId].players.forEach(player => {
      if (player !== userIndex) {
        const data = { winPlayer: player };
        const winnerName = playersID[player];

        winners[winnerName] = winners[winnerName] ? ++winners[winnerName] : 1;

        const winnersResponseData: Record<string, string | number>[] = []

        Object.entries(winners).forEach(winner => {
          winnersResponseData.push({ name: winner[0], wins: winner[1] })
        })

        const response = dataStringify("finish", data);

        const anotherPlayer = players.get(winnerName);
        anotherPlayer!.gameId = null;

        anotherPlayer?.ws.send(response);

      }
    })
    return
  }

  console.log("!!!!!")

}
