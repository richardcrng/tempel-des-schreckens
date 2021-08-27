import { Player } from "../../types/game.types";
import Avatar from 'boring-avatars';

interface Props {
  player: Player;
}

function PlayerAvatar({ player }: Props): JSX.Element {
  return (
    <Avatar
      size={40}
      name={player.socketId}
      variant="beam"
      colors={
        player.colors ?? ["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]
      }
    />
  );
}

export default PlayerAvatar