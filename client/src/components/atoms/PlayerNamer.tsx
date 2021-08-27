import { useState } from "react";
import { Button, Input } from "semantic-ui-react";

interface Props {
  handleSetName(name: string): void;
  takenNames: string[];
}

function PlayerNamer({ handleSetName, takenNames }: Props) {
  const [inputText, setInputText] = useState("");

  const handleSetClick = () => {
    if (takenNames.includes(inputText)) {
      window.alert("Somebody is already using that name")
    } else if (inputText.length > 0) {
      handleSetName(inputText);
    } else {
      window.alert("Can't have an empty player name");
    }
  };

  return (
    <>
      <Input
        placeholder="Enter your name"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
      />
      <Button primary onClick={handleSetClick}>
        Set player name
      </Button>
    </>
  );
}

export default PlayerNamer;
