import { winners } from "../data/gameData"
import { dataStringify } from "./parser"

export const updateWinners = () => {
  const winnersResponseData: Record<string, string | number>[] = []

  Object.entries(winners).forEach(winner => {
    winnersResponseData.push({ name: winner[0], wins: winner[1] })
  })

  const winnersResponse = dataStringify("update_winners", winnersResponseData)

  return winnersResponse
}