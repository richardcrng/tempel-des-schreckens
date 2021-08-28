import { last } from 'lodash';
import { createSelector } from 'reselect';
import { Card, CardType, Game, GameBase, Round } from "../types/game.types";

export interface RoleCount {
  nAdventurers: number;
  nGuardians: number;
  isExact: boolean;
}

export interface CardCount {
  nGold: number;
  nFire: number;
  nEmpty: number;
}

export const findFlippedCardsFromRound = (
  round: Round,
  cards: Game["deck"]["cards"]
): Card[] => {
  return round.turns.reduce((acc, curr) => {
    const cardIdsChosenFrom = round.cardsDealt[curr.selected.playerId];
    const chosenCardId = cardIdsChosenFrom[curr.selected.cardIdx];
    const selectedCard = cards[chosenCardId];
    return [...acc, selectedCard];
  }, [] as Card[]);
};

export const gameLobbyReadiness = (
  game: GameBase
): { isReady: true } | { isReady: false; reason: string } => {
  const players = Object.entries(game.players);
  if (players.length < 3) {
    return {
      isReady: false,
      reason: "At least three players are needed",
    };
  } else {
    return { isReady: true };
  }
};

export const conspiracyVictimId = (game: Game): string | null => {
  return 'hi';
};

export const conspiracyVictimName = (game: Game): string | undefined => {
  if (hasConspiracy(game)) {
    return 'hi';
  }
};

export const generateRoleCount = (nPlayers: number): RoleCount => {
  switch (nPlayers) {
    case 3:
      return { nAdventurers: 2, nGuardians: 2, isExact: false };
    case 4:
      return { nAdventurers: 3, nGuardians: 2, isExact: false };
    case 5:
      return { nAdventurers: 3, nGuardians: 2, isExact: true };
    case 6:
      return { nAdventurers: 4, nGuardians: 4, isExact: true };
    case 7:
      return { nAdventurers: 5, nGuardians: 3, isExact: false };
    case 8:
      return { nAdventurers: 6, nGuardians: 3, isExact: false };
    case 9:
      return { nAdventurers: 6, nGuardians: 3, isExact: true };
    case 10:
    default:
      return { nAdventurers: 7, nGuardians: 4, isExact: false };
  }
}

export const generateCardCount = (nPlayers: number): CardCount => {
  switch (nPlayers) {
    case 3:
      return { nEmpty: 8, nGold: 5, nFire: 2 };
    case 4:
      return { nEmpty: 12, nGold: 6, nFire: 2 };
    case 5:
      return { nEmpty: 16, nGold: 7, nFire: 2 };
    case 6:
      return { nEmpty: 20, nGold: 8, nFire: 2 };
    case 7:
      return { nEmpty: 26, nGold: 7, nFire: 2 };
    case 8:
      return { nEmpty: 30, nGold: 8, nFire: 2 };
    case 9:
      return { nEmpty: 34, nGold: 9, nFire: 2 };
    case 10:
    default:
      return { nEmpty: 37, nGold: 10, nFire: 3 };
  }
};

export const getGameCards = (game: Game): Record<number, Card> => game.deck.cards
export const getGameRounds = (game: Game) => game.rounds;
export const getGamePlayers = (game: Game) => game.players;

export const getNumberOfPlayers = createSelector(
  getGamePlayers,
  (players) => Object.keys(players).length
)

export const getCurrentRound = createSelector(
  getGameRounds,
  (rounds) => {
    const currentRound = last(rounds);
  if (currentRound) {
    return currentRound;
  } else {
    throw new Error("No round to get")
  }
  }
)

export const getCurrentRoundTurns = createSelector(
  getCurrentRound,
  (round) => round.turns
)

export const getFlippedCardsInRound = createSelector(
  getCurrentRound,
  getGameCards,
  (currentRound, cards) => findFlippedCardsFromRound(currentRound, cards)
)

export const getIsRoundComplete = createSelector(
  getCurrentRoundTurns,
  getNumberOfPlayers,
  (turns, nPlayers) => turns.length === nPlayers
)

export const getAllFlippedCards = createSelector(
  getGameCards,
  (cards) => Object.values(cards).filter(card => card.isFlipped)
)

export const getFlippedTypeCount = createSelector(
  getAllFlippedCards,
  (cards): CardCount => ({
    nGold: countCardType(cards, CardType.GOLD),
    nFire: countCardType(cards, CardType.FIRE),
    nEmpty: countCardType(cards, CardType.EMPTY),
  })
);

export const getRemainingTypeCount = createSelector(
  getFlippedTypeCount,
  getNumberOfPlayers,
  (flippedCount, nPlayers): CardCount => {
    const total = generateCardCount(nPlayers)
    return {
      nGold: total.nGold - flippedCount.nGold,
      nFire: total.nFire - flippedCount.nFire,
      nEmpty: total.nEmpty - flippedCount.nEmpty,
    };
  }
);

export const getLastTurn = createSelector(
  getGameRounds,
  getCurrentRound,
  (rounds, currentRound) => {
    const isLastTurnInCurrentRound = currentRound.turns.length > 0;
  if (isLastTurnInCurrentRound) {
      return last(currentRound.turns);
    } else if (rounds.length >= 2) {
      const previousRound = rounds[rounds.length - 2];
      return last(previousRound.turns);
    } else {
      // there is no previous turn
      return undefined;
  }
  }
)

export const getKeyholder = createSelector(
  getLastTurn,
  getGamePlayers,
  (lastTurn, players) => {
    const keyholderId = lastTurn
    ? lastTurn.selected.playerId
      // first player by socketId alphabetised (random-esque but stable)
    : Object.keys(players).sort((a, b) => a < b ? -1 : 1)[0];
  return players[keyholderId]
  }
)



export const getPlayerCardsInRound = createSelector(
  getCurrentRound,
  getGameCards,
  (currentRound, cards) => {
    const cardEntries: [string, Card[]][] = Object.entries(currentRound.cardsDealt).map(([playerId, cardIds]) => [
      playerId,
      cardIds.map(cardId => cards[cardId])
    ])
    return Object.fromEntries(cardEntries) as Record<string, Card[]>;
  }
)

export const countCardType = (cards: Card[], cardType: CardType): number => cards.reduce((acc, curr) => curr.type === cardType ? acc + 1 : acc, 0)

export const hasConspiracy = (game: Game) => true;

export const isConspiracyMember = (game: Game, playerId: string) => {
  return hasConspiracy(game) && !isConspiracyVictim(game, playerId);
};

export const isConspiracyVictim = (game: Game, playerId: string): boolean => {
  return hasConspiracy(game) && 'hi' === playerId;
};

export const isNewGame = (game: Game): boolean => {
  return game.rounds.length === 1 && game.rounds[0].turns.length === 0
}

export const isWinner = (game: Game, playerId: string): boolean => {
  if (isConspiracyMember(game, playerId)) {
    return getVote(game, conspiracyVictimId(game)!) === 'hi';
  } else {
    const playerVote = getVote(game, playerId);
    return hasConspiracy(game)
      ? playerVote === 'whatever'
      : playerVote === 'hi';
  }
};

export const getVote = (game: Game, playerId: string): undefined => {
  return undefined;
};

export const hasVoted = (game: Game, playerId: string): boolean =>
  !!getVote(game, playerId);

export const haveAllVoted = (game: Game): boolean =>
  Object.values(game.players).every((player) =>
    hasVoted(game, player.socketId)
  );
