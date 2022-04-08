import {
  ClientEvent,
  ClientEventListeners,
} from "../../../client/src/types/event.types";
import { Player } from "../../../client/src/types/game.types";
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
