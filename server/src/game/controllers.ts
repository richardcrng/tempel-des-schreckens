import { sample } from "lodash";
import { CreateGameEvent } from "../../../client/src/types/event.types";
import {
  Game,
  GameBase,
  GameStatus,
  Round,
} from "../../../client/src/types/game.types";
import { games, getGameById } from "../db";
import { generateRandomGameId } from "../utils";
import { dealCardsToPlayers, generateDeck, getCardIdsToDeal, stackFlippedCards } from "./utils";

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

export const dealCards = (game: GameBase): GameBase => {
  const nextRoundNumber = game.rounds.length + 1 as Round['number'];
  // stack all flipped cards
  game.deck = stackFlippedCards(game.deck);
  const nextRound: Round = {
    number: nextRoundNumber,
    turns: [],
    cardsDealt: dealCardsToPlayers(getCardIdsToDeal(game.deck), Object.keys(game.players))
  }
  game.rounds.push(nextRound);
  return game
}

export const resetGame = (gameId: string): GameBase => {
  const game = getGameById(gameId);
  if (game) {
    game.status = GameStatus.LOBBY;
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
    game.deck = generateDeck(Object.keys(game.players).length)
    return game;
  } else {
    throw new Error("Couldn't find game");
  }
};
