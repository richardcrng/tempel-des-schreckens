import { Message } from "semantic-ui-react";
import { countCardType, getKeyholder, getPlayerCardsInRound } from "../../selectors/game";
import { CardType, Game, Player } from "../../types/game.types";
import PlayerCards from "./PlayerCards";
import { CardOverview } from "./SetupOverview";

interface Props {
  game: Game;
  player: Player;
}

function GameArea({ game, player }: Props): JSX.Element {
  const keyholder = getKeyholder(game);

  const isKeyholder = keyholder.socketId === player.socketId;

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