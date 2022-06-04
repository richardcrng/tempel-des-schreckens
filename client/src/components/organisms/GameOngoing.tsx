import { useState } from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import styled from "styled-components";
import { Card, CardType, Game, Player } from "../../types/game.types";
import GameArea from "./GameArea";
import {
  getIsRoundComplete,
  getNumberOfPlayers,
  getKeyholder,
  getPlayerCardsInRound,
} from "../../selectors/game";
import GameDistribution from "./GameDistribution";
import GameStats from "./GameStats";
import useSocketListener from "../../hooks/useSocketListener";
import { ServerEvent } from "../../types/event.types";
import OwnCards from "../molecules/OwnCards";

interface Props {
  game: Game;
  player: Player;
  onCardClick: (card: Card, idx: number, player: Player) => void;
  onNextRound: () => void;
  onGameRestart: () => void;
}

enum SectionView {
  DISTRIBUTION = "distribution",
  GAME_STATS = "game-stats",
  MAIN_GAME = "main-game",
}

const ActionArea = styled.div`
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
`;

function GameOngoing({
  game,
  player,
  onCardClick,
  onGameRestart,
  onNextRound,
}: Props) {
  const [view, setView] = useState<SectionView>(SectionView.DISTRIBUTION);
  const handleBackToGame = () => setView(SectionView.MAIN_GAME);
  const isRoundComplete = getIsRoundComplete(game);

  const { [player.socketId]: ownCards } = getPlayerCardsInRound(game);

  const keyholder = getKeyholder(game);
  const isKeyholder = keyholder.socketId === player.socketId;

  const [cardFlipModal, setCardFlipModal] = useState<{
    isOpen: boolean;
    type?: CardType;
    flipper?: string;
    flippee?: string;
  }>({ isOpen: false });

  const handleCloseModal = () =>
    setCardFlipModal((prev) => ({ ...prev, isOpen: false }));

  const handleProgression = () => {
    if (player.isHost && gameOverReason) {
      onGameRestart();
    } else if (player.isHost && isRoundComplete) {
      onNextRound();
    }
  };

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

  useSocketListener(ServerEvent.ROUND_STARTED, (gameId) => {
    if (gameId === game.id) {
      setView(SectionView.GAME_STATS);
    }
  });

  useSocketListener(ServerEvent.GAME_OVER, (gameId, reason) => {
    if (gameId === game.id) {
      setGameOverReason(reason);
    }
  });

  return (
    <Container className="active-contents flex-between">
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
          <Image
            onClick={handleCloseModal}
            src={`/assets/tds-${cardFlipModal.type}.jpeg`}
            size="medium"
          />
        </Modal.Content>
      </Modal>
      {view === SectionView.DISTRIBUTION && (
        <GameDistribution
          player={player}
          nPlayers={getNumberOfPlayers(game)}
          onBackToGame={handleBackToGame}
          onGameReset={onGameRestart}
        />
      )}
      {view === SectionView.GAME_STATS && (
        <GameStats
          game={game}
          isHost={player.isHost}
          onBackToGame={handleBackToGame}
          onGameReset={onGameRestart}
          gameOverReason={gameOverReason}
        />
      )}
      {view === SectionView.MAIN_GAME && (
        <>
          <GameArea
            game={game}
            player={player}
            onCardClick={
              isRoundComplete
                ? () =>
                    window.alert(
                      "This round is complete - the host needs to start the next round first"
                    )
                : onCardClick
            }
            gameOverReason={gameOverReason}
          />
          <ActionArea>
            <hr />
            <OwnCards
              cards={ownCards}
              player={player}
              isKeyholder={isKeyholder}
            />
            <Button
              fluid
              primary
              onClick={() => setView(SectionView.GAME_STATS)}
            >
              Game stats
            </Button>
            <Button
              fluid
              color="black"
              onClick={() => setView(SectionView.DISTRIBUTION)}
            >
              Setup and role
            </Button>
            <Button
              fluid
              color="green"
              disabled={!(player.isHost && (isRoundComplete || gameOverReason))}
              onClick={handleProgression}
            >
              {gameOverReason ? "New game" : "Next round"}
            </Button>
          </ActionArea>
        </>
      )}
    </Container>
  );
}

export default GameOngoing;
