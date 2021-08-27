import { GameBase, GameStatus, Player } from "../../types/game.types";
import GameComplete from "../organisms/GameComplete";
import GameLobby from "../organisms/GameLobby";
import GameOngoing from "../organisms/GameOngoing";

interface Props {
  game: GameBase;
  handleStartGame(): void;
  handleVote(vote: null): void;
  players: Player[];
  player: Player;
}

function GamePage({
  game,
  handleStartGame,
  handleVote,
  players,
  player,
}: Props) {
  if (game.status === GameStatus.LOBBY) {
    return <GameLobby {...{ game, handleStartGame, players, player }} />;
  } else if (game.status === GameStatus.COMPLETE) {
    return <GameComplete {...{ game, player, players }} />;
  } else {
    return <GameOngoing {...{ game, player, handleVote }} />;
  }
}

export default GamePage;
