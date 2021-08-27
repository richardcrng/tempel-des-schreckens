import { Game, GameBase, Vote } from "../types/game.types";

export const gameLobbyReadiness = (
  game: GameBase
): { isReady: true } | { isReady: false; reason: string } => {
  const players = Object.entries(game.players);
  if (players.length < 3) {
    return {
      isReady: false,
      reason: "At least three players are needed",
    };
  } else {
    return { isReady: true };
  }
};

export const conspiracyVictimId = (game: Game): string | null => {
  return game.conspiracyTarget ? game.conspiracyTarget : null;
};

export const conspiracyVictimName = (game: Game): string | undefined => {
  if (hasConspiracy(game)) {
    return game.players[game.conspiracyTarget!].name;
  }
};

export const hasConspiracy = (game: Game) => !!game.conspiracyTarget;

export const isConspiracyMember = (game: Game, playerId: string) => {
  return hasConspiracy(game) && !isConspiracyVictim(game, playerId);
};

export const isConspiracyVictim = (game: Game, playerId: string): boolean => {
  return hasConspiracy(game) && game.conspiracyTarget === playerId;
};

export const isWinner = (game: Game, playerId: string): boolean => {
  if (isConspiracyMember(game, playerId)) {
    return getVote(game, conspiracyVictimId(game)!) === Vote.NO_CONSPIRACY;
  } else {
    const playerVote = getVote(game, playerId);
    return hasConspiracy(game)
      ? playerVote === Vote.CONSPIRACY
      : playerVote === Vote.NO_CONSPIRACY;
  }
};

export const getVote = (game: Game, playerId: string): Vote | undefined => {
  const votes = game.votes || {};
  return votes[playerId];
};

export const hasVoted = (game: Game, playerId: string): boolean =>
  !!getVote(game, playerId);

export const haveAllVoted = (game: Game): boolean =>
  Object.values(game.players).every((player) =>
    hasVoted(game, player.socketId)
  );
