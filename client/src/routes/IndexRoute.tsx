import { useQuery } from "react-query";
import { useHistory } from "react-router";
import { Button, Icon, Message } from "semantic-ui-react";
import useSocketListener from "../hooks/useSocketListener";
import { socketUrl, useSocket } from "../socket";
import {
  ClientEvent,
  CreateGameEvent,
  ServerEvent,
} from "../types/event.types";

function IndexRoute() {
  const socket = useSocket();
  const history = useHistory();

  useSocketListener(ServerEvent.GAME_CREATED, (data) => {
    history.push(`/game/${data.id}`);
  });

  const handleNewGame = () => {
    const data: CreateGameEvent = {
      socketId: socket.id,
    };
    socket.emit(ClientEvent.CREATE_GAME, data);
  };

  const { isLoading } = useQuery("server-ping", () =>
    fetch(`${socketUrl}/ping`).then((res) => res.json())
  );

  return (
    <>
      <h1>👹 Tempel des Schreckens</h1>
      <h3>A quick-playing bluffing game for 3-10 players.</h3>
      {isLoading ? (
        <>
          <Message icon>
            <Icon name="circle notched" loading />
            <Message.Content>
              <Message.Header>Please wait</Message.Header>
              <p>We're loading the game for you.</p>
              <p>
                (This can take up to 30-40s when you are starting a new game for
                the first time in a while - sorry! Thanks for your patience.)
              </p>
            </Message.Content>
          </Message>
        </>
      ) : (
        <>
          <Button color='green'>
            JOIN
          </Button>
          <Button primary onClick={handleNewGame}>
            NEW
          </Button>
        </>
      )}
    </>
  );
}

export default IndexRoute;
