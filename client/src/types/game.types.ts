export enum GameStatus {
  LOBBY = "LOBBY",
  ONGOING = "ONGOING",
  COMPLETE = "COMPLETE",
}

export enum CardType {
  GOLD = "gold",
  FIRE = "fire",
  EMPTY = "empty",
}

export enum Role {
  ADVENTURER = "ADVENTURER",
  GUARDIAN = "GUARDIAN",
}

export interface Card {
  /** If not present, then the card has not been dealt (and is stacked) */
  holdingPlayerId?: string;
  id: number;
  isFlipped?: boolean;
  isStacked?: boolean;
  type: CardType;
}

export interface Deck {
  /** Cards keyed by a unique card id */
  cards: Record<number, Card>;
  // /** Array of card ids */
  // dealt: string[];
  // /** Array of card ids */
  // stacked: number[];
}

export interface Player {
  socketId: string;
  gameId?: string;
  name?: string;
  isHost?: boolean;
  role?: Role;
  colors?: string[];
}

export interface Turn {
  keyholderId: string;
  selected: {
    playerId: string;
    cardIdx: number;
  };
  flip: CardType;
}

export interface Round {
  number: 1 | 2 | 3 | 4;
  cardsDealt: {
    /** Card ids dealt to each player */
    [playerId: string]: number[];
  };
  turns: Turn[];
}

export type Game = GameBase | GameInLobby | GameOngoing | GameComplete;

export interface GameBase {
  id: string;
  players: {
    [playerSocketId: string]: Player;
  };
  deck: Deck;
  rounds: Round[];
  status: GameStatus;
  /** If the first keyholder needs to be controlled, e.g. from a previous game */
  firstKeyholderId?: string;
}

export interface GameInLobby extends GameBase {
  status: GameStatus.LOBBY;
}

export interface GameOngoing extends GameBase {
  status: GameStatus.ONGOING;
}

export interface GameComplete extends GameBase {
  status: GameStatus.COMPLETE;
}
