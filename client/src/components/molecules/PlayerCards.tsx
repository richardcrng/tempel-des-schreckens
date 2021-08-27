import { Card, Player } from "../../types/game.types";
import PlayerAvatar from "../atoms/PlayerAvatar";
import CardRow from "./CardRow";

interface Props {
  player: Player;
  cards: Card[];
  isKeyholder?: boolean;
  style?: React.CSSProperties;
}

function PlayerCards({ cards, player, isKeyholder, style }: Props): JSX.Element {

  return (
    <div style={{ display: "flex", justifyContent: "space-around", ...style }}>
      <PlayerAvatar player={player} />
      {<span style={{ width: '5px' }}>{isKeyholder && "🗝️" }</span>}
      <CardRow cards={cards} style={{ width: "calc(100% - 50px)" }} />
    </div>
  );
}

export default PlayerCards