import { shuffle } from 'lodash';
import { generateCardCount, CardCount, generateRoleCount } from '../../../client/src/selectors/game';
import { Card, CardType, Deck, Game, Role, Round } from "../../../client/src/types/game.types";

const addCloneOfCards = (cards: Card[], nClones: number, cardToClone: Omit<Card, 'id'>, startId: number): void => {
  for (let i = 0; i < nClones; i++) {
    cards.push({ ...cardToClone, id: startId + i })
  }
}

export const assignRoles = (players: Game['players']): void => {
  const shuffledPlayerIds = shuffle(Object.keys(players));
  const nPlayers = shuffledPlayerIds.length;

  const { nAdventurers, isExact } = generateRoleCount(nPlayers);

  const nAdventurersDealt = isExact
    ? nAdventurers
    : Math.random() < 0.5 ? nAdventurers - 1 : nAdventurers;
  
  for (let i = 0; i < nPlayers; i++) {
    const playerBeingAssigned = shuffledPlayerIds[i];
    players[playerBeingAssigned].role = i < nAdventurersDealt
      ? Role.ADVENTURER
      : Role.GUARDIAN;
  }
}

const buildDeckCards = ({ nGold, nFire, nEmpty }: CardCount): Deck['cards'] => {
  let cards: Card[] = []
  addCloneOfCards(cards, nEmpty, { type: CardType.EMPTY }, 0);
  addCloneOfCards(cards, nGold, { type: CardType.GOLD }, nEmpty);
  addCloneOfCards(cards, nFire, { type: CardType.FIRE }, nEmpty + nGold);
  return Object.assign({}, cards)
}

export const dealCardsToPlayers = (cardIds: number[], playerIds: string[]): Round['cardsDealt'] => {
  const cardsPerPlayer = cardIds.length / playerIds.length;
  const remainingCardsToDeal = shuffle(cardIds);
  const cardsDealt: Round['cardsDealt'] = {};
  for (let playerId of playerIds) {
    cardsDealt[playerId] = [];
    for (let i = 0; i < cardsPerPlayer; i++) {
      cardsDealt[playerId].push(remainingCardsToDeal.shift()!);
    }
  }
  return cardsDealt
}

export const generateDeck = (nPlayers: number): Deck => {
  return {
    cards: generateDeckCards(nPlayers)
  }
}

const generateDeckCards = (nPlayers: number): Deck["cards"] => {
  return buildDeckCards(generateCardCount(nPlayers));
};

export const getCardIdsToDeal = (deck: Deck): number[] => {
  const unStackedCards = Object.values(deck.cards).filter(card => !card.isStacked);
  return unStackedCards.map(card => card.id)
}

export const stackFlippedCards = (deck: Deck): Deck => {
  for (let cardId in deck.cards) {
    if (
      deck.cards[cardId].isFlipped &&
      !deck.cards[cardId].isStacked
    ) {
      deck.cards[cardId].isStacked = true;
    }
  }
  return deck;
}