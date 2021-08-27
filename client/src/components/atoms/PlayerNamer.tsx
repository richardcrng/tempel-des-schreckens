import { useState } from "react";
import { Button, Input } from "semantic-ui-react";

interface Props {
  handleSetName(name: string): void;
}

function PlayerNamer({ handleSetName }: Props) {
  const [inputText, setInputText] = useState("");

  const handleSetClick = () => {
    if (inputText.length > 0) {
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
