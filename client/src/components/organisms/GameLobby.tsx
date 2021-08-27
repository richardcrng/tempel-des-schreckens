/* eslint-disable jsx-a11y/anchor-is-valid */

import { useState } from "react";
import { useCopyToClipboard } from "react-use";
import { Button, Input } from "semantic-ui-react";
import { gameLobbyReadiness } from "../../models/game";
import { GameBase, Player } from "../../types/game.types";
import PlayerList from "../atoms/PlayerList";

interface Props {
  game: GameBase;
  handleStartGame(probabilityOfConspiracy?: number): void;
  players: Player[];
  player: Player;
}

function GameLobby({ game, handleStartGame, players, player }: Props) {
  const readiness = gameLobbyReadiness(game);
  const [customProbability, setCustomProbability] = useState("");
  // eslint-disable-next-line
  const [_, copyToClipboard] = useCopyToClipboard();

  const imputedProbability = isNaN(Number(customProbability))
    ? undefined
    : Number(customProbability);

  const illegalProbability =
    Number(customProbability) > 100 || Number(customProbability) < 0;

  const disableStart = !readiness.isReady || illegalProbability;

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
      {player.isHost && (
        <>
          <p>
            As host, if you'd like, you can set a custom probability of
            conspiracy (0-100), otherwise we'll use a mathematically balanced
            probability (where the probability of a conspiracy increases with
            the number of players)
          </p>
          <Input
            label={{ basic: "true", content: "%" }}
            labelPosition="right"
            value={customProbability}
            onChange={(e) => setCustomProbability(e.target.value)}
            placeholder="custom probability"
          />
          {illegalProbability && <p>That's an illegal probability...</p>}
        </>
      )}
      <PlayerList players={players} />
      {player.isHost ? (
        <>
          <Button
            primary
            disabled={disableStart}
            onClick={() => {
              handleStartGame(imputedProbability);
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
