import { Message } from "semantic-ui-react";
import { countCardType, getIsRoundComplete, getKeyholder, getPlayerCardsInRound } from "../../selectors/game";
import { GameOverReason } from "../../types/event.types";
import { Card, CardType, Game, Player } from "../../types/game.types";
import PlayerCards from "../molecules/PlayerCards";

interface Props {
  game: Game;
  gameOverReason?: GameOverReason;
  onCardClick?: (card: Card, idx: number, player: Player) => void;
  player: Player;
}

function GameArea({ game, gameOverReason, player, onCardClick }: Props): JSX.Element {

  const keyholder = getKeyholder(game);

  const isKeyholder = keyholder.socketId === player.socketId

  const handleCardClick = (card: Card, idx: number, player: Player) => {
    if (isKeyholder && onCardClick) {
      onCardClick(card, idx, player)
    }
  }

  const { [player.socketId]: ownCards, ...otherPlayerCards } = getPlayerCardsInRound(game);

  const headlineMessage = gameOverReason
    ? gameOverReason === GameOverReason.ALL_GOLD_FLIPPED
      ? "Adventurers win!"
      : "Guardians win!"
    : isKeyholder
    ? "You have the key."
    : `${keyholder.name} has the key.`;

  const subheadlineMessage = gameOverReason
    ? gameOverReason + '!'
    : getIsRoundComplete(game)
      ? player.isHost
        ? "Please start the next round."
        : "Waiting for host to start the next round."
      : "The round is ongoing.";

  return (
    <>
      <Message info>
        <p><strong>{headlineMessage}</strong></p>
        <p>{subheadlineMessage}</p>
      </Message>
      {Object.entries(otherPlayerCards).map(([playerId, cards]) => (
        <PlayerCards
          key={playerId}
          cards={cards}
          player={game.players[playerId]}
          isKeyholder={keyholder.socketId === playerId}
          onCardClick={handleCardClick}
        />
      ))}
      <hr />
      <p style={{ margin: 0 }}>Your distribution (secret):</p>
      <ul style={{ marginTop: 0 }}>
        <li>{countCardType(ownCards, CardType.GOLD)} gold</li>
        <li>{countCardType(ownCards, CardType.FIRE)} fire</li>
        <li>{countCardType(ownCards, CardType.EMPTY)} empty</li>
      </ul>
      <PlayerCards cards={ownCards} player={player} isKeyholder={isKeyholder} />
    </>
  );
}

export default GameArea