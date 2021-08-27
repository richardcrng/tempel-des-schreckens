/* eslint-disable jsx-a11y/anchor-is-valid */

import { useCopyToClipboard } from "react-use";
import { Button } from "semantic-ui-react";
import { gameLobbyReadiness } from "../../models/game";
import { GameBase, Player } from "../../types/game.types";
import PlayerList from "../atoms/PlayerList";

interface Props {
  game: GameBase;
  handleStartGame(): void;
  players: Player[];
  player: Player;
}

function GameLobby({ game, handleStartGame, players, player }: Props) {
  const readiness = gameLobbyReadiness(game);
  // eslint-disable-next-line
  const [_, copyToClipboard] = useCopyToClipboard();

  const disableStart = !readiness.isReady;

  return (
    <>
      <h1>Game id: {game.id}</h1>
      <a
        onClick={(e) => {
          e.preventDefault();
          copyToClipboard(window.location.href);
          window.alert(`Copied to clipboard: ${window.location.href}`);
        }}
        href="#"
      >
        Copy game join link
      </a>
      <PlayerList players={players} ownPlayerId={player.socketId} />
      {player.isHost ? (
        <>
          <Button
            primary
            disabled={disableStart}
            onClick={() => {
              handleStartGame();
            }}
          >
            Start game
          </Button>
        </>
      ) : (
        <p>Waiting for the host to start the game</p>
      )}
      {!readiness.isReady && (
        <p>The game cannot yet be started: {readiness.reason}</p>
      )}
    </>
  );
}

export default GameLobby;
