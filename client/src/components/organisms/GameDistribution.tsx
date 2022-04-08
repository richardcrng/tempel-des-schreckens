import { Button } from "semantic-ui-react";
import { Player } from "../../types/game.types";
import RoleOverview from "../molecules/RoleOverview";
import SetupOverview from "../molecules/SetupOverview";

interface Props {
  nPlayers: number;
  onBackToGame: () => void;
  onGameReset(): void;
  player: Player;
}

function GameDistribution({
  nPlayers,
  player,
  onBackToGame,
  onGameReset
}: Props): JSX.Element {
  return (
    <>
      {player.role && <RoleOverview role={player.role} />}
      <SetupOverview nPlayers={nPlayers} />
      <div style={{ width: '100%' }}>
        {player.isHost && (
          <Button fluid color="red" onClick={onGameReset} size='tiny'>
            Reset game
          </Button>
        )}
        <Button fluid primary onClick={onBackToGame} size='massive'>
          Back to game
        </Button>
      </div>
    </>
  );
}

export default GameDistribution;
