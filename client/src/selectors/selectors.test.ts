import { CardType, Game, GameStatus } from "../types/game.types"
import { generateDeck } from '../../../server/src/game/utils';
import { getCurrentRound } from "./game";

describe('getCurrentRound', () => {
  it('fetches the latest round', () => {
    const game: Game = {
      id: "B3192",
      players: {
        "1UwVl4NMJ-ULeIiTAAAH": {
          isHost: true,
          socketId: "1UwVl4NMJ-ULeIiTAAAH",
        },
        "2UwVl4NMJ-ULeIiTAAAH": {
          socketId: "2UwVl4NMJ-ULeIiTAAAH",
        },
        "3UwVl4NMJ-ULeIiTAAAH": {
          socketId: "3UwVl4NMJ-ULeIiTAAAH",
        },
      },
      status: GameStatus.ONGOING,
      deck: generateDeck(3),
      rounds: [
        {
          number: 2,
          turns: [
            {
              keyholderId: "1UwVl4NMJ-ULeIiTAAAH",
              selected: { playerId: "2UwVl4NMJ-ULeIiTAAAH", cardIdx: 4 },
              flip: CardType.GOLD,
            },
            {
              keyholderId: "2UwVl4NMJ-ULeIiTAAAH",
              selected: { playerId: "3UwVl4NMJ-ULeIiTAAAH", cardIdx: 4 },
              flip: CardType.GOLD,
            },
            {
              keyholderId: "3UwVl4NMJ-ULeIiTAAAH",
              selected: { playerId: "1UwVl4NMJ-ULeIiTAAAH", cardIdx: 4 },
              flip: CardType.FIRE,
            },
          ],
          cardsDealt: {
            "1UwVl4NMJ-ULeIiTAAAH": [0, 11, 2, 7, 1],
            "2UwVl4NMJ-ULeIiTAAAH": [6, 9, 10, 4, 3],
            "3UwVl4NMJ-ULeIiTAAAH": [8, 12, 5, 14, 13],
          },
        },
        {
          number: 2,
          turns: [],
          cardsDealt: {
            "1UwVl4NMJ-ULeIiTAAAH": [0, 11, 2, 7],
            "2UwVl4NMJ-ULeIiTAAAH": [6, 9, 10, 4],
            "3UwVl4NMJ-ULeIiTAAAH": [8, 12, 5, 14],
          },
        },
      ],
    };

    const round = getCurrentRound(game);
    expect(round).toEqual(game.rounds[1]);
  })}
)