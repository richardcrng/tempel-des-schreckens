/* eslint-disable jsx-a11y/anchor-is-valid */

import { useCopyToClipboard } from "react-use";
import { Button } from "semantic-ui-react";
import styled from "styled-components";
import { gameLobbyReadiness } from "../../selectors/game";
import { GameBase, Player } from "../../types/game.types";
import PlayerList from "../atoms/PlayerList";
import PlayerAvatar from "../atoms/PlayerAvatar";

interface Props {
  game: GameBase;
  handleStartGame(): void;
  onPlayerKick(playerIdToKick: string): void;
  players: Player[];
  player: Player;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const ActionArea = styled.div`
  width: 100%;
`;

const StyledA = styled.a`
  display: block;
  text-align: center;
`;

const StyledPlayerList = styled(PlayerList)`
  grid-area: players;
  overflow-y: scroll;
  padding-inline-start: 20px;
`;


const PlayerListItemContents = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  font-size: 1.2rem;
  justify-content: space-between;
  padding-bottom: 10px;

  p {
    margin: 0;
  }

  button {
    font-size: 0.9rem;
    margin: 0;
  }
`;

function GameLobby({ game, handleStartGame, onPlayerKick, players, player }: Props) {
  const readiness = gameLobbyReadiness(game);
  // eslint-disable-next-line
  const [_, copyToClipboard] = useCopyToClipboard();

  const disableStart = !readiness.isReady;

  return (
    <Container className="active-contents">
      <div style={{ width: "100%" }}>
        <h1 style={{ textAlign: "center" }}>Game id: {game.id}</h1>
        <StyledA
          onClick={(e) => {
            e.preventDefault();
            copyToClipboard(window.location.href);
            window.alert(`Copied to clipboard: ${window.location.href}`);
          }}
          href="#"
        >
          Copy game join link
        </StyledA>
        <StyledPlayerList
          players={players}
          ownPlayerId={player.socketId}
          renderPlayer={(playerToRender, idx, ownPlayerId) => {
            return (
              <PlayerListItemContents>
                <p style={{ marginLeft: "10px" }}>
                  {playerToRender.name}
                  {playerToRender.socketId === ownPlayerId && " (you)"}
                  {playerToRender.isHost && " (host)"}
                </p>
                {player.isHost &&
                  playerToRender.socketId !== player.socketId && (
                    <button
                      onClick={() => onPlayerKick(playerToRender.socketId)}
                    >
                      x
                    </button>
                  )}
              </PlayerListItemContents>
            );
          }}
        />
      </div>
      <ActionArea>
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
      </ActionArea>
    </Container>
  );
}

export default GameLobby;
