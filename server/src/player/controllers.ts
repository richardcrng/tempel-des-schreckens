import {
  ClientEvent,
  ClientEventListeners,
} from "../../../client/src/types/event.types";
import {
  Game,
  GameBase,
  GameStatus,
  Player,
} from "../../../client/src/types/game.types";
import { getGameById } from "../db";
import { GameManager } from "../game/model";
import { getColors } from "../utils";

export const joinPlayerToGame: ClientEventListeners[ClientEvent.JOIN_GAME] = (
  gameId: string,
  playerData: Player
): void => {
  const gameManager = GameManager.for(gameId);
  gameManager.managePlayer(playerData.socketId).set({
    ...playerData,
    gameId,
    colors: getColors(5),
  });
};

export const makeVote = (
  gameId: string,
  playerId: string,
  vote: null
): Game => {
  const game = getGameById(gameId);
  if (game?.status === GameStatus.COMPLETE) return game;
  if (game) {
    if (vote) {
    } else {
    }
    return game;
  } else {
    throw new Error("Couldn't find game");
  }
};

export const updatePlayer: ClientEventListeners[ClientEvent.UPDATE_PLAYER] = (
  gameId,
  updatedPlayer
) => {
  GameManager.for(gameId)
    .managePlayer(updatedPlayer.socketId)
    .update((player) => {
      Object.assign(player, updatedPlayer);
    });
};
