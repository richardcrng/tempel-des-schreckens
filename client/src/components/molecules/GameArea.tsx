import { getKeyholder, getPlayerCardsInRound } from "../../selectors/game";
import { Game, Player } from "../../types/game.types";
import PlayerCards from "./PlayerCards";

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
      <p>
        {isKeyholder
          ? "You have"
          : `${keyholder.name} has`}{" "}
        the key
      </p>
      {Object.entries(otherPlayerCards).map(([playerId, cards]) => (
        <PlayerCards
          key={playerId}
          cards={cards}
          player={game.players[playerId]}
          isKeyholder={keyholder.socketId === playerId}
        />
      ))}
      <hr />
      <PlayerCards cards={ownCards} player={player} isKeyholder={isKeyholder} />
    </>
  );
}

export default GameArea