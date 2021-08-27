import {
  Game,
  GameBase,
  GameStatus,
  Player,
  Vote,
} from "../../../client/src/types/game.types";
import { getGameById, getPlayer } from "../db";

export const joinPlayerToGame = (
  gameId: string,
  playerData: Player
): [Player, GameBase] => {
  const game = getGameById(gameId);
  if (game) {
    const player: Player = {
      ...playerData,
      gameId,
    };
    game.players[playerData.socketId] = player;
    return [player, game];
  } else {
    throw new Error("Couldn't find game to join");
  }
};

export const makeVote = (
  gameId: string,
  playerId: string,
  vote: Vote | null
): Game => {
  const game = getGameById(gameId);
  if (game?.status === GameStatus.COMPLETE) return game;
  if (game) {
    game.votes ||= {};
    if (vote) {
      game.votes[playerId] = vote;
    } else {
      delete game.votes[playerId];
    }
    return game;
  } else {
    throw new Error("Couldn't find game");
  }
};

export const updatePlayer = (
  gameId: string,
  playerData: Player
): [Player, GameBase] => {
  const game = getGameById(gameId);
  const extantPlayer = game?.players[playerData.socketId];
  if (game && extantPlayer) {
    const resultantPlayer = Object.assign(extantPlayer, playerData);
    game.players[playerData.socketId] = resultantPlayer;
    return [resultantPlayer, game];
  } else {
    throw new Error("Couldn't update player");
  }
};
