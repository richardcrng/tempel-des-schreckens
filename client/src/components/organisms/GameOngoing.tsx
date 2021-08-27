import { useState } from "react";
import { Button, Table } from "semantic-ui-react";
import {
  conspiracyVictimName,
  getVote,
  hasVoted,
  isConspiracyMember,
  isNewGame,
} from "../../selectors/game";
import { Game, Player } from "../../types/game.types";
import PlayerList from "../atoms/PlayerList";
import GameArea from "../molecules/GameArea";
import RoleOverview from "../molecules/RoleOverview";
import SetupOverview from "../molecules/SetupOverview";

interface Props {
  game: Game;
  player: Player;
  handleVote(vote: null): void;
}

enum SectionView {
  DISTRIBUTION = 'distribution',
  GAME_STATS = 'game-stats',
  MAIN_GAME = 'main-game'
}

function GameOngoing({ game, player, handleVote }: Props) {
  const [view, setView] = useState<SectionView>(SectionView.DISTRIBUTION)

  if (view === SectionView.DISTRIBUTION) {
    return (
      <>
        {player.role && <RoleOverview role={player.role} style={{ marginBottom: '20px' }} />}
        <SetupOverview nPlayers={Object.keys(game.players).length} />
        <Button
          primary
          onClick={() => setView(SectionView.MAIN_GAME)}
        >
          Back to game
        </Button>
      </>
    );
  }
  
  if (view === SectionView.GAME_STATS) {
    return <p>wip here</p>
  }

  return (
    <>
      <GameArea game={game} player={player} />
    </>
  );
}

export default GameOngoing;
