export enum GameStatus {
  LOBBY = "LOBBY",
  ONGOING = "ONGOING",
  COMPLETE = "COMPLETE",
}

export enum CardType {
  GOLD = 'GOLD',
  FIRE = 'FIRE',
  EMPTY = 'EMPTY'
}

export enum Role {
  ADVENTURER = 'ADVENTURER',
  GUARDIAN = 'GUARDIAN'
}

export interface Card {
  /** If not present, then the card has not been dealt (and is stacked) */
  holdingPlayerId?: string;
  isFlipped: boolean;
  type: CardType;
}

export interface Deck {
  /** Cards keyed by a unique card id */
  cards: Record<string, Card>;
  /** Array of card ids */
  dealt: string[];
  /** Array of card ids */
  stacked: string[];
}

export interface Player {
  socketId: string;
  gameId?: string;
  name?: string;
  isHost?: boolean;
  role?: Role;
  cardIds?: string[];
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
  turns: Turn[];
}

export type Game = GameBase | GameInLobby | GameOngoing | GameComplete;

export interface GameBase {
  id: string;
  players: {
    [playerName: string]: Player;
  };
  deck: Deck;
  status: GameStatus;
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