import { Button } from "semantic-ui-react";
import { countCardType, generateCardCount, getAllFlippedCards, getCurrentRound, getFlippedCardsInRound, getNumberOfPlayers } from "../../selectors/game";
import { CardType, Game } from "../../types/game.types";


interface Props {
  game: Game;
  onBackToGame: () => void;
}

function GameStats({ game, onBackToGame }: Props): JSX.Element {
  const nPlayers = getNumberOfPlayers(game);
  const currentRound = getCurrentRound(game);
  const roundFlippedCards = getFlippedCardsInRound(game);
  const allFlippedCards = getAllFlippedCards(game);
  const { nGold, nFire, nEmpty } = generateCardCount(nPlayers);

  return (
    <>
      <h2>Round {game.rounds.length} of 4</h2>
      <h3>Round stats</h3>
      <p style={{ margin: 0 }}>
        {currentRound.turns.length} of {nPlayers} chests opened:
      </p>
      <ul style={{ marginTop: 0 }}>
        <li>{countCardType(roundFlippedCards, CardType.GOLD)} gold</li>
        <li>{countCardType(roundFlippedCards, CardType.FIRE)} fire</li>
        <li>{countCardType(roundFlippedCards, CardType.EMPTY)} empty</li>
      </ul>
      <h2>Game stats</h2>
      <ul style={{ marginTop: 0 }}>
        <li>
          {countCardType(allFlippedCards, CardType.GOLD)} of {nGold} gold
        </li>
        <li>
          {countCardType(allFlippedCards, CardType.FIRE)} of {nFire} fire
        </li>
        <li>
          {countCardType(allFlippedCards, CardType.EMPTY)} of {nEmpty} empty
        </li>
      </ul>
      <Button fluid primary onClick={onBackToGame}>
        Back to game
      </Button>
    </>
  );
}

export default GameStats