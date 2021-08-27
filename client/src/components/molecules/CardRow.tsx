import { Card } from "../../types/game.types";
import CardItem from "../atoms/CardItem";

interface Props {
  cards: Card[];
  style?: React.CSSProperties;
}

function CardRow({ cards, style }: Props): JSX.Element {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', ...style }}>
      {cards.map(card => (
        <CardItem key={card.id} card={card} size='mini' />
      ))}
    </div>
  )
}

export default CardRow