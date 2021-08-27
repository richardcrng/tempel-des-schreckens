import { Card, CardType, Deck } from "../../../client/src/types/game.types";

interface TypeCount {
  gold: number;
  fire: number;
  empty: number;
}

const addCloneOfCards = (cards: Card[], nClones: number, cardToClone: Card): void => {
  for (let i = 0; i < nClones; i++) {
    cards.push({ ...cardToClone })
  }
}

const buildDeckCards = ({ gold, fire, empty }: TypeCount): Deck['cards'] => {
  let cards: Card[] = []
  addCloneOfCards(cards, empty, { type: CardType.EMPTY });
  addCloneOfCards(cards, gold, { type: CardType.GOLD });
  addCloneOfCards(cards, fire, { type: CardType.FIRE });
  return Object.assign({}, cards)
}

export const generateTypeCount = (nPlayers: number): TypeCount => {
  switch (nPlayers) {
    case 3:
      return { empty: 8, gold: 5, fire: 2 };
    case 4:
      return { empty: 12, gold: 6, fire: 2 };
    case 5:
      return { empty: 16, gold: 7, fire: 2 };
    case 6:
      return { empty: 20, gold: 8, fire: 2 };
    case 7:
      return { empty: 26, gold: 7, fire: 2 };
    case 8:
      return { empty: 30, gold: 8, fire: 2 };
    case 9:
      return { empty: 34, gold: 9, fire: 2 };
    case 10:
    default:
      return { empty: 37, gold: 10, fire: 3 };
  }
}

export const generateDeckCards = (nPlayers: number): Deck['cards'] => {
  return buildDeckCards(generateTypeCount(nPlayers))
}