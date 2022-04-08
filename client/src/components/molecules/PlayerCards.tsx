import styled from 'styled-components'
import { Card, Player } from "../../types/game.types";
import CardRow from "./CardRow";

interface Props {
  player: Player;
  cards: Card[];
  onCardClick?: (card: Card, idx: number, player: Player) => void;
  isKeyholder?: boolean;
  style?: React.CSSProperties;
}

const PlayerName = styled.p`
  transform: rotate(-90deg);
  font-weight: bold;
  margin: 2px;
  max-height: 50px;
  inline-size: 50px;
  hyphens: manual;
  text-overflow: ellipsis;
  overflow-y: hidden;
  word-break: break-all;
  border-bottom: 3px dashed gray;
`;

function PlayerCards({
  cards,
  onCardClick,
  player,
  isKeyholder,
  style,
}: Props): JSX.Element {
  return (
    <div style={{ display: "flex", justifyContent: "space-around", ...style }}>
      {/* <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      > */}
        <PlayerName>{player.name}</PlayerName>
      {/* </div> */}
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
