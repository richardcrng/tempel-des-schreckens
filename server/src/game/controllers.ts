import { last } from "lodash";
import {
  ClientEvent,
  ClientEventListeners,
  ServerEvent,
} from "../../../client/src/types/event.types";
import { GameStatus, Round, Turn } from "../../../client/src/types/game.types";
import { GameManager } from "./model";
import {
  createRoleAssignment,
  dealCardsToPlayers,
  generateDeck,
  getCardIdsToDeal,
} from "./utils";

/**
 * @returns the number of turns
 */
export const flipCard: ClientEventListeners[ClientEvent.FLIP_CARD] = (
  gameId,
  keyholderId,
  targetPlayerId,
  cardIdx,
  card
) => {
  const gameManager = GameManager.for(gameId);
  gameManager.update((game) => {
    const turnCreated: Turn = {
      keyholderId,
      selected: {
        playerId: targetPlayerId,
        cardIdx,
      },
      flip: card.type,
    };
    last(game.rounds)?.turns.push(turnCreated);
    const cardToFlip = game.deck.cards[card.id];
    cardToFlip.isFlipped = true;
  });
  gameManager.io.emit(
    ServerEvent.CARD_FLIPPED,
    gameId,
    keyholderId,
    targetPlayerId,
    cardIdx,
    card
  );
  gameManager.handlePossibleEnd();
};

export const kickPlayer: ClientEventListeners[ClientEvent.KICK_PLAYER] = (
  gameId,
  playerIdToKick
) => {
  const gameManager = GameManager.for(gameId);
  gameManager.io.emit(ServerEvent.PLAYER_KICKED, gameId, playerIdToKick);
  gameManager.update((game) => {
    delete game.players[playerIdToKick];
  });
};

export const nextRound: ClientEventListeners[ClientEvent.NEXT_ROUND] = (
  gameId
) => {
  GameManager.for(gameId).dealNextRound();
};

export const resetGame: ClientEventListeners[ClientEvent.RESET_GAME] = (
  gameId
) => {
  GameManager.for(gameId).resetGame();
};

export const startGame: ClientEventListeners[ClientEvent.START_GAME] = (
  gameId: string
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
  });
};
