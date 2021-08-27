import { useState } from "react";
import { Button } from "semantic-ui-react";
import useSocketListener from "../../hooks/useSocketListener";
import { useSocket } from "../../socket";
import { ClientEvent, ServerEvent } from "../../types/event.types";
import { Game, Player } from "../../types/game.types";
import GameResults from "../molecules/GameResults";

interface Props {
  game: Game;
  player: Player;
  players: Player[];
}

function GameComplete({ game, player, players }: Props) {
  const socket = useSocket();
  const [showResults, setShowResults] = useState(false);

  useSocketListener(ServerEvent.RESULTS_SHOWN, (gameId) => {
    gameId === game.id && setShowResults(true);
  });

  const handleShowResults = () => {
    socket.emit(ClientEvent.SHOW_RESULTS, game.id);
  };

  const handleResetGame = () => {
    socket.emit(ClientEvent.RESET_GAME, game.id)
  }

  return (
    <>
      <p>Game complete!</p>
      {showResults ? (
        <>
          <GameResults {...{ game, player, players }} />
          {player.isHost && (
            <Button primary onClick={handleResetGame}>
              Reset game
            </Button>
          )}
        </>
      ) : (
        <>
          <p>
            {player.isHost
              ? "Click to show results to all players"
              : "Waiting for host to show results..."}
          </p>
          {player.isHost && (
            <Button primary onClick={handleShowResults}>
              Broadcast results
            </Button>
          )}
        </>
      )}
    </>
  );
}

export default GameComplete;
