import { sample } from "lodash";
import { CreateGameEvent } from "../../../client/src/types/event.types";
import {
  Game,
  GameBase,
  GameStatus,
} from "../../../client/src/types/game.types";
import { games, getGameById } from "../db";
import { generateRandomGameId } from "../utils";

const generateConspiracyState = (
  game: Game,
  customProbability?: number
): void => {
  const players = Object.values(game.players);
  const nPlayers = players.length;
  const probabilityOfConspiracy =
    customProbability ?? nPlayers / (nPlayers + 1);
  const isConspiracy = Math.random() < probabilityOfConspiracy;
  if (isConspiracy) {
    const conspiracyTarget = sample(players)!;
  } else {
  }
};

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
      dealt: [],
      stacked: []
    }
  };
  games[gameId] = game;
  return game;
};

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
  customProbability?: number
): GameBase => {
  const game = getGameById(gameId);
  if (game) {
    game.status = GameStatus.ONGOING;
    generateConspiracyState(game, customProbability);
    return game;
  } else {
    throw new Error("Couldn't find game");
  }
};
