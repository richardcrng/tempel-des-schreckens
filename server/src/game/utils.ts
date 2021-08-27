import { shuffle } from 'lodash';
import { generateCardCount, CardCount } from '../../../client/src/models/game';
import { Card, CardType, Deck, Round } from "../../../client/src/types/game.types";

const addCloneOfCards = (cards: Card[], nClones: number, cardToClone: Omit<Card, 'id'>, startId: number): void => {
  for (let i = 0; i < nClones; i++) {
    cards.push({ ...cardToClone, id: startId + i })
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