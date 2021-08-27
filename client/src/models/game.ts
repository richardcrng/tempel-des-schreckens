import { Game, GameBase } from "../types/game.types";

export interface RoleCount {
  nAdventurers: number;
  nGuardians: number;
  isExact: boolean;
}

export interface CardCount {
  nGold: number;
  nFire: number;
  nEmpty: number;
}

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

export const generateRoleCount = (nPlayers: number): RoleCount => {
  switch (nPlayers) {
    case 3:
      return { nAdventurers: 2, nGuardians: 2, isExact: false };
    case 4:
      return { nAdventurers: 3, nGuardians: 2, isExact: false };
    case 5:
      return { nAdventurers: 3, nGuardians: 2, isExact: true };
    case 6:
      return { nAdventurers: 4, nGuardians: 4, isExact: true };
    case 7:
      return { nAdventurers: 5, nGuardians: 3, isExact: false };
    case 8:
      return { nAdventurers: 6, nGuardians: 3, isExact: false };
    case 9:
      return { nAdventurers: 6, nGuardians: 3, isExact: true };
    case 10:
    default:
      return { nAdventurers: 7, nGuardians: 4, isExact: false };
  }
}

export const generateCardCount = (nPlayers: number): CardCount => {
  switch (nPlayers) {
    case 3:
      return { nEmpty: 8, nGold: 5, nFire: 2 };
    case 4:
      return { nEmpty: 12, nGold: 6, nFire: 2 };
    case 5:
      return { nEmpty: 16, nGold: 7, nFire: 2 };
    case 6:
      return { nEmpty: 20, nGold: 8, nFire: 2 };
    case 7:
      return { nEmpty: 26, nGold: 7, nFire: 2 };
    case 8:
      return { nEmpty: 30, nGold: 8, nFire: 2 };
    case 9:
      return { nEmpty: 34, nGold: 9, nFire: 2 };
    case 10:
    default:
      return { nEmpty: 37, nGold: 10, nFire: 3 };
  }
};

export const hasConspiracy = (game: Game) => true;

export const isConspiracyMember = (game: Game, playerId: string) => {
  return hasConspiracy(game) && !isConspiracyVictim(game, playerId);
};

export const isConspiracyVictim = (game: Game, playerId: string): boolean => {
  return hasConspiracy(game) && 'hi' === playerId;
};

export const isNewGame = (game: Game): boolean => {
  return game.rounds.length === 1 && game.rounds[0].turns.length === 0
}

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
