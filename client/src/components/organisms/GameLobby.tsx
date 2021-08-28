/* eslint-disable jsx-a11y/anchor-is-valid */

import { useCopyToClipboard } from "react-use";
import { Button } from "semantic-ui-react";
import { gameLobbyReadiness } from "../../selectors/game";
import { GameBase, Player } from "../../types/game.types";
import PlayerList from "../atoms/PlayerList";
import PlayerAvatar from "../atoms/PlayerAvatar";

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
    <div
      className="active-contents flex-center"
      style={{ justifyContent: "space-between", width: "100%" }}
    >
      <div style={{ width: "100%" }}>
        <h1 style={{ textAlign: "center" }}>Game id: {game.id}</h1>
        <a
          onClick={(e) => {
            e.preventDefault();
            copyToClipboard(window.location.href);
            window.alert(`Copied to clipboard: ${window.location.href}`);
          }}
          href="#"
          style={{ display: "block", textAlign: "center" }}
        >
          Copy game join link
        </a>
        <PlayerList
          players={players}
          ownPlayerId={player.socketId}
          listParent={({ children }) => (
            <ol style={{ listStyle: "none", paddingInlineStart: "20px" }}>
              {children}
            </ol>
          )}
          renderPlayer={(player, idx, ownPlayerId) => {
            return (
              <div
                key={player.socketId}
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1.2rem",
                  paddingBottom: "10px",
                }}
              >
                <span style={{ marginRight: "10px" }}>{idx + 1}.</span>
                <PlayerAvatar player={player} size={32} />
                <p style={{ marginLeft: "10px" }}>
                  {player.name}
                  {player.socketId === ownPlayerId && " (you)"}
                  {player.isHost && " (host)"}
                </p>
              </div>
            );
          }}
        />
      </div>
      <div style={{ width: "100%" }}>
        {!readiness.isReady && (
          <p>
            The game cannot yet be started: {readiness.reason.toLowerCase()}
          </p>
        )}
        {player.isHost ? (
          <>
            <Button
              fluid
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
      </div>
    </div>
  );
}

export default GameLobby;
