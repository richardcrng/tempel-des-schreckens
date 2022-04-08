import { Socket as TClientSocket } from "socket.io-client";
import { Socket as TServerSocket, Server as TServer } from "socket.io";
import { Card, GameBase, Player } from "./game.types";

export type ClientSocket = TClientSocket<
  ServerEventListeners,
  ClientEventListeners
>;

export type ServerSocket = TServerSocket<
  ClientEventListeners,
  ServerEventListeners
>;

export type ServerIO = TServer<ClientEventListeners, ServerEventListeners>;

export enum ClientEvent {
  CREATE_GAME = "create-game",
  GET_GAME = "get-game",
  GET_PLAYER = "get-player",
  JOIN_GAME = "join",
  FLIP_CARD = "flip-card",
  KICK_PLAYER = "kick-player",
  NEXT_ROUND = "next-round",
  RESET_GAME = "reset-game",
  START_GAME = "start-game",
  UPDATE_PLAYER = "update-player",
}

export enum ServerEvent {
  CARD_FLIPPED = "card-picked",
  GAME_CREATED = "game-created",
  GAME_GOTTEN = "game-gotten",
  GAME_JOINED = "game-joined",
  GAME_NOT_FOUND = "game-not-found",
  GAME_OVER = "game-over",
  GAME_STARTED = "game-started",
  GAME_UPDATED = "game-updated",
  PLAYER_GOTTEN = "player-gotten",
  PLAYER_KICKED = 'player-kicked',
  PLAYER_NOT_FOUND = "player-not-found",
  PLAYER_UPDATED = "player-updated",
  REDIRECT_TO_LOBBY = "redirect-to-lobby",
  RESULTS_SHOWN = "results-shown",
  ROUND_STARTED = "round-started",
}

export enum GameOverReason {
  ALL_GOLD_FLIPPED = "The adventurers found all the gold",
  ALL_FIRE_FLIPPED = "The adventurers ran into all the fire",
  ALL_ROUNDS_FINISHED = "The adventurers lost on time",
}

/**
 * Listeners for `ClientEvent`s
 */
export type ClientEventListeners = {
  [ClientEvent.CREATE_GAME]: (e: CreateGameEvent) => void;
  [ClientEvent.FLIP_CARD]: (
    gameId: string,
    keyholderId: string,
    targetPlayerId: string,
    cardIdx: number,
    card: Card
  ) => void;
  [ClientEvent.GET_GAME]: (gameId: string) => void;
  [ClientEvent.GET_PLAYER]: (
    gameId: string,
    playerId: string,
    aliasIds: string[]
  ) => void;
  [ClientEvent.JOIN_GAME]: (gameId: string, player: Player) => void;
  [ClientEvent.KICK_PLAYER]: (gameId: string, playerIdToKick: string) => void;
  [ClientEvent.NEXT_ROUND]: (gameId: string) => void;
  [ClientEvent.RESET_GAME]: (gameId: string) => void;
  [ClientEvent.START_GAME]: (gameId: string) => void;
  [ClientEvent.UPDATE_PLAYER]: (gameId: string, player: Player) => void;
};

/**
 * Listeners for `ServerEvent`s
 */
export type ServerEventListeners = {
  [ServerEvent.CARD_FLIPPED]: (
    gameId: string,
    keyholderId: string,
    targetPlayerId: string,
    cardIdx: number,
    card: Card
  ) => void;
  [ServerEvent.GAME_CREATED]: (e: GameCreatedEvent) => void;
  [ServerEvent.GAME_OVER]: (
    gameId: string,
    reason: GameOverReason,
    game: GameBase
  ) => void;
  [ServerEvent.GAME_GOTTEN]: (gameId: string, game: GameBase) => void;
  [ServerEvent.GAME_JOINED]: (e: GameJoinedEvent) => void;
  [ServerEvent.GAME_NOT_FOUND]: () => void;
  [ServerEvent.GAME_STARTED]: (gameId: string, game: GameBase) => void;
  [ServerEvent.GAME_UPDATED]: (gameId: string, game: GameBase) => void;
  [ServerEvent.PLAYER_GOTTEN]: (playerId: string, player: Player) => void;
  [ServerEvent.PLAYER_KICKED]: (gameId: string, kickedPlayerId: string) => void;
  [ServerEvent.PLAYER_UPDATED]: (playerId: string, player: Player) => void;
  [ServerEvent.PLAYER_NOT_FOUND]: () => void;
  [ServerEvent.REDIRECT_TO_LOBBY]: () => void;
  [ServerEvent.RESULTS_SHOWN]: (gameId: string) => void;
  [ServerEvent.ROUND_STARTED]: (gameId: string) => void;
};

export interface GameCreatedEvent extends GameBase {}

export interface CreateGameEvent {
  playerName?: string;
  socketId: string;
}

export interface JoinGameEvent {
  playerName: string;
  socketId: string;
  gameId: GameBase["id"];
}

export interface GameJoinedEvent {
  game: GameBase;
}
