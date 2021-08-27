import { Card, GameBase, GameStatus, Player } from "../../types/game.types";
import GameComplete from "../organisms/GameComplete";
import GameLobby from "../organisms/GameLobby";
import GameOngoing from "../organisms/GameOngoing";

interface Props {
  game: GameBase;
  handleStartGame(): void;
  onCardClick?: (card: Card, idx: number, player: Player) => void;
  onNextRound?: () => void;
  players: Player[];
  player: Player;
}

function GamePage({
  game,
  handleStartGame,
  onCardClick,
  onNextRound,
  players,
  player,
}: Props) {
  if (game.status === GameStatus.LOBBY) {
    return <GameLobby {...{ game, handleStartGame, players, player }} />;
  } else if (game.status === GameStatus.COMPLETE) {
    return <GameComplete {...{ game, player, players }} />;
  } else {
    return <GameOngoing {...{ game, player, onCardClick, onNextRound }} />;
  }
}

export default GamePage;
