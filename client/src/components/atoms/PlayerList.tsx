import { PropsWithChildren } from "react";
import { Player } from "../../types/game.types";

interface Props {
  players: Player[];
  listParent?: React.FunctionComponent<PropsWithChildren<{}>>;
  listItemParent?: React.FunctionComponent<PropsWithChildren<{}>>;
  renderPlayer?(player: Player): JSX.Element;
}

function PlayerList({
  players,
  listParent: List = DefaultListParent,
  listItemParent: ListItem = DefaultListItem,
  renderPlayer = defaultRenderPlayer,
}: Props) {
  return (
    <List>
      {players.map((player) => (
        <ListItem key={player.socketId}>{renderPlayer(player)}</ListItem>
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

const defaultRenderPlayer = (player: Player): JSX.Element => (
  <>
    {player.name}
    {player.isHost && " (host)"}
  </>
);

export default PlayerList;
