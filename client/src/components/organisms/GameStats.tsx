import { Button, Message, Table } from "semantic-ui-react";
import { countCardType, findFlippedCardsFromRound, generateCardCount, getAllFlippedCards, getCurrentRound, getFlippedCardsInRound, getNumberOfPlayers } from "../../selectors/game";
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
          {game.rounds.map((round) => {
            const cardsFlipped = findFlippedCardsFromRound(
              round,
              game.deck.cards
            );
            return (
              <Table.Row key={round.number}>
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
              {countCardType(allFlippedCards, CardType.GOLD)}
            </Table.Cell>
            <Table.Cell>
              {countCardType(allFlippedCards, CardType.FIRE)}
            </Table.Cell>
            <Table.Cell>
              {countCardType(allFlippedCards, CardType.EMPTY)}
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