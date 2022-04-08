import { Button, Message, Table } from "semantic-ui-react";
import styled from "styled-components";
import {
  countCardType,
  findFlippedCardsFromRound,
  getFlippedCardsInRound,
  getFlippedTypeCount,
  getRemainingTypeCount,
} from "../../selectors/game";
import { GameOverReason } from "../../types/event.types";
import { CardType, Game } from "../../types/game.types";

interface Props {
  game: Game;
  gameOverReason?: GameOverReason;
  onBackToGame: () => void;
}

const Container = styled.div``;

function GameStats({ game, gameOverReason, onBackToGame }: Props): JSX.Element {
  const roundFlippedCards = getFlippedCardsInRound(game);
  const flippedCount = getFlippedTypeCount(game);
  const remaining = getRemainingTypeCount(game);

  return (
    <Container className="active-contents flex-between">
      <div style={{ width: "100%" }}>
        <h2>Round {game.rounds.length} of 4</h2>
        <Message info={!gameOverReason} warning={!!gameOverReason}>
          <p>
            {gameOverReason
              ? gameOverReason + "!"
              : roundFlippedCards.length === 0
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
              <Table.Cell>{flippedCount.nGold}</Table.Cell>
              <Table.Cell>{flippedCount.nFire}</Table.Cell>
              <Table.Cell>{flippedCount.nEmpty}</Table.Cell>
            </Table.Row>
            <Table.Row active>
              <Table.Cell>Left</Table.Cell>
              <Table.Cell>{remaining.nGold}</Table.Cell>
              <Table.Cell>{remaining.nFire}</Table.Cell>
              <Table.Cell>{remaining.nEmpty}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
      <Button fluid primary onClick={onBackToGame}>
        Back to game
      </Button>
    </Container>
  );
}

export default GameStats;
