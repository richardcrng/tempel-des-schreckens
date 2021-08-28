import { Button, Message, Table } from "semantic-ui-react";
import { countCardType, findFlippedCardsFromRound, getFlippedCardsInRound, getFlippedTypeCount, getRemainingTypeCount } from "../../selectors/game";
import { CardType, Game } from "../../types/game.types";


interface Props {
  game: Game;
  onBackToGame: () => void;
}

function GameStats({ game, onBackToGame }: Props): JSX.Element {
  const roundFlippedCards = getFlippedCardsInRound(game);
  const flippedCount = getFlippedTypeCount(game);
  const remaining = getRemainingTypeCount(game);

  return (
    <>
      <h2>Round {game.rounds.length} of 4</h2>
      <Message info>
        <p>
          {roundFlippedCards.length === 0
            ? "A new round has started!"
            : "The round is ongoing!"}
        </p>
      </Message>
      <h3>Round stats</h3>
      <Table celled unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Round</Table.HeaderCell>
            <Table.HeaderCell>Gold</Table.HeaderCell>
            <Table.HeaderCell>Fire</Table.HeaderCell>
            <Table.HeaderCell>Empty</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {game.rounds.map((round, idx) => {
            const cardsFlipped = findFlippedCardsFromRound(
              round,
              game.deck.cards
            );
            return (
              <Table.Row
                key={round.number}
                positive={idx === game.rounds.length - 1}
              >
                <Table.Cell>{round.number}</Table.Cell>
                <Table.Cell>
                  {countCardType(cardsFlipped, CardType.GOLD)}
                </Table.Cell>
                <Table.Cell>
                  {countCardType(cardsFlipped, CardType.FIRE)}
                </Table.Cell>
                <Table.Cell>
                  {countCardType(cardsFlipped, CardType.EMPTY)}
                </Table.Cell>
              </Table.Row>
            );
          })}
          <Table.Row active>
            <Table.Cell>Total</Table.Cell>
            <Table.Cell>
              {flippedCount.nGold}
            </Table.Cell>
            <Table.Cell>
              {flippedCount.nFire}
            </Table.Cell>
            <Table.Cell>
              {flippedCount.nEmpty}
            </Table.Cell>
          </Table.Row>
          <Table.Row active>
            <Table.Cell>Left</Table.Cell>
            <Table.Cell>
              {remaining.nGold}
            </Table.Cell>
            <Table.Cell>
              {remaining.nFire}
            </Table.Cell>
            <Table.Cell>
              {remaining.nEmpty}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Button fluid primary onClick={onBackToGame}>
        Back to game
      </Button>
    </>
  );
}

export default GameStats