import {
  getVote,
  hasConspiracy,
  isConspiracyMember,
  isWinner,
} from "../../models/game";
import { Game, Player } from "../../types/game.types";
import PlayerList from "../atoms/PlayerList";

interface Props {
  game: Game;
  player: Player;
  players: Player[];
}

function GameResults({ game, player, players }: Props) {
  return (
    <>
      <IndividualGameResultsGif {...{ game, player }} />
      <PlayerList
        players={players}
        renderPlayer={(player) => (
          <>
            <b>{player.name}</b> (
            {isConspiracyMember(game, player.socketId)
              ? "conspirator"
              : "innocent"}
            ) voted <i>{getVote(game, player.socketId)}</i>:{" "}
            <b>{isWinner(game, player.socketId) ? "wins" : "loses"}</b>
          </>
        )}
      />
    </>
  );
}

function IndividualGameResultsGif({ game, player }: Omit<Props, "players">) {
  const result = getIndividualResult({ game, player })

  return (
    <>
      <h1>{isWinner(game, player.socketId) ? "YOU WIN" : "YOU LOSE"}</h1>
      <h2>{result.message}</h2>
      <img alt={result.message} src={result.gifUrl} />
    </>
  );
}

interface IndividualGameSummary {
  gifUrl: string;
  message: string;
}

const getIndividualResult = ({ game, player }: Omit<Props, 'players'>): IndividualGameSummary => {
  const didWin = isWinner(game, player.socketId);
  const isConspiracy = hasConspiracy(game);
  const isConspiracist = isConspiracyMember(game, player.socketId)

  if (didWin) {
    // littlefinger smug
    if (isConspiracist) return {
      gifUrl: "https://media.giphy.com/media/Vff5Qxz6LLzag/giphy.gif",
      message: "You pulled off the conspiracy!"
    };
    // sherlock victory
    if (isConspiracy) return {
      gifUrl: "https://media.giphy.com/media/l6d8IEQdmiSsM/giphy.gif",
      message: 'You figured out the conspiracy!'
    };
    // minions - no conspiracy and win
    return {
      gifUrl: 'https://media.giphy.com/media/11sBLVxNs7v6WA/giphy.gif',
      message: "You kept your sanity!"
    }
  } else {
    // foiled
    if (isConspiracist) return {
      gifUrl: "https://media.giphy.com/media/xUNd9I18JKZnp91Kne/giphy.gif",
      message: "Your conspiracy was foiled!"
    };
    // shocked Jim Carey
    if (isConspiracy) return {
      gifUrl: "https://media.giphy.com/media/jquDWJfPUMCiI/giphy.gif",
      message: 'The conspiracy tricked you!'
    };
    // flat earther
    return {
      gifUrl: "https://media.giphy.com/media/eg4d3BZTuxeuDyM9UZ/giphy.gif",
      message: "You were too paranoid!"
    };
  }
}

export default GameResults;
