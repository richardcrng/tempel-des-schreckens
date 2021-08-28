import { Button } from "semantic-ui-react";
import { Player } from "../../types/game.types";
import RoleOverview from "../molecules/RoleOverview";
import SetupOverview from "../molecules/SetupOverview";


interface Props {
  nPlayers: number;
  onBackToGame: () => void;
  player: Player;
}

function GameDistribution({ nPlayers, player, onBackToGame }: Props): JSX.Element {
  return (
    <>
      {player.role && (
        <RoleOverview role={player.role} />
      )}
      <SetupOverview nPlayers={nPlayers} />
      <Button fluid primary onClick={onBackToGame}>
        Back to game
      </Button>
    </>
  );
}

export default GameDistribution