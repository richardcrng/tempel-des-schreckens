import { useParams } from "react-router";
import PlayerNamer from "../components/atoms/PlayerNamer";
import GamePage from "../components/pages/GamePage";
import useGame from "../hooks/useGame";
import usePlayer from "../hooks/usePlayer";
import useSocketAliases from "../hooks/useSocketAliases";
import { getKeyholder } from "../selectors/game";
import { useSocket } from "../socket";
import { ClientEvent } from "../types/event.types";
import { GameStatus } from "../types/game.types";

function GameRoute() {
  const { gameId } = useParams<{ gameId: string }>();
  const socket = useSocket();
  const socketAliases = useSocketAliases();

  const game = useGame(gameId);
  const player = usePlayer(socket.id, socketAliases);

  const takenNames = Object.values(game.data?.players ?? {}).map(
    (player) => player.name!
  );

  if (game.data?.status === GameStatus.ONGOING && !player.data) {
    return <p>Can't join a game that is underway - sorry</p>;
  } else if (
    !game.data?.players[player.data?.socketId ?? ""] &&
    takenNames.length >= 10
  ) {
    return <p>The game is full (10 players max) - sorry</p>;
  } else if (!player.loading && !player.data?.name) {
    return (
      <>
        <p>
          To {player.data?.isHost ? "host" : "join"} the game, please choose a
          player name first:
        </p>
        <PlayerNamer
          handleSetName={(name) => {
            if (player.data) {
              // player is in game, so update
              socket.emit(ClientEvent.UPDATE_PLAYER, gameId, {
                socketId: socket.id,
                name,
                gameId,
              });
            } else {
              // player not in game, so join
              socket.emit(ClientEvent.JOIN_GAME, gameId, {
                socketId: socket.id,
                name,
              });
            }
          }}
          takenNames={takenNames}
        />
      </>
    );
  } else {
    return (
      <>
        {game.loading && <p>Loading...</p>}
        {game.data && player.data && (
          <GamePage
            game={game.data}
            handleStartGame={() => {
              socket.emit(ClientEvent.START_GAME, game.data!.id);
            }}
            onCardClick={(card, idx, player) => {
              if (!card.isFlipped) {
                socket.emit(
                  ClientEvent.FLIP_CARD,
                  game.data!.id,
                  getKeyholder(game.data!).socketId,
                  player.socketId,
                  idx,
                  card
                );
              }
            }}
            onGameRestart={() => {
              socket.emit(ClientEvent.RESET_GAME, game.data!.id);
            }}
            onNextRound={() => {
              socket.emit(ClientEvent.NEXT_ROUND, game.data!.id);
            }}
            onPlayerKick={(playerIdToKick) => {
              socket.emit(ClientEvent.KICK_PLAYER, game.data!.id, playerIdToKick)
            }}
            players={Object.values(game.data.players)}
            player={player.data}
          />
        )}
      </>
    );
  }
}

export default GameRoute;
