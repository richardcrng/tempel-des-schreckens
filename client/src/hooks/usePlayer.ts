import { useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { bundle, useRiducer } from "riduce";
import { useSocket } from "../socket";
import { ClientEvent, ServerEvent } from "../types/event.types";
import { Player } from "../types/game.types";
import useSocketListener from "./useSocketListener";

interface UsePlayerResult {
  data: Player | undefined;
  loading: boolean;
  error: string | undefined;
}

const initialState: UsePlayerResult = {
  loading: true,
  data: undefined,
  error: undefined,
};

export default function usePlayer(
  playerId?: Player["socketId"],
  aliasIds: string[] = []
): UsePlayerResult {
  const socket = useSocket();
  const { state, dispatch, actions } = useRiducer(initialState);
  const history = useHistory();
  const { gameId } = useParams<{ gameId: string }>();
  const playerSocketId = playerId ?? socket.id;

  const setPlayer = (player: Player) =>
    dispatch(
      bundle([
        actions.data.create.update(player),
        actions.loading.create.off(),
        actions.error.create.reset(),
      ])
    );

  useEffect(() => {
    gameId &&
      playerSocketId &&
      socket.emit(ClientEvent.GET_PLAYER, gameId, playerSocketId, aliasIds);
  }, [socket, gameId, playerSocketId, aliasIds]);

  useSocketListener(ServerEvent.PLAYER_GOTTEN, (id, player) => {
    [...aliasIds, playerId].includes(id) && setPlayer(player);
  });

  useSocketListener(
    ServerEvent.PLAYER_KICKED,
    (targetGameId, kickedPlayerId) => {
      if (gameId === targetGameId && playerSocketId === kickedPlayerId) {
        history.push("/");
        window.alert("You have been kicked from the game by the host!");
      }
    }
  );

  useSocketListener(ServerEvent.PLAYER_UPDATED, (id, player) => {
    [...aliasIds, playerId].includes(id) && setPlayer(player);
  });

  useSocketListener(ServerEvent.PLAYER_NOT_FOUND, () => {
    dispatch(
      bundle([
        actions.error.create.update("Player not found"),
        actions.loading.create.off(),
      ])
    );
  });

  return state;
}
