import { countCardType } from "../../selectors/game";
import { Card, CardType, Player } from "../../types/game.types";
import PlayerCards from "./PlayerCards";

interface Props {
  cards: Card[];
  isKeyholder: boolean;
  player: Player;
}

function OwnCards({ cards, isKeyholder, player }: Props): JSX.Element {
  return (
    <>
      <p style={{ margin: 0 }}>Your distribution (secret):</p>
      <ul style={{ marginTop: 0 }}>
        <li>{countCardType(cards, CardType.GOLD)} gold</li>
        <li>{countCardType(cards, CardType.FIRE)} fire</li>
        <li>{countCardType(cards, CardType.EMPTY)} empty</li>
      </ul>
      <PlayerCards cards={cards} player={player} isKeyholder={isKeyholder} />
    </>
  );
}

export default OwnCards