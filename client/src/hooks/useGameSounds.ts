import useSound from "use-sound";

interface GameSounds {
  playOpenChamberSound(): void;
  playRevealEmptySound(): void;
  playRevealFireSound(): void;
  playRevealGoldSound(): void;
}

export default function useGameSounds(): GameSounds {
  const [playOpenChamberSound] = useSound("/assets/audio/flip-start.mp3");
  const [playRevealEmptySound] = useSound("/assets/audio/flip-empty.mp3");
  const [playRevealFireSound] = useSound("/assets/audio/flip-fire.mp3");
  const [playRevealGoldSound] = useSound(
    "/assets/audio/flip-gold.mp3"
  );

  return {
    playOpenChamberSound,
    playRevealEmptySound,
    playRevealFireSound,
    playRevealGoldSound,
  };
}
