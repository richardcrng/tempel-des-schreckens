import { Image } from "semantic-ui-react";
import { CardType } from "../../types/game.types";

interface Props {
  cardType: CardType;
  n: number;
}

function CardPreview({ cardType, n }: Props): JSX.Element {
  const range = Array.from(Array(n).keys());
  return (
    <>
      {range.map(n => (
        <Image avatar src={`/assets/tds-${cardType}.jpeg`} />
      ))}
    </>
  )
}

export default CardPreview