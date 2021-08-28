import { useQuery } from "react-query";
import { useHistory } from "react-router";
import { Button, Icon, Image, Message } from "semantic-ui-react";
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

  const handleJoinGame = () => {
    window.alert("This isn't implemented yet - get the join link from your host!")
  }

  const { isLoading } = useQuery("server-ping", () =>
    fetch(`${socketUrl}/ping`).then((res) => res.json())
  );

  return (
    <div
      className="active-contents"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className='flex-center' style={{ textAlign: 'center' }}>
        <h1>Tempel des Schreckens</h1>
        <Image src="/assets/tds-box.png" size="small" />
        <p style={{ margin: "5% 20%" }}>
          A web app implementation of the quick-playing bluffing game for 3-10
          players.
        </p>
        {isLoading && (
          <>
            <Message icon>
              <Icon name="circle notched" loading />
              <Message.Content>
                <Message.Header>Please wait</Message.Header>
                <p>We're loading the game for you.</p>
                <p>
                  (This can take up to 30-40s when you are starting a new game
                  for the first time in a while - sorry! Thanks for your
                  patience.)
                </p>
              </Message.Content>
            </Message>
          </>
        )}
      </div>
      {!isLoading && (
        <div style={{ width: "100%" }}>
          <Button fluid color="green" onClick={handleJoinGame}>
            JOIN
          </Button>
          <Button fluid primary onClick={handleNewGame}>
            NEW
          </Button>
        </div>
      )}
    </div>
  );
}

export default IndexRoute;
