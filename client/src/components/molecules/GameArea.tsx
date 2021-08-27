import { getKeyholder } from "../../models/game";
import { Game, Player } from "../../types/game.types";

interface Props {
  game: Game;
  player: Player;
}

function GameArea({ game, player }: Props): JSX.Element {
  const keyholder = getKeyholder(game);

  return (
    <p>{keyholder.socketId === player.socketId ? 'You have' : `${keyholder.name} has`} the key</p>
  )
}

export default GameArea