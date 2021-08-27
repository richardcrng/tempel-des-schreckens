import { Game } from "../../../client/src/types/game.types";
import { assignRoles, dealCardsToPlayers } from "./utils";

describe('assignRoles', () => {
  test('assigns roles to all players', () => {
    const players: Game['players'] = {
      idOne: { socketId: 'idOne' },
      idTwo: { socketId: 'idTwo' },
      idThree: { socketId: 'idThree' }
    }
    assignRoles(players);
    for (let playerId in players) {
      expect(players[playerId]).toHaveProperty('role')
      expect(players[playerId].role).toMatch(/[adventurer|guardian]/i)
    }
  })
})

describe('dealCardsToPlayers', () => {
  test('Given 10 card ids and 2 players, deals 5 cards to each player', () => {
    const cardIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const playerIds = ['foo', 'bar'];
    const dealResult = dealCardsToPlayers(cardIds, playerIds)
    // 2 players dealt to
    expect(Object.keys(dealResult).length).toBe(2);
    for (let playerId in dealResult) {
      // 5 cards dealt to each
      expect(dealResult[playerId].length).toBe(5)
    }
  })

  test("Given 18 card ids and 6 players, deals 3 cards to each player", () => {
    const cardIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    const playerIds = ["a", "b", "c", "d", "e", "f"];
    const dealResult = dealCardsToPlayers(cardIds, playerIds);
    // 6 players dealt to
    expect(Object.keys(dealResult).length).toBe(6);
    for (let playerId in dealResult) {
      // 3 cards dealt to each
      expect(dealResult[playerId].length).toBe(3);
    }
  });
})