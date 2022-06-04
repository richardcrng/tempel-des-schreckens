import { Card, GameBase, GameStatus, Player } from "../../types/game.types";
import GameLobby from "../organisms/GameLobby";
import GameOngoing from "../organisms/GameOngoing";

interface Props {
  game: GameBase;
  onGameStart(): void;
  onCardClick: (card: Card, idx: number, player: Player) => void;
  onFlipComplete(card: Card): void;
  onGameRestart: () => void;
  onNextRound: () => void;
  onPlayerKick(playerIdToKick: string): void;
  players: Player[];
  player: Player;
}

function GamePage({
  game,
  onCardClick,
  onFlipComplete,
  onGameStart,
  onGameRestart,
  onNextRound,
  onPlayerKick,
  players,
  player,
}: Props) {
  if (game.status === GameStatus.LOBBY) {
    return (
      <GameLobby {...{ game, onGameStart, onPlayerKick, players, player }} />
    );
  } else {
    return (
      <GameOngoing
        {...{ game, player, onCardClick, onFlipComplete, onGameRestart, onNextRound }}
      />
    );
  }
}

export default GamePage;
