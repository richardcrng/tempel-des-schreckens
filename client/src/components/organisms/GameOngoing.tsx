import { useState } from "react";
import { Button } from "semantic-ui-react";
import { Card, CardType, Game, Player } from "../../types/game.types";
import GameArea from "./GameArea";
import RoleOverview from "../molecules/RoleOverview";
import SetupOverview from "../molecules/SetupOverview";
import { countCardType, getAllFlippedCards, getCurrentRound, getFlippedCardsInRound } from "../../selectors/game";
import { generateCardCount } from '../../selectors/game';

interface Props {
  game: Game;
  player: Player;
  onCardClick?: (card: Card, idx: number, player: Player) => void;
}

enum SectionView {
  DISTRIBUTION = 'distribution',
  GAME_STATS = 'game-stats',
  MAIN_GAME = 'main-game'
}

function GameOngoing({ game, player, onCardClick }: Props) {
  const [view, setView] = useState<SectionView>(SectionView.DISTRIBUTION)

  if (view === SectionView.DISTRIBUTION) {
    return (
      <>
        {player.role && <RoleOverview role={player.role} style={{ marginBottom: '20px' }} />}
        <SetupOverview nPlayers={Object.keys(game.players).length} />
        <Button
          fluid
          primary
          onClick={() => setView(SectionView.MAIN_GAME)}
        >
          Back to game
        </Button>
      </>
    );
  }
  
  if (view === SectionView.GAME_STATS) {
    const currentRound = getCurrentRound(game);
    const roundFlippedCards = getFlippedCardsInRound(game);
    const allFlippedCards = getAllFlippedCards(game);
    const nPlayers = Object.keys(game.players).length;
    const { nGold, nFire, nEmpty } = generateCardCount(nPlayers)

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
          <li>{countCardType(allFlippedCards, CardType.GOLD)} of {nGold} gold</li>
          <li>{countCardType(allFlippedCards, CardType.FIRE)} of {nFire} fire</li>
          <li>{countCardType(allFlippedCards, CardType.EMPTY)} of {nEmpty} empty</li>
        </ul>
        <Button fluid primary onClick={() => setView(SectionView.MAIN_GAME)}>
          Back to game
        </Button>
      </>
    );
  }

  return (
    <>
      <GameArea game={game} player={player} onCardClick={onCardClick} />
      <Button fluid primary onClick={() => setView(SectionView.GAME_STATS)} >Round stats</Button>
      <Button fluid color='black' onClick={() => setView(SectionView.DISTRIBUTION)}>Game setup</Button>
    </>
  );
}

export default GameOngoing;
