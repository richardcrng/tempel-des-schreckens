import { useEffect } from "react";
import { bundle, useRiducer } from "riduce";
import { useSocket } from "../socket";
import { ClientEvent, ServerEvent } from "../types/event.types";
import { GameBase } from "../types/game.types";
import useSocketListener from "./useSocketListener";

interface UseGameResult {
  data: GameBase | undefined;
  loading: boolean;
  error: string | undefined;
}

const initialState: UseGameResult = {
  loading: true,
  data: undefined,
  error: undefined,
};

export default function useGame(gameId: GameBase["id"]): UseGameResult {
  const socket = useSocket();
  const { state, dispatch, actions } = useRiducer(initialState);

  const setGame = (game: GameBase) => {
    dispatch(
      bundle([actions.data.create.update(game), actions.loading.create.off()])
    );
  };

  useEffect(() => {
    socket.emit(ClientEvent.GET_GAME, gameId);
  }, [socket, gameId]);

  useSocketListener(ServerEvent.GAME_GOTTEN, (updatedId, game) => {
    updatedId === gameId && setGame(game);
  });

  useSocketListener(ServerEvent.GAME_UPDATED, (updatedId, game) => {
    updatedId === gameId && setGame(game);
  });

  useSocketListener(ServerEvent.GAME_NOT_FOUND, () => {
    dispatch(
      bundle([
        actions.error.create.update("Game not found"),
        actions.loading.create.off(),
      ])
    );
  });

  return state;
}
