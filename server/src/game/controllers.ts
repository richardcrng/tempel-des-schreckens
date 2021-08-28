import { last } from 'lodash';
import randomColor from 'randomColor';
import { CreateGameEvent } from "../../../client/src/types/event.types";
import {
  Card,
  Game,
  GameBase,
  GameStatus,
  Round,
  Turn,
} from "../../../client/src/types/game.types";
import { games, getGameById } from "../db";
import { generateRandomGameId } from "../utils";
import { assignRoles, dealCardsToPlayers, generateDeck, getCardIdsToDeal, stackFlippedCards } from "./utils";

export const createGame = (data: CreateGameEvent): GameBase => {
  const gameId = generateRandomGameId();
  const game: GameBase = {
    id: gameId,
    players: {
      [data.socketId]: {
        name: data.playerName,
        socketId: data.socketId,
        isHost: true,
        gameId,
        colors: randomColor({ count: 5 })
      },
    },
    status: GameStatus.LOBBY,
    deck: {
      cards: {},
    },
    rounds: []
  };
  games[gameId] = game;
  return game;
};

export const dealCards = (game: GameBase): void => {
  const nextRoundNumber = game.rounds.length + 1 as Round['number'];
  // stack all flipped cards
  game.deck = stackFlippedCards(game.deck);
  const nextRound: Round = {
    number: nextRoundNumber,
    turns: [],
    cardsDealt: dealCardsToPlayers(getCardIdsToDeal(game.deck), Object.keys(game.players))
  }
  game.rounds.push(nextRound);
}

/**
 * @returns the number of turns
 */
export const flipCard = (game: Game, { card, cardIdx, keyholderId, playerId }: { card: Card, cardIdx: number, keyholderId: string, playerId: string }): number => {
  const currentRound = last(game.rounds)!;
  const turnCreated: Turn = {
    keyholderId,
    selected: {
      playerId,
      cardIdx
    },
    flip: card.type
  }
  currentRound.turns.push(turnCreated);
  const cardToFlip = game.deck.cards[card.id];
  cardToFlip.isFlipped = true;
  return currentRound.turns.length
}

export const resetGame = (gameId: string): GameBase => {
  const game = getGameById(gameId);
  if (game) {
    game.status = GameStatus.LOBBY;
    game.deck.cards = {};
    game.rounds = [];
    return game
  } else {
    throw new Error("Couldn't find game")
  }
}

export const startGame = (
  gameId: string,
): GameBase => {
  const game = getGameById(gameId);
  if (game) {
    game.status = GameStatus.ONGOING;
    assignRoles(game.players);
    game.deck = generateDeck(Object.keys(game.players).length)
    dealCards(game);
    return game;
  } else {
    throw new Error("Couldn't find game");
  }
};
