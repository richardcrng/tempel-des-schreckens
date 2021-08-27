import { Socket as TClientSocket } from "socket.io-client";
import { Socket as TServerSocket, Server as TServer } from "socket.io";
import { GameBase, Player } from "./game.types";

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
  ALIAS_SOCKET = "alias-socket",
  CREATE_GAME = "create-game",
  GET_GAME = "get-game",
  GET_PLAYER = "get-player",
  JOIN_GAME = "join",
  FLIP_CARD = "flip-card",
  RESET_GAME = 'reset-game',
  START_GAME = "start-game",
  SHOW_RESULTS = "show-results",
  UPDATE_PLAYER = "update-player",
}

export enum ServerEvent {
  CARD_FLIPPED = 'card-picked',
  GAME_CREATED = "game-created",
  GAME_GOTTEN = "game-gotten",
  GAME_JOINED = "game-joined",
  GAME_NOT_FOUND = "game-not-found",
  GAME_STARTED = 'game-started',
  GAME_UPDATED = "game-updated",
  PLAYER_GOTTEN = "player-gotten",
  PLAYER_NOT_FOUND = "player-not-found",
  PLAYER_UPDATED = "player-updated",
  REDIRECT_TO_LOBBY = "redirect-to-lobby",
  RESULTS_SHOWN = "results-shown",
}

/**
 * Listeners for `ClientEvent`s
 */
export type ClientEventListeners = {
  [ClientEvent.CREATE_GAME]: (e: CreateGameEvent) => void;
  [ClientEvent.FLIP_CARD]: (gameId: string, targetPlayerId: string, cardIdx: string) => void;
  [ClientEvent.GET_GAME]: (gameId: string) => void;
  [ClientEvent.GET_PLAYER]: (
    gameId: string,
    playerId: string,
    aliasIds: string[]
  ) => void;
  [ClientEvent.JOIN_GAME]: (gameId: string, player: Player) => void;
  [ClientEvent.RESET_GAME]: (gameId: string) => void;
  [ClientEvent.SHOW_RESULTS]: (gameId: string) => void;
  [ClientEvent.START_GAME]: (gameId: string,) => void;
  [ClientEvent.UPDATE_PLAYER]: (gameId: string, player: Player) => void;
};

/**
 * Listeners for `ServerEvent`s
 */
export type ServerEventListeners = {
  [ServerEvent.CARD_FLIPPED]: (
    gameId: string,
    targetPlayerId: string,
    cardIdx: string
  ) => void;
  [ServerEvent.GAME_CREATED]: (e: GameCreatedEvent) => void;
  [ServerEvent.GAME_GOTTEN]: (gameId: string, game: GameBase) => void;
  [ServerEvent.GAME_JOINED]: (e: GameJoinedEvent) => void;
  [ServerEvent.GAME_NOT_FOUND]: () => void;
  [ServerEvent.GAME_STARTED]: (gameId: string, game: GameBase) => void;
  [ServerEvent.GAME_UPDATED]: (gameId: string, game: GameBase) => void;
  [ServerEvent.PLAYER_GOTTEN]: (playerId: string, player: Player) => void;
  [ServerEvent.PLAYER_UPDATED]: (playerId: string, player: Player) => void;
  [ServerEvent.PLAYER_NOT_FOUND]: () => void;
  [ServerEvent.REDIRECT_TO_LOBBY]: () => void;
  [ServerEvent.RESULTS_SHOWN]: (gameId: string) => void;
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
