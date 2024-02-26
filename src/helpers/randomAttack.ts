import { attack } from "./attack";

export const randomAttack = (parsedData: { gameId: number | string, indexPlayer: number | string }) => {
  const { gameId, indexPlayer } = parsedData;

  const randomTargetX = Math.round(Math.random() * 9);
  const randomTargetY = Math.round(Math.random() * 9);

  const randomAttackData = {
    gameId,
    x: randomTargetX,
    y: randomTargetY,
    indexPlayer
  }

  attack(randomAttackData);

}