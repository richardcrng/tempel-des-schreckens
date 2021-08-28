import { Image } from "semantic-ui-react";
import { Role } from "../../types/game.types";

interface Props {
  role: Role;
}

function RoleOverview({ role }: Props): JSX.Element {
  return (
    <>
      <p style={{ marginBottom: 0 }}>You have drawn...</p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image
          src={`/assets/tds-${
            role === Role.ADVENTURER ? "adventurer" : "guardian"
          }.jpeg`}
          size="small"
        />
        <p style={{ fontSize: "1.5rem" }}>{role}</p>
      </div>
    </>
  );
}

export default RoleOverview