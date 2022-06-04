import { useEffect, useState } from "react";
import { Header, Image, Modal } from "semantic-ui-react";
import CardFlip from "../../lib/card-flip/CardFlip";
import { CardType } from "../../types/game.types";

interface CardRevealModalProps {
  className?: string;
  style?: React.CSSProperties;
  cardType?: CardType;
  flipper?: string;
  flippee?: string;
  isOpen?: boolean;
  onFlipComplete?(): void;
  onClose(): void;
}

function CardRevealModal({ className, style, cardType, flipper, flippee, isOpen, onFlipComplete, onClose }: CardRevealModalProps) {
  const [flip, setFlip] = useState({ started: false, completed: false })

  useEffect(() => {
    if (!flip.started) {
      setTimeout(() => {
        setFlip(prev => ({ ...prev, started: true }));
      }, 1000);
    }
  }, [flip.started, setFlip]);

  useEffect(() => {
    if (!isOpen && (flip.started || flip.completed)) {
      setFlip({ started: false, completed: false })
    }
  }, [isOpen, flip, setFlip])

  const header = flip.completed
    ? `${flipper} opened ${flippee} ${cardType}!`
    : `${flipper} ${flipper?.match(/you/i) ? "are" : "is"} opening ${flippee} chamber...`;

  return (
    <Modal
        basic
        closeIcon
        open={isOpen}
        onClick={flip.completed ? onClose : undefined}
        onClose={onClose}
      >
        <Header
          content={header}
          onClick={onClose}
        />
        <Modal.Content onClick={flip.completed ? onClose : undefined}>
          <CardReveal
            cardType={cardType}
            onFlipComplete={() => {
              onFlipComplete && onFlipComplete();
              setFlip(prev => ({ ...prev, completed: true }))
            }}
            isFlipped={flip.started}
          />
        </Modal.Content>
      </Modal>
  )
}

interface CardRevealProps {
  className?: string;
  style?: React.CSSProperties;
  cardType?: CardType;
  isFlipped?: boolean;
  onClickFront?(): void;
  onFlipComplete?(): void;
}

function CardReveal({ className, style, cardType, isFlipped, onClickFront, onFlipComplete }: CardRevealProps): JSX.Element {

  return (
    <CardFlip
      {...{ className, style }}
      styles={{
        cardFrame: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxHeight: "100%",
          minHeight: 0,
        },
      }}
      front={
        <Image
          alt='card-front'
          src={`/assets/tds-${cardType}.jpeg`}
          size="medium"
        />
      }
      back={<Image alt="card-back" src="/assets/tds-chamber.jpeg" size='medium' />}
      isFlippedUp={isFlipped}
      onClickFront={onClickFront}
      onFlipComplete={onFlipComplete}
      springConfig={{ duration: 1000, clamp: true }}
    />
  );
}

export default CardRevealModal;
