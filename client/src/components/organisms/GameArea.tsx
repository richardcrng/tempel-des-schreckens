import { Message } from "semantic-ui-react";
import {
  getIsRoundComplete,
  getKeyholder,
  getNumberOfCardsLeftToFlipInRound,
  getNumberOfSubsequentRounds,
  getPlayerCardsInRound,
  getRemainingTypeCount,
} from "../../selectors/game";
import { GameOverReason } from "../../types/event.types";
import { Card, Game, Player } from "../../types/game.types";
import PlayerCards from "../molecules/PlayerCards";

interface Props {
  game: Game;
  gameOverReason?: GameOverReason;
  onCardClick?: (card: Card, idx: number, player: Player) => void;
  player: Player;
}

function GameArea({
  game,
  gameOverReason,
  player,
  onCardClick,
}: Props): JSX.Element {
  const keyholder = getKeyholder(game);

  const isKeyholder = keyholder.socketId === player.socketId;

  const handleCardClick = (card: Card, idx: number, player: Player) => {
    if (isKeyholder && onCardClick && !gameOverReason) {
      onCardClick(card, idx, player);
    }
  };

  const { [player.socketId]: ownCards, ...otherPlayerCards } =
    getPlayerCardsInRound(game);

  const nRemainingRounds = getNumberOfSubsequentRounds(game);
  const roundsRemainingMessage =
    nRemainingRounds === 1 ? (
      <>
        <strong>1 round</strong> after this one
      </>
    ) : (
      <>
        <strong>{nRemainingRounds} rounds</strong> after this one
      </>
    );

  const cardsLeftToFlip = getNumberOfCardsLeftToFlipInRound(game);
  const { nGold, nFire } = getRemainingTypeCount(game);

  const headlineMessage = gameOverReason
    ? gameOverReason === GameOverReason.ALL_GOLD_FLIPPED
      ? "Adventurers win!"
      : "Guardians win!"
    : isKeyholder
    ? "You have the key."
    : `${keyholder.name} has the key.`;

  const subheadlineMessage = gameOverReason ? (
    gameOverReason + "!"
  ) : getIsRoundComplete(game) ? (
    player.isHost ? (
      "Please start the next round."
    ) : (
      "Waiting for host to start the next round."
    )
  ) : (
    <>
      <strong>
        {cardsLeftToFlip} flip{cardsLeftToFlip === 1 ? "" : "s"}
      </strong>{" "}
      left this round, {roundsRemainingMessage}.
    </>
  );

  return (
    <>
      <div style={{ width: "100%", paddingBottom: "5px" }}>
        <Message info>
          <p>
            <strong>{headlineMessage}</strong>
          </p>
          <p style={{ marginBottom: 0 }}>{subheadlineMessage}</p>
          {!gameOverReason && (
            <p style={{ marginTop: 0 }}>
              Still hidden: <strong>{nGold} gold</strong> and{" "}
              <strong>{nFire} fire</strong>.
            </p>
          )}
        </Message>
      </div>
      <div style={{ width: "100%", overflowY: "scroll" }}>
        {Object.entries(otherPlayerCards).map(([playerId, cards]) => (
          <PlayerCards
            key={playerId}
            cards={cards}
            player={game.players[playerId]}
            isKeyholder={keyholder.socketId === playerId}
            onCardClick={handleCardClick}
          />
        ))}
      </div>
    </>
  );
}

export default GameArea;
