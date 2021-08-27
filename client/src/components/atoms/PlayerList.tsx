import { PropsWithChildren } from "react";
import { Player } from "../../types/game.types";

interface Props {
  ownPlayerId?: string;
  players: Player[];
  listParent?: React.FunctionComponent<PropsWithChildren<{}>>;
  listItemParent?: React.FunctionComponent<PropsWithChildren<{}>>;
  renderPlayer?(player: Player, ownPlayerId?: string): JSX.Element;
}

function PlayerList({
  ownPlayerId,
  players,
  listParent: List = DefaultListParent,
  listItemParent: ListItem = DefaultListItem,
  renderPlayer = defaultRenderPlayer,
}: Props) {
  return (
    <List>
      {players.map((player) => (
        <ListItem key={player.socketId}>{renderPlayer(player, ownPlayerId)}</ListItem>
      ))}
    </List>
  );
}

function DefaultListParent({ children }: PropsWithChildren<{}>) {
  return <ol>{children}</ol>;
}

function DefaultListItem({ children }: PropsWithChildren<{}>) {
  return <li>{children}</li>;
}

const defaultRenderPlayer = (player: Player, ownPlayerId?: string): JSX.Element => (
  <>
    {player.name}
    {player.socketId === ownPlayerId && " (you)"}
    {player.isHost && " (host)"}
  </>
);

export default PlayerList;
