import { countCardType } from "../../selectors/game";
import { Card, CardType, Player } from "../../types/game.types";
import CardPreview from "../atoms/CardPreview";
import PlayerCards from "./PlayerCards";

interface Props {
  cards: Card[];
  isKeyholder: boolean;
  player: Player;
}

function OwnCards({ cards, isKeyholder, player }: Props): JSX.Element {
  return (
    <>
      <div style={{ paddingBottom: "5px" }}>
        <span style={{ marginRight: "5px" }}>Your cards:</span>
        {Object.values(CardType).map((cardType) => (
          <CardPreview
            key={cardType}
            cardType={cardType}
            n={countCardType(cards, cardType)}
          />
        ))}
      </div>
      <PlayerCards cards={cards} player={player} isKeyholder={isKeyholder} />
    </>
  );
}

export default OwnCards;
