import { Image } from "semantic-ui-react";
import styled from 'styled-components'
import { CardType } from "../../types/game.types";

interface Props {
  cardType: CardType;
  n: number;
}

function CardPreview({ cardType, n }: Props): JSX.Element {
  const range = Array.from(Array(n).keys());
  return (
    <>
      {range.map((n) => (
        <CardPreviewImage
          key={n}
          avatar
          cardType={cardType}
          src={`/assets/tds-${cardType}.jpeg`}
        />
      ))}
    </>
  );
}

const CardPreviewImage = styled(Image)`
  border: 3px solid ${({ cardType }: { cardType: CardType }) => cardType === CardType.FIRE ? 'red' : cardType === CardType.GOLD ? 'green' : 'black'};
`

export default CardPreview;
