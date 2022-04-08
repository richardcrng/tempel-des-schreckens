import { Image, SemanticSIZES } from "semantic-ui-react";
import { Card } from "../../types/game.types";

interface Props {
  card: Card;
  size?: SemanticSIZES;
  style?: React.CSSProperties;
  onClick?: (card: Card) => void;
}

function CardItem({
  card,
  onClick,
  size = "medium",
  style,
}: Props): JSX.Element {
  const imageSlug = card.isFlipped ? card.type : "chamber";

  return (
    <div style={style}>
      <Image
        onClick={() => onClick && onClick(card)}
        src={`/assets/tds-${imageSlug}.jpeg`}
        size={size}
      />
    </div>
  );
}

export default CardItem;
