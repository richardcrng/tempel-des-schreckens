import { GameBase, GameStatus } from "../../../client/src/types/game.types"
import { dealCards } from "./controllers"
import { generateDeck } from "./utils"

describe('dealCards', () => {
  it('given a starting game, creates a first round with dealt cards', () => {
    const game: GameBase = {
      id: 'whatever',
      players: {
        'id-1': { socketId: 'id-1' },
        'id-2': { socketId: 'id-2' },
        'id-3': { socketId: 'id-3' }
      },
      deck: generateDeck(3),
      rounds: [],
      status: GameStatus.ONGOING
    }
    dealCards(game);
    expect(game.rounds).toHaveLength(1);
    expect(game.rounds[0].number).toBe(1);
    for (let playerId in game.players) {
      expect(game.rounds[0].cardsDealt).toHaveProperty(playerId);
      expect(game.rounds[0].cardsDealt[playerId]).toHaveLength(5)
    }
  })
})