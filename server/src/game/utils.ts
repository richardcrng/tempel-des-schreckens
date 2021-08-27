import { shuffle } from 'lodash';
import { Card, CardType, Deck, Round } from "../../../client/src/types/game.types";

interface TypeCount {
  nGold: number;
  nFire: number;
  nEmpty: number;
}

const addCloneOfCards = (cards: Card[], nClones: number, cardToClone: Omit<Card, 'id'>, startId: number): void => {
  for (let i = 0; i < nClones; i++) {
    cards.push({ ...cardToClone, id: startId + i })
  }
}

const buildDeckCards = ({ nGold, nFire, nEmpty }: TypeCount): Deck['cards'] => {
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
  return buildDeckCards(generateTypeCount(nPlayers));
};

export const generateTypeCount = (nPlayers: number): TypeCount => {
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
}

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