import styled from "styled-components";
import { animated, SpringConfig, useSpring } from "react-spring";
import { forwardRef } from "react";

export interface CardFlipProps {
  active?: boolean;
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  styles?: {
    parent?: React.CSSProperties;
    cardFrame?: React.CSSProperties;
  };
  back: JSX.Element;
  front: JSX.Element;
  springConfig?: SpringConfig;
  children?: React.ReactNode;
  isFlippedUp?: boolean;
  onClick?(): void;
  onClickFront?(): void;
  onClickBack?(): void;
  onFlipComplete?(): void;
  // onAnimationComplete?(isFlippedUp: boolean): void;
  rotate?: number;
}

const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-areas: "content";

  .card-front,
  .card-back {
    grid-area: content;
  }

  div.card-children {
    grid-area: content;
  }
`;

function CardFlipWithRef(
  {
    className,
    children,
    disabled,
    style,
    styles,
    back,
    front,
    onClick,
    onClickFront,
    onClickBack,
    onFlipComplete,
    // onAnimationComplete,
    isFlippedUp,
    rotate: rotation = 0,
    springConfig,
  }: CardFlipProps,
  ref: React.ForwardedRef<HTMLDivElement>
): JSX.Element {
  const { transform, opacity, rotate, filter } = useSpring({
    opacity: isFlippedUp ? 1 : 0,
    transform: `rotateY(${isFlippedUp ? 0 : 180}deg)`,
    rotate: rotation,
    filter: disabled ? "grayscale(100%)" : "grayscale(0%)",
    config: springConfig,
    onRest: () => onFlipComplete && onFlipComplete(),
  });

  const frontElement = (
    <animated.div
      className="card-front"
      onClick={() => onClickFront && onClickFront()}
      style={{
        ...styles?.cardFrame,
        opacity: opacity,
        transform,
        rotate,
        filter,
        // display: opacity.to((v) => (v === 0 ? "none" : "block")),
      }}
    >
      {front}
    </animated.div>
  );

  const backElement = (
    <animated.div
      className="card-back"
      onClick={() => onClickBack && onClickBack()}
      style={{
        ...styles?.cardFrame,
        opacity: opacity.to((v) => 1 - v),
        transform,
        rotateY: "180deg",
        // display: opacity.to((v) => (v === 1 ? "none" : "block")),
      }}
    >
      {back}
    </animated.div>
  );

  return (
    <Container
      className={className}
      ref={ref}
      style={{
        ...style,
        ...styles?.parent,
      }}
      onClick={onClick}
    >
      {frontElement}
      {backElement}
      {children && <div className="card-children">{children}</div>}
    </Container>
  );
}

const CardFlip = forwardRef(CardFlipWithRef);

export default CardFlip;
