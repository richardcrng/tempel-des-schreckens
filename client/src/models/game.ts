import { Game, GameBase } from "../types/game.types";

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
  return 'hi';
};

export const conspiracyVictimName = (game: Game): string | undefined => {
  if (hasConspiracy(game)) {
    return 'hi';
  }
};

export const hasConspiracy = (game: Game) => true;

export const isConspiracyMember = (game: Game, playerId: string) => {
  return hasConspiracy(game) && !isConspiracyVictim(game, playerId);
};

export const isConspiracyVictim = (game: Game, playerId: string): boolean => {
  return hasConspiracy(game) && 'hi' === playerId;
};

export const isWinner = (game: Game, playerId: string): boolean => {
  if (isConspiracyMember(game, playerId)) {
    return getVote(game, conspiracyVictimId(game)!) === 'hi';
  } else {
    const playerVote = getVote(game, playerId);
    return hasConspiracy(game)
      ? playerVote === 'whatever'
      : playerVote === 'hi';
  }
};

export const getVote = (game: Game, playerId: string): undefined => {
  return undefined;
};

export const hasVoted = (game: Game, playerId: string): boolean =>
  !!getVote(game, playerId);

export const haveAllVoted = (game: Game): boolean =>
  Object.values(game.players).every((player) =>
    hasVoted(game, player.socketId)
  );
