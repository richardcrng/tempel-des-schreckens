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

  return (
    <>
      <p>
        {isKeyholder
          ? "You have"
          : `${keyholder.name} has`}{" "}
        the key
      </p>
      {Object.entries(getPlayerCardsInRound(game)).map(([playerId, cards]) => (
        <PlayerCards
          key={playerId}
          cards={cards}
          player={game.players[playerId]}
          isKeyholder={keyholder.socketId === playerId}
        />
      ))}
    </>
  );
}

export default GameArea