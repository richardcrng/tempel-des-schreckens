import { useState } from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { Card, CardType, Game, Player } from "../../types/game.types";
import GameArea from "./GameArea";
import { getNumberOfPlayers } from '../../selectors/game';
import GameDistribution from "./GameDistribution";
import GameStats from "./GameStats";
import useSocketListener from "../../hooks/useSocketListener";
import { ServerEvent } from "../../types/event.types";

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
  const handleBackToGame = () => setView(SectionView.MAIN_GAME)

  const [cardFlipModal, setCardFlipModal] = useState<{
    isOpen: boolean;
    type?: CardType;
    flipper?: string;
    flippee?: string;
  }>({ isOpen: false });

  const handleCloseModal = () =>
    setCardFlipModal((prev) => ({ ...prev, isOpen: false }));

  useSocketListener(
    ServerEvent.ROUND_COMPLETE,
    (gameId) => {
      console.log("Round is complete!")
      if (gameId === game.id) {
        setView(SectionView.GAME_STATS)
      }
    }
  )

  useSocketListener(
    ServerEvent.CARD_FLIPPED,
    (gameId, keyholderId, targetPlayerId, cardIdx, card) => {
      if (gameId === game.id) {
        setCardFlipModal({
          isOpen: true,
          type: card.type,
          flipper:
            keyholderId === player.socketId
              ? "You"
              : game.players[keyholderId].name,
          flippee:
            targetPlayerId === player.socketId
              ? "your"
              : game.players[targetPlayerId].name + "'s",
        });
      }
    }
  );

  return (
    <>
      <Modal
        basic
        closeIcon
        open={cardFlipModal.isOpen}
        onClose={handleCloseModal}
      >
        <Header
          content={`${cardFlipModal.flipper} opened ${cardFlipModal.flippee} ${cardFlipModal.type}!`}
          onClick={handleCloseModal}
        />
        <Modal.Content onClick={handleCloseModal}>
          <Image onClick={handleCloseModal} src={`/assets/tds-${cardFlipModal.type}.jpeg`} size="medium" />
        </Modal.Content>
      </Modal>
      {view === SectionView.DISTRIBUTION && (
        <GameDistribution
          player={player}
          nPlayers={getNumberOfPlayers(game)}
          onBackToGame={handleBackToGame}
        />
      )}
      {view === SectionView.GAME_STATS && (
        <GameStats game={game} onBackToGame={handleBackToGame} />
      )}
      {view === SectionView.MAIN_GAME && (
        <>
          <GameArea game={game} player={player} onCardClick={onCardClick} />
          <Button fluid primary onClick={() => setView(SectionView.GAME_STATS)}>
            Round stats
          </Button>
          <Button
            fluid
            color="black"
            onClick={() => setView(SectionView.DISTRIBUTION)}
          >
            Game setup
          </Button>
        </>
      )}
    </>
  );
}

export default GameOngoing;
