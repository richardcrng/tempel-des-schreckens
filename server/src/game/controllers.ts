import { last } from 'lodash';
import { ClientEvent, ClientEventListeners, CreateGameEvent } from "../../../client/src/types/event.types";
import {
  GameBase,
  GameStatus,
  Round,
  Turn,
} from "../../../client/src/types/game.types";
import { games } from "../db";
import { generateRandomGameId, getColors } from "../utils";
import { GameManager } from './model';
import { createRoleAssignment, dealCardsToPlayers, generateDeck, getCardIdsToDeal } from "./utils";

export const createGame = (data: CreateGameEvent): GameBase => {
  const gameId = generateRandomGameId();
  const game: GameBase = {
    id: gameId,
    players: {
      [data.socketId]: {
        name: data.playerName,
        socketId: data.socketId,
        isHost: true,
        gameId,
        colors: getColors(5)
      },
    },
    status: GameStatus.LOBBY,
    deck: {
      cards: {},
    },
    rounds: []
  };
  games[gameId] = game;
  return game;
};

/**
 * @returns the number of turns
 */
export const flipCard: ClientEventListeners[ClientEvent.FLIP_CARD] = (gameId, keyholderId, targetPlayerId, cardIdx, card) => {
  const gameManager = GameManager.for(gameId);
  gameManager.update((game) => {
    const currentRound = last(game.rounds)!;
    const turnCreated: Turn = {
      keyholderId,
      selected: {
        playerId: targetPlayerId,
        cardIdx,
      },
      flip: card.type,
    };
    currentRound.turns.push(turnCreated);
    const cardToFlip = game.deck.cards[card.id];
    cardToFlip.isFlipped = true;
  })
  gameManager.handlePossibleEnd();
}

export const nextRound: ClientEventListeners[ClientEvent.NEXT_ROUND] = (gameId) => {
  GameManager.for(gameId).dealNextRound();
}

export const resetGame: ClientEventListeners[ClientEvent.RESET_GAME] = (gameId) => {
  GameManager.for(gameId).resetGame();
}

export const startGame: ClientEventListeners[ClientEvent.START_GAME] = (
  gameId: string,
) => {
  const gameManager = GameManager.for(gameId);

  // initial setup
  gameManager.update((game) => {
    game.status = GameStatus.ONGOING;
    game.deck = generateDeck(Object.keys(game.players).length);
    const firstRound: Round = {
      number: 1,
      turns: [],
      cardsDealt: dealCardsToPlayers(
        getCardIdsToDeal(game.deck),
        Object.keys(game.players)
      ),
    };
    game.rounds.push(firstRound);
    const roleAssignment = createRoleAssignment(Object.keys(game.players));
    gameManager.updateEachPlayer((player) => {
      player.role = roleAssignment[player.socketId];
    });
  })
};
