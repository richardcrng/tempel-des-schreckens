export enum GameStatus {
  LOBBY = "lobby",
  STARTED = "started",
  COMPLETE = "complete",
}

export interface Player {
  socketId: string;
  gameId?: string;
  name?: string;
  isHost?: boolean;
}

export type Game = GameBase | GameInLobby | GameOngoing;

export type GameOngoing = GameConspiracyOngoing | GameNoConspiracyOngoing;

export enum Vote {
  CONSPIRACY = "conspiracy",
  NO_CONSPIRACY = "no conspiracy",
}

export interface GameBase {
  id: string;
  players: {
    [playerName: string]: Player;
  };
  status: GameStatus;
  conspiracyTarget?: Player["name"] | null;
  votes?: { [K in keyof GameBase["players"]]: Vote };
}

export interface GameInLobby extends GameBase {
  status: GameStatus.LOBBY;
  conspiracyTarget: never;
  votes: never;
}

export interface GameNoConspiracyOngoing extends GameBase {
  conspiracyTarget: null;
  status: GameStatus.STARTED;
}

export interface GameConspiracyOngoing extends GameBase {
  conspiracyTarget: Player["name"];
  status: GameStatus.STARTED;
}

export interface OngoingGame extends GameBase {
  status: GameStatus.STARTED;
  conspiracyTarget: Player["name"] | null;
  votes: { [K in keyof GameBase["players"]]: Vote };
}
