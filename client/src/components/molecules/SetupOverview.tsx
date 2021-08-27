import { Image } from 'semantic-ui-react';
import { generateTypeCount } from "../../models/game";

interface Props {
  nPlayers: number;
}

function SetupOverview({ nPlayers }: Props): JSX.Element {
  const { nGold, nFire, nEmpty } = generateTypeCount(nPlayers);

  return (
    <>
      <h1>{nPlayers} players:</h1>
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