import { GameBase, Player } from "../../client/src/types/game.types";

export const games: Record<GameBase["id"], GameBase> = {};
// export const players: Record<Socket["id"], Player> = {};

export const getGames = () => games;

export const getGameById = (gameId: GameBase["id"]): GameBase | undefined => {
  return getGames()[gameId];
};

export const getPlayer = (
  gameId: string,
  playerId: string,
  aliasIds: string[]
): Player | undefined => {
  const game = getGameById(gameId);
  if (!game) return;

  const { players } = game;
  const immediateMatch = players[playerId];
  if (immediateMatch) return immediateMatch;

  const matchingAlias = Object.values(players).find((player) =>
    aliasIds.includes(player.socketId)
  );
  return matchingAlias;
};
