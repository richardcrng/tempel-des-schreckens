import { Image } from 'semantic-ui-react';
import { generateCardCount, generateRoleCount } from "../../selectors/game";

interface Props {
  nPlayers: number;
}

function SetupOverview({ nPlayers }: Props): JSX.Element {
  const { nGold, nFire, nEmpty } = generateCardCount(nPlayers);
  const { nAdventurers, nGuardians, isExact } = generateRoleCount(nPlayers);

  const roleRange = (n: number) => isExact ? `${n}` : `${n-1}-${n}`;

  return (
    <>
      <p>With {nPlayers} players, the distribution is:</p>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <CardOverview slug="adventurer" count={roleRange(nAdventurers)} />
        <CardOverview slug="guardian" count={roleRange(nGuardians)} />
        <CardOverview slug="gold" count={nGold} />
        <CardOverview slug="fire" count={nFire} />
        <CardOverview slug="empty" count={nEmpty} />
      </div>
    </>
  );
}

function CardOverview({ count, slug }: { count: number | string, slug: string }): JSX.Element {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Image src={`/assets/tds-${slug}.jpeg`} size="mini" />
      <span style={{ fontSize: "1.2rem" }}>{count}</span>
    </div>
  );
}

export default SetupOverview