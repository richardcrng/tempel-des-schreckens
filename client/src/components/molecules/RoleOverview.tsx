import { Image } from "semantic-ui-react";
import { Role } from "../../types/game.types";

interface Props {
  role: Role;
  style?: React.CSSProperties;
}

function RoleOverview({ role, style }: Props): JSX.Element {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        ...style
      }}
    >
      <p>You have drawn...</p>
      <Image
        src={`/assets/tds-${
          role === Role.ADVENTURER ? "adventurer" : "guardian"
        }.jpeg`}
        size="small"
      />
      <p style={{ fontSize: '1.5rem' }}>{role}</p>
    </div>
  );
}

export default RoleOverview