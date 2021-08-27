import { Button, Table } from "semantic-ui-react";
import {
  conspiracyVictimName,
  getVote,
  hasVoted,
  isConspiracyMember,
  isNewGame,
} from "../../models/game";
import { Game, Player } from "../../types/game.types";
import PlayerList from "../atoms/PlayerList";
import SetupOverview from "../molecules/SetupOverview";

interface Props {
  game: Game;
  player: Player;
  handleVote(vote: null): void;
}

function GameOngoing({ game, player, handleVote }: Props) {
  if (isNewGame(game)) {
    return <SetupOverview nPlayers={Object.keys(game.players).length} />;
  }

  const playerVote = getVote(game, player.socketId);

  return (
    <>
      <p>
        {isConspiracyMember(game, player.socketId)
          ? `You are in a conspiracy against ${conspiracyVictimName(game)}`
          : "You are innocent"}
      </p>
      <PlayerList
        players={Object.values(game.players)}
        listParent={({ children }) => (
          <Table basic="very" celled collapsing>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Player name</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{children}</Table.Body>
          </Table>
        )}
        listItemParent={({ children }) => <Table.Row>{children}</Table.Row>}
        renderPlayer={(player) => (
          <>
            <Table.Cell>{player.name}</Table.Cell>
            <Table.Cell>
              {hasVoted(game, player.socketId)
                ? "🗳️ (vote cast)"
                : "🤔 (thinking)"}
            </Table.Cell>
          </>
        )}
      />
      <p>
        {playerVote ? (
          <span>
            🗳️ Your vote: <i>{playerVote}</i>
          </span>
        ) : (
          "🤔 You have not voted"
        )}
      </p>
      <Button color="red">
        Vote: Conspiracy
      </Button>
      <Button color="green">
        Vote: No Conspiracy
      </Button>
      <Button onClick={() => handleVote(null)}>Clear vote</Button>
    </>
  );
}

export default GameOngoing;
