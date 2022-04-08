import { Card, Player } from "../../types/game.types";
import PlayerAvatar from "../atoms/PlayerAvatar";
import CardRow from "./CardRow";

interface Props {
  player: Player;
  cards: Card[];
  onCardClick?: (card: Card, idx: number, player: Player) => void;
  isKeyholder?: boolean;
  style?: React.CSSProperties;
}

function PlayerCards({
  cards,
  onCardClick,
  player,
  isKeyholder,
  style,
}: Props): JSX.Element {
  return (
    <div style={{ display: "flex", justifyContent: "space-around", ...style }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PlayerAvatar player={player} />
        <p>{player.name?.substr(0, 2)}</p>
      </div>
      {<span style={{ width: "5px" }}>{isKeyholder && "🗝️"}</span>}
      <CardRow
        cards={cards}
        style={{ width: "calc(100% - 50px)" }}
        onCardClick={(card, idx) =>
          onCardClick && onCardClick(card, idx, player)
        }
      />
    </div>
  );
}

export default PlayerCards;
