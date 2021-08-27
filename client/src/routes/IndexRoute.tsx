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
      <p>
        You've finally reached the Temple of Secrets with its immense treasure
        of gold — but what awaits you here? Fabulous wealth or total
        destruction? The proud and mysterious temple guards who are hiding
        amongst the adventurers are trying to lure them onto the wrong track in
        order to protect their gold. Skillfully and with a deceitful tongue,
        they try to convince you to open the grave chambers behind which lies a
        dangerous fire trap. Can you trust anyone in the group when you don't
        know whether they're friend or foe?
      </p>
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
          <Button color='green' onClick={handleNewGame}>
            JOIN
          </Button>
          <Button primary>
            NEW
          </Button>
        </>
      )}
    </>
  );
}

export default IndexRoute;
