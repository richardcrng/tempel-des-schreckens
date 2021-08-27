import {
  ClientEvent,
  ServerEvent,
  ServerSocket,
  ServerIO,
} from "../../../client/src/types/event.types";
import { getPlayer } from "../db";
import { makeVote, updatePlayer } from "./controllers";
import { haveAllVoted } from "../../../client/src/models/game";
import { GameStatus } from "../../../client/src/types/game.types";

export const addPlayerListeners = (
  socket: ServerSocket,
  io: ServerIO
): void => {
  socket.on(ClientEvent.GET_PLAYER, (gameId, playerId, aliasIds) => {
    const player = getPlayer(gameId, playerId, aliasIds);
    player
      ? socket.emit(ServerEvent.PLAYER_GOTTEN, player.socketId, player)
      : socket.emit(ServerEvent.PLAYER_NOT_FOUND);
  });

  socket.on(ClientEvent.UPDATE_PLAYER, (gameId, playerData) => {
    const [player, game] = updatePlayer(gameId, playerData);
    socket.emit(ServerEvent.PLAYER_UPDATED, player.socketId, player);
    socket.emit(ServerEvent.GAME_UPDATED, game.id, game);
  });
};
