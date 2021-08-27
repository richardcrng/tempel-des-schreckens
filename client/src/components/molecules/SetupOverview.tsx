import { Image } from 'semantic-ui-react';
import { generateCardCount, generateRoleCount } from "../../models/game";

interface Props {
  nPlayers: number;
}

function SetupOverview({ nPlayers }: Props): JSX.Element {
  const { nGold, nFire, nEmpty } = generateCardCount(nPlayers);
  const { nAdventurers, nGuardians, isExact } = generateRoleCount(nPlayers);

  const roleRange = (n: number) => isExact ? `${n}` : `${n-1}-${n}`;

  return (
    <>
      <h1>{nPlayers} players:</h1>
      <div>
        <Image
          src="/assets/tds-adventurer.jpeg"
          size="mini"
          style={{ display: "inline-block" }}
        />
        <span style={{ fontSize: "2rem" }}>x {roleRange(nAdventurers)}</span>
      </div>
      <div>
        <Image
          src="/assets/tds-guardian.jpeg"
          size="mini"
          style={{ display: "inline-block" }}
        />
        <span style={{ fontSize: "2rem" }}>x {roleRange(nGuardians)}</span>
      </div>
      <div>
        <Image
          src="/assets/tds-gold.jpeg"
          size="mini"
          style={{ display: "inline-block" }}
        />
        <span style={{ fontSize: "2rem" }}>x {nGold}</span>
      </div>
      <div>
        <Image
          src="/assets/tds-fire.jpeg"
          size="mini"
          style={{ display: "inline-block" }}
        />
        <span style={{ fontSize: "2rem" }}>x {nFire}</span>
      </div>
      <div>
        <Image
          src="/assets/tds-empty.jpeg"
          size="mini"
          style={{ display: "inline-block" }}
        />
        <span style={{ fontSize: "2rem" }}>x {nEmpty}</span>
      </div>
    </>
  );
}

export default SetupOverview