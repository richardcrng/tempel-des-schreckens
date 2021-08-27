import { useState } from "react";
import { Header, Image, Message, Modal } from "semantic-ui-react";
import useSocketListener from "../../hooks/useSocketListener";
import { countCardType, getKeyholder, getPlayerCardsInRound } from "../../selectors/game";
import { ServerEvent } from "../../types/event.types";
import { Card, CardType, Game, Player } from "../../types/game.types";
import PlayerCards from "../molecules/PlayerCards";

interface Props {
  game: Game;
  onCardClick?: (card: Card, idx: number, player: Player) => void;
  player: Player;
}

function GameArea({ game, player, onCardClick }: Props): JSX.Element {

  const [cardFlipModal, setCardFlipModal] = useState<{ isOpen: boolean, type?: CardType, flipper?: string, flippee?: string }>({ isOpen: false })

  useSocketListener(ServerEvent.CARD_FLIPPED, (gameId, keyholderId, targetPlayerId, cardIdx, card) => {
    if (gameId === game.id) {
      setCardFlipModal({
        isOpen: true,
        type: card.type,
        flipper: keyholderId === player.socketId ? "You" : game.players[keyholderId].name,
        flippee: targetPlayerId === player.socketId ? "your" : game.players[targetPlayerId].name + "'s",
      });
    }
  })

  const keyholder = getKeyholder(game);

  const isKeyholder = keyholder.socketId === player.socketId;

  const handleCardClick = (card: Card, idx: number, player: Player) => {
    if (isKeyholder && onCardClick) {
      onCardClick(card, idx, player)
    }
  }

  const { [player.socketId]: ownCards, ...otherPlayerCards } = getPlayerCardsInRound(game);

  return (
    <>
      <Modal
        basic
        closeIcon
        open={cardFlipModal.isOpen}
        onClose={() => setCardFlipModal(prev => ({ ...prev, isOpen: false }))}
      >
        <Header content={`${cardFlipModal.flipper} opened ${cardFlipModal.flippee} ${cardFlipModal.type}!`} />
        <Modal.Content>
          <Image src={`/assets/tds-${cardFlipModal.type}.jpeg`} size='small' />
        </Modal.Content>
      </Modal>
      <Message info>
        <p>{isKeyholder ? "You have" : `${keyholder.name} has`} the key</p>
      </Message>
      {Object.entries(otherPlayerCards).map(([playerId, cards]) => (
        <PlayerCards
          key={playerId}
          cards={cards}
          player={game.players[playerId]}
          isKeyholder={keyholder.socketId === playerId}
          onCardClick={handleCardClick}
        />
      ))}
      <hr />
      <p style={{ margin: 0 }}>Your distribution (secret):</p>
      <ul style={{ marginTop: 0 }}>
        <li>{countCardType(ownCards, CardType.GOLD)} gold</li>
        <li>{countCardType(ownCards, CardType.FIRE)} fire</li>
        <li>{countCardType(ownCards, CardType.EMPTY)} empty</li>
      </ul>
      <PlayerCards cards={ownCards} player={player} isKeyholder={isKeyholder} />
    </>
  );
}

export default GameArea