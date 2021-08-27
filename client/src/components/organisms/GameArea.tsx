import { Message } from "semantic-ui-react";
import { countCardType, getKeyholder, getPlayerCardsInRound } from "../../selectors/game";
import { Card, CardType, Game, Player } from "../../types/game.types";
import PlayerCards from "../molecules/PlayerCards";

interface Props {
  game: Game;
  onCardClick?: (card: Card, idx: number, player: Player) => void;
  player: Player;
}

function GameArea({ game, player, onCardClick }: Props): JSX.Element {

  const keyholder = getKeyholder(game);

  const isKeyholder = keyholder.socketId === player.socketId

  const handleCardClick = (card: Card, idx: number, player: Player) => {
    if (isKeyholder && onCardClick) {
      onCardClick(card, idx, player)
    }
  }

  const { [player.socketId]: ownCards, ...otherPlayerCards } = getPlayerCardsInRound(game);

  return (
    <>
      <Message info>
        <p>{isKeyholder ? "You have" : `${keyholder.name} has`} the key</p>
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